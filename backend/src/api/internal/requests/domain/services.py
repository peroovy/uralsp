from typing import Iterable, List, Optional

from django.db.transaction import atomic
from django.utils.timezone import now

from api.internal.db.models import Request, User
from api.internal.db.models.request import RequestStatus
from api.internal.db.repositories import competition_repo, form_value_repo, participation_repo, request_repo, user_repo
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.form_value import FieldValue, IFormValueRepository
from api.internal.db.repositories.participation import IParticipationRepository
from api.internal.db.repositories.request import IRequestRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.requests.domain.entities import (
    FieldValueSchema,
    FormsIn,
    ParticipationSchema,
    ProcessIn,
    RequestDetailsOut,
    RequestIn,
)


class RequestService:
    def __init__(
        self,
        request_repo: IRequestRepository,
        competition_repo: ICompetitionRepository,
        user_repo: IUserRepository,
        participation_repo: IParticipationRepository,
        form_value_repo: IFormValueRepository,
    ):
        self._request_repo = request_repo
        self._competition_repo = competition_repo
        self._user_repo = user_repo
        self._participation_repo = participation_repo
        self._form_value_repo = form_value_repo

    def get_requests(self, owner: User) -> List[Request]:
        return list(self._request_repo.get_requests(owner.id))

    def get_request(self, request_id: int) -> Optional[Request]:
        return self._request_repo.try_get_request(request_id)

    def exists(self, owner: User, request_id: int) -> bool:
        return self._request_repo.exists(owner.id, request_id)

    @atomic
    def create(self, owner: User, data: RequestIn) -> Request:
        request = self._request_repo.create(owner.id, data.competition, data.team_name)
        self._create_participation_and_fill_form(request.id, data.competition, data.team)

        return request

    @atomic
    def update(self, request: Request, data: RequestIn) -> None:
        self._request_repo.update(request.id, team_name=data.team_name, status=RequestStatus.AWAITED, description=None)
        self._participation_repo.delete_all(request.id)

        self._create_participation_and_fill_form(request.id, data.competition, data.team)

    @atomic
    def cancel(self, request: Request) -> None:
        self._request_repo.update(request.id, status=RequestStatus.CANCELED)

    @atomic
    def process(self, request: Request, data: ProcessIn) -> None:
        self._request_repo.update(
            request.id,
            team_name=request.team_name,
            status=RequestStatus(data.status.value),
            description=data.description,
        )

    def has_access(self, user: User, request: Request, only_admin=False) -> bool:
        return (
            user.id == request.owner_id
            and not only_admin
            or self._competition_repo.is_admin(request.competition_id, user.id)
        )

    def validate_competition_for_registration(self, owner: User, data: RequestIn) -> bool:
        competition = self._competition_repo.try_get(data.competition)
        if not competition or self._request_repo.exists_request_on_competition(owner.id, competition.id):
            return False

        return now() < competition.registration_before and len(data.team) == competition.persons_amount

    def validate_competition_for_updating(self, request: Request, data: FormsIn) -> bool:
        return now() < request.competition.end_at and len(data.team) == request.competition.persons_amount

    def validate_users(self, data: FormsIn) -> bool:
        if not data.team:
            return False

        user_ids = [user.user_id for user in data.team]
        unique_ids = set(user_ids)
        if len(user_ids) != len(unique_ids):
            return False

        return len(unique_ids) == self._user_repo.get_count(unique_ids)

    def validate_forms(self, data: RequestIn) -> bool:
        fields = list(self._competition_repo.get_form(data.competition))

        if not fields:
            return True

        if not data.team and any(field.is_required for field in fields):
            return False

        for user in data.team:
            field_ids = [field.field_id for field in user.form]
            unique_ids = set(field_ids)

            if len(field_ids) != len(unique_ids):
                return False

            if not all(expected.id in unique_ids for expected in fields if expected.is_required):
                return False

        return True

    def is_competition_started(self, request: Request) -> bool:
        return now() >= request.competition.started_at

    def get_requests_for(self, competition_id: int) -> List[Request]:
        return list(self._request_repo.get_requests_on_competition(competition_id))

    def get_request_details(self, request: Request) -> RequestDetailsOut:
        team = self._participation_repo.get_with_forms(request.id)

        participation_outs = []
        for participation in team:
            field_values = [
                FieldValueSchema(field_id=field_value.field_id, value=field_value.value)
                for field_value in participation.form.all()
            ]
            participation_outs.append(ParticipationSchema(user_id=participation.user_id, form=field_values))

        return RequestDetailsOut(
            id=request.id,
            owner=request.owner_id,
            competition=request.competition_id,
            team_name=request.team_name,
            status=request.status,
            description=request.description,
            created_at=request.created_at,
            participants=participation_outs,
        )

    def _create_participation_and_fill_form(
        self, request_id: int, competition_id: int, team: Iterable[ParticipationSchema]
    ):
        fields = self._competition_repo.get_form(competition_id)
        expected_ids = set(field.id for field in fields)

        for user in team:
            participation = self._participation_repo.create(request_id, user.user_id)
            self._form_value_repo.create(
                participation.id,
                (
                    FieldValue(field_id=field.field_id, value=field.value)
                    for field in user.form
                    if field.field_id in expected_ids
                ),
            )


request_service = RequestService(request_repo, competition_repo, user_repo, participation_repo, form_value_repo)

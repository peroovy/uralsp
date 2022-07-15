from typing import Iterable, List, Optional

from django.db import IntegrityError
from django.db.transaction import atomic
from django.utils.timezone import now

from api.internal.db.models import Participation, Request, User
from api.internal.db.models.request import RequestStatus
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.form_value import FieldValue, IFormValueRepository
from api.internal.db.repositories.request import IRequestRepository
from api.internal.db.repositories.team import IParticipationRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.user.domain.entities import DefaultProfileIn, FormsIn, ParticipationSchema, RequestIn


class UserService:
    def __init__(self, user_repo: IUserRepository):
        self._user_repo = user_repo

    def update_profile(self, user: User, data: DefaultProfileIn) -> None:
        self._user_repo.update(user.id, **data.dict())


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

    def get_request(self, owner: User, request_id: int) -> Optional[Request]:
        return self._request_repo.get_request(owner.id, request_id)

    def exists(self, owner: User, request_id: int) -> bool:
        return self._request_repo.exists(owner.id, request_id)

    def get_participants(self, request: Request) -> List[Participation]:
        return list(self._participation_repo.get_all(request.id))

    def cancel(self, request_id: int) -> None:
        self._request_repo.cancel(request_id)

    def validate_competition_for_registration(self, owner: User, data: RequestIn) -> bool:
        competition = self._competition_repo.get(data.competition_id)
        if not competition or self._request_repo.exists_request_on_competition(owner.id, competition.id):
            return False

        return now() < competition.registration_before and len(data.team) == competition.person_amount

    def validate_competition_for_updating(self, request: Request, data: FormsIn) -> bool:
        return now() < request.competition.end_at and len(data.team) == request.competition.person_amount

    def validate_users(self, data: FormsIn) -> bool:
        if not data.team:
            return False

        user_ids = [user.user_id for user in data.team]
        unique_ids = set(user_ids)
        if len(user_ids) != len(unique_ids):
            return False

        return len(unique_ids) == self._user_repo.get_count(unique_ids)

    def validate_forms(self, data: RequestIn) -> bool:
        fields = list(self._competition_repo.get_fields(data.competition_id))

        if not fields:
            return True

        for user in data.team:
            field_ids = [field.field_id for field in user.form]
            unique_ids = set(field_ids)

            if len(field_ids) != len(unique_ids) or not all(
                expected.id in unique_ids for expected in fields if expected.is_required
            ):
                return False

        return True

    def try_create(self, owner: User, data: RequestIn) -> Optional[Request]:
        try:
            with atomic():
                request = self._request_repo.create(owner.id, data.competition_id, data.team_name)

                self._create_participation_and_fill_form(request.id, data.team)

            return request
        except IntegrityError:
            return None

    def try_update(self, request_id: int, data: RequestIn) -> bool:
        try:
            with atomic():
                self._request_repo.update(request_id, data.team_name, status=RequestStatus.AWAITED, description=None)
                self._participation_repo.delete_all(request_id)

                self._create_participation_and_fill_form(request_id, data.team)

            return True
        except IntegrityError:
            return False

    def _create_participation_and_fill_form(self, request_id: int, team: Iterable[ParticipationSchema]):
        for user in team:
            participation = self._participation_repo.create(request_id, user.user_id)
            self._form_value_repo.create(
                participation.id,
                (FieldValue(field_id=field.field_id, value=field.value) for field in user.form),
            )

from io import BytesIO
from typing import List, Optional

from django.conf import settings
from django.db.transaction import atomic
from django.forms import model_to_dict
from django.utils.timezone import now

from api.internal.competitions.domain.entities import (
    AdminsIn,
    CompetitionIn,
    FieldDetailsOut,
    Filters,
    FormIn,
    RequestsSerializationIn,
    RequestTemplateIn,
)
from api.internal.db.models import Competition, User
from api.internal.db.models.request import RequestStatus
from api.internal.db.models.user import Permissions
from api.internal.db.repositories import competition_repo, field_repo, user_repo
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.field import IFieldRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.utils import serialize_to_csv, serialize_to_xlsx


class CompetitionService:
    def __init__(
        self,
        competition_repo: ICompetitionRepository,
        user_repo: IUserRepository,
        field_repo: IFieldRepository,
    ):
        self._competition_repo = competition_repo
        self._user_repo = user_repo
        self._field_repo = field_repo

    def get_filtered(self, filters: Filters) -> List[Competition]:
        return list(self._competition_repo.get_filtered(filters.name, filters.admin, filters.opened, filters.started))

    def get(self, competition_id: int) -> Optional[Competition]:
        return self._competition_repo.try_get(competition_id)

    def get_with_requests(self, competition_id: int) -> Optional[Competition]:
        return self._competition_repo.try_get_with_requests(competition_id)

    def get_with_requests_for_serialization(
        self, competition_id: int, params: RequestsSerializationIn
    ) -> Optional[Competition]:
        return self._competition_repo.try_get_with_requests_for_serialization(
            competition_id, params.status, params.fields
        )

    def exists(self, competition_id: int) -> bool:
        return self._competition_repo.exists(competition_id)

    def delete(self, competition_id: int) -> bool:
        return self._competition_repo.delete(competition_id)

    @atomic
    def create(self, data: CompetitionIn) -> None:
        competition = self._competition_repo.create(
            data.name,
            data.registration_start,
            data.registration_end,
            data.started_at,
            data.persons_amount,
            data.request_template,
            data.link,
        )

        competition.fields.add(*data.fields)
        competition.admins.add(*data.admins)

    @atomic
    def update(self, competition_id: int, data: CompetitionIn) -> None:
        competition = self._competition_repo.get_for_update(competition_id)
        competition.name = data.name
        competition.registration_start = data.registration_start
        competition.registration_end = data.registration_end
        competition.started_at = data.started_at
        competition.persons_amount = data.persons_amount
        competition.request_template = data.request_template
        competition.link = data.link

        competition.fields.clear()
        competition.admins.clear()

        competition.fields.add(*data.fields)
        competition.admins.add(*data.admins)

        competition.save()

    @atomic
    def update_form(self, competition_id: int, data: FormIn) -> None:
        competition = self._competition_repo.get_for_update(competition_id)
        competition.fields.clear()
        competition.fields.add(*data.fields)

    @atomic
    def update_admins(self, competition_id: int, data: AdminsIn) -> None:
        competition = self._competition_repo.get_for_update(competition_id)
        competition.admins.clear()
        competition.admins.add(*data.admins)

    @atomic
    def update_request_template(self, competition_id: int, data: RequestTemplateIn) -> bool:
        return self._competition_repo.update(competition_id, request_template=data.request_template)

    def has_access(self, competition_id: int, user: User) -> bool:
        return user.permission == Permissions.SUPER_ADMIN or self._competition_repo.is_admin(competition_id, user.id)

    def get_form_details(self, competition_id: int) -> List[FieldDetailsOut]:
        fields = self._competition_repo.get_form(competition_id)

        return [
            FieldDetailsOut(
                **model_to_dict(field), default_values=list(field.default_values.values_list("value", flat=True))
            )
            for field in fields
        ]

    def validate_persons_amount(self, data: CompetitionIn) -> bool:
        return data.persons_amount >= settings.MIN_PARTICIPANTS_AMOUNT

    def validate_dates(self, data: CompetitionIn) -> bool:
        return now() < data.registration_start < data.registration_end < data.started_at

    def validate_admins(self, ids: List[int]) -> bool:
        unique = set(ids)

        return len(unique) == len(ids) and self._user_repo.exist_all_admins(unique)

    def validate_fields(self, ids: List[str]) -> bool:
        unique = set(ids)

        return len(unique) > 0 and len(unique) == len(ids) and self._field_repo.exist_all(unique)

    def is_registration_over(self, competition: Competition) -> bool:
        return now() >= competition.registration_end

    def is_started(self, competition: Competition) -> bool:
        return now() >= competition.started_at

    def is_registration_started(self, competition: Competition) -> bool:
        return now() >= competition.registration_start


class CompetitionSerializer:
    REQUEST_HEADERS = ["id", "owner_id", "team_name", "status", "created_at"]

    def requests_to_xlsx(self, competition_with_sorted_fields: Competition, has_headers: bool = False) -> BytesIO:
        return serialize_to_xlsx(self._get_rows(competition_with_sorted_fields, has_headers))

    def requests_to_csv(self, competition_with_sorted_fields: Competition, has_headers: bool = False) -> BytesIO:
        return serialize_to_csv(self._get_rows(competition_with_sorted_fields, has_headers))

    def _get_rows(self, competition: Competition, has_headers: bool) -> List[List[str]]:
        max_participants_amount = max(map(lambda r: r.participation.count(), competition.requests.all()))
        fields = [field.id for field in competition.fields.all()]
        headers = self.REQUEST_HEADERS + ["participant_id", *fields] * max_participants_amount

        rows = [headers] if has_headers else []

        for request in competition.requests.all():
            row = [
                request.id,
                request.owner_id,
                request.team_name,
                request.status,
                request.created_at.strftime("%Y-%m-%d %H-%M-%S"),
            ]

            for participation in request.participation.all():
                user_fields = dict((form_value.field_id, form_value.value) for form_value in participation.form.all())

                row += [participation.user_id, *[user_fields.get(expected) or "-" for expected in fields]]

            rows.append(row + ["-"] * (len(headers) - len(row)))

        return rows


competition_service = CompetitionService(competition_repo, user_repo, field_repo)
competition_serializer = CompetitionSerializer()

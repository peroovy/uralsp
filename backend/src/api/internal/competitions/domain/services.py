from typing import List, Optional

from django.db.transaction import atomic
from django.forms import model_to_dict
from django.utils.timezone import now

from api.internal.competitions.domain.entities import (
    AdminsIn,
    CompetitionFilters,
    CompetitionIn,
    FieldDetailsOut,
    FormIn,
    RequestTemplateIn,
)
from api.internal.db.models import Competition, User
from api.internal.db.models.user import Permissions
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.field import IFieldRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.utils import to_current_timezone


class CompetitionsService:
    def __init__(
        self,
        competition_repo: ICompetitionRepository,
        user_repo: IUserRepository,
        field_repo: IFieldRepository,
    ):
        self._competition_repo = competition_repo
        self._user_repo = user_repo
        self._field_repo = field_repo

    def get_competitions_by_filters(self, filters: CompetitionFilters) -> List[Competition]:
        return list(self._competition_repo.get_filtered(filters.name, filters.admin, filters.opened, filters.started))

    def get_competition(self, competition_id: int) -> Optional[Competition]:
        return self._competition_repo.get(competition_id)

    def exists_competition(self, competition_id: int) -> bool:
        return self._competition_repo.exists(competition_id)

    def delete_competition(self, competition_id: int) -> bool:
        return self._competition_repo.delete(competition_id)

    @atomic
    def create_competitions(self, data: CompetitionIn) -> None:
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
    def update_competition(self, competition_id: int, data: CompetitionIn) -> None:
        competition = self._competition_repo.get_for_update(competition_id)
        competition.name = data.name
        competition.registration_start = data.registration_start
        competition.registration_end = data.registration_end
        competition.started_at = data.started_at
        competition.request_template = data.request_template
        competition.link = data.link
        competition.persons_amount = data.persons_amount

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

    def get_form_details(self, competition_id: int) -> List[FieldDetailsOut]:
        fields = self._competition_repo.get_form(competition_id)

        return [
            FieldDetailsOut(
                **model_to_dict(field), default_values=list(field.default_values.values_list("value", flat=True))
            )
            for field in fields
        ]

    def validate_dates(self, data: CompetitionIn) -> bool:
        return (
            now()
            < to_current_timezone(data.registration_start)
            < to_current_timezone(data.registration_end)
            < to_current_timezone(data.started_at)
        )

    def validate_admins(self, ids: List[int]) -> bool:
        unique = set(ids)

        return len(unique) == len(ids) and self._user_repo.exist_all_admins(unique)

    def validate_fields(self, ids: List[str]) -> bool:
        unique = set(ids)

        return len(unique) > 0 and len(unique) == len(ids) and self._field_repo.exist_all(unique)

    def is_competition_admin(self, user: User, competition_id: int):
        return (
            user.permission == Permissions.SUPER_ADMIN
            or user.permission == Permissions.ADMIN
            and self._competition_repo.is_admin(competition_id, user.id)
        )

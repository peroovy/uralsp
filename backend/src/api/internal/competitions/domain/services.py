from enum import IntEnum, auto
from typing import List, Optional

from django.db.transaction import atomic
from django.forms import model_to_dict
from django.utils.timezone import now

from api.internal.competitions.domain import MIN_PERSONS_AMOUNT
from api.internal.competitions.domain.entities import (
    AdminsIn,
    CompetitionFilters,
    CompetitionIn,
    FieldDetailsOut,
    FormIn,
)
from api.internal.db.models import Competition, User
from api.internal.db.models.user import Permissions
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.field import IFieldRepository
from api.internal.db.repositories.user import IUserRepository


class OperationStatus(IntEnum):
    OK = auto()
    BAD_PERSONS_AMOUNT = auto()
    BAD_DATES = auto()
    BAD_FIELDS = auto()
    BAD_ADMINS = auto()
    BAD_COMPETITION = auto()


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

    def get_filtered(self, filters: CompetitionFilters) -> List[Competition]:
        return list(self._competition_repo.get_filtered(filters.name, filters.admin, filters.opened, filters.started))

    def get(self, competition_id: int) -> Optional[Competition]:
        return self._competition_repo.get(competition_id)

    def exists(self, competition_id: int) -> bool:
        return self._competition_repo.exists(competition_id)

    def delete(self, competition_id: int) -> bool:
        return self._competition_repo.delete(competition_id)

    @atomic
    def create(self, data: CompetitionIn) -> OperationStatus:
        if (validation_status := self._validate_competition_in(data)) != OperationStatus.OK:
            return validation_status

        competition = self._competition_repo.create(
            data.name,
            data.started_at,
            data.registration_before,
            data.end_at,
            data.persons_amount,
            data.request_template,
        )

        competition.fields.add(*data.fields)
        competition.admins.add(*data.admins)

        return OperationStatus.OK

    @atomic
    def update(self, competition_id: int, data: CompetitionIn) -> OperationStatus:
        if (validation_status := self._validate_competition_in(data)) != OperationStatus.OK:
            return validation_status

        competition = self._competition_repo.get_for_update(competition_id)
        competition.name = data.name
        competition.started_at = data.started_at
        competition.registration_before = data.registration_before
        competition.end_at = data.end_at
        competition.persons_amount = data.persons_amount
        competition.request_template = data.request_template

        competition.fields.clear()
        competition.admins.clear()

        competition.fields.add(*data.fields)
        competition.admins.add(*data.admins)

        competition.save()

        return OperationStatus.OK

    @atomic
    def update_form(self, competition_id: int, data: FormIn) -> OperationStatus:
        if not self._validate_fields(data.fields):
            return OperationStatus.BAD_FIELDS

        competition = self._competition_repo.get_for_update(competition_id)
        competition.fields.clear()
        competition.fields.add(*data.fields)

        return OperationStatus.OK

    @atomic
    def update_admins(self, competition_id: int, data: AdminsIn) -> OperationStatus:
        if not self._validate_admins(data.admins):
            return OperationStatus.BAD_ADMINS

        competition = self._competition_repo.get_for_update(competition_id)
        competition.admins.clear()
        competition.admins.add(*data.admins)

        return OperationStatus.OK

    def update_request_template(self, competition_id: int, request_template: Optional[str]) -> bool:
        return self._competition_repo.update(competition_id, request_template=request_template)

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

    def _validate_competition_in(self, data: CompetitionIn) -> OperationStatus:
        if data.persons_amount < MIN_PERSONS_AMOUNT:
            return OperationStatus.BAD_PERSONS_AMOUNT

        if not (now() < data.registration_before < data.started_at < data.end_at):
            return OperationStatus.BAD_DATES

        if not self._validate_admins(data.admins):
            return OperationStatus.BAD_ADMINS

        if not self._validate_fields(data.fields):
            return OperationStatus.BAD_FIELDS

        return OperationStatus.OK

    def _validate_admins(self, ids: List[int]) -> bool:
        unique = set(ids)

        return len(unique) > 0 and len(unique) == len(ids) and self._user_repo.exist_all_admins(unique)

    def _validate_fields(self, ids: List[str]) -> bool:
        unique = set(ids)

        return len(unique) > 0 and len(unique) == len(ids) and self._field_repo.exist_all(unique)

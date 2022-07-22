from datetime import datetime
from typing import List, Optional

from django.db.transaction import atomic
from django.utils.timezone import now

from api.internal.competitions.domain import MIN_PERSONS_AMOUNT
from api.internal.competitions.domain.entities import AdminsIn, CompetitionFilters, CompetitionIn, FormIn
from api.internal.db.models import Competition
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.field import IFieldRepository
from api.internal.db.repositories.user import IUserRepository


class CompetitionService:
    def __init__(
        self, competition_repo: ICompetitionRepository, field_repo: IFieldRepository, user_repo: IUserRepository
    ):
        self._competition_repo = competition_repo
        self._field_repo = field_repo
        self._user_repo = user_repo

    def get_filtered(self, filters: CompetitionFilters) -> List[Competition]:
        return list(self._competition_repo.get_filtered(filters.name, filters.admin, filters.opened, filters.started))

    def get(self, competition_id: int) -> Optional[Competition]:
        return self._competition_repo.get(competition_id)

    def exists(self, competition_id: int) -> bool:
        return self._competition_repo.exists(competition_id)

    def exists_all_fields(self, ids: List[str]) -> bool:
        return self._field_repo.exists_all(ids)

    def exists_all_admins(self, ids: List[int]) -> bool:
        return self._user_repo.exists_all_admins(ids)

    def delete(self, competition_id: int) -> None:
        self._competition_repo.delete(competition_id)

    def validate_person_amount(self, value: int):
        return value >= MIN_PERSONS_AMOUNT

    def validate_dates(self, registration_before: datetime, started_at: datetime, end_at: datetime) -> bool:
        return now() < registration_before < started_at < end_at

    @atomic
    def create(self, data: CompetitionIn) -> Competition:
        competition = self._competition_repo.create(
            data.name, data.started_at, data.registration_before, data.end_at, data.person_amount, data.request_template
        )

        competition.fields.add(*data.fields)
        competition.admins.add(*data.admins)

        return competition

    @atomic
    def update(self, competition_id: int, data: CompetitionIn) -> None:
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

    def update_request_template(self, competition_id: int, request_template: Optional[str]) -> None:
        self._competition_repo.update_request_template(competition_id, request_template)

from collections import deque
from io import BytesIO
from typing import List, Optional

from django.conf import settings

from api.internal.competitions.domain.services import CompetitionsService
from api.internal.competitions.requests.domain.entities import SerializerParams
from api.internal.db.models import Competition
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.field import IFieldRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.utils import serialize_to_csv, serialize_to_xlsx


class CompetitionRequestsService(CompetitionsService):
    def __init__(
        self, competition_repo: ICompetitionRepository, user_repo: IUserRepository, field_repo: IFieldRepository
    ):
        super(CompetitionRequestsService, self).__init__(competition_repo, user_repo, field_repo)

    def get_competition_with_requests(self, competition_id: int) -> Optional[Competition]:
        return self._competition_repo.get_with_requests(competition_id)

    def get_competition_with_requests_for_serialization(
        self, competition_id: int, params: SerializerParams
    ) -> Optional[Competition]:
        return self._competition_repo.get_with_requests_for_serialization(competition_id, params.status, params.fields)


class CompetitionRequestsSerializer:
    REQUEST_HEADERS = ["id", "owner_id", "team_name", "status", "created_at"]
    EMPTY_FIELD = "-"

    PARTICIPANT_ID = "participant_id"

    def to_xlsx(self, competition_with_sorted_fields: Competition, has_headers: bool = False) -> BytesIO:
        return serialize_to_xlsx(self._get_rows(competition_with_sorted_fields, has_headers))

    def to_csv(self, competition_with_sorted_fields: Competition, has_headers: bool = False) -> BytesIO:
        return serialize_to_csv(self._get_rows(competition_with_sorted_fields, has_headers))

    def _get_rows(self, competition: Competition, has_headers: bool) -> List[List[str]]:
        fields = [field.id for field in competition.fields.all()]
        headers = self.REQUEST_HEADERS + [self.PARTICIPANT_ID, *fields] * competition.persons_amount

        rows = [headers] if has_headers else []

        for request in competition.requests.all():
            row = deque(
                [
                    request.id,
                    request.owner_id,
                    request.team_name,
                    request.status,
                    request.created_at.strftime(settings.DATETIME_FORMAT),
                ]
            )

            for participation in request.participation.all():
                user_fields = dict((form_value.field_id, form_value.value) for form_value in participation.form.all())

                row.append(participation.user_id)
                row.extend(user_fields.get(expected) or self.EMPTY_FIELD for expected in fields)

            rows.append(list(row))

        return rows

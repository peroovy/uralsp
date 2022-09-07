from io import BytesIO
from typing import Callable, List
from uuid import UUID

from django.conf import settings
from django.http import FileResponse, HttpRequest
from django.utils.timezone import now
from ninja import Path, Query

from api.internal.base import HandlersMetaclass
from api.internal.competitions.requests.domain.entities import CompetitionRequestOut, SerializerParams
from api.internal.competitions.requests.domain.services import CompetitionRequestsSerializer, CompetitionRequestsService
from api.internal.db.models import Competition
from api.internal.exceptions import ForbiddenException, NotFoundException


class CompetitionRequestsHandlers(metaclass=HandlersMetaclass):
    COMPETITION = "competition"

    REQUESTS_FILENAME = "{date}_{name}.{extension}"
    XLSX = "xlsx"
    CSV = "csv"

    def __init__(
        self, competition_service: CompetitionRequestsService, requests_serializer: CompetitionRequestsSerializer
    ):
        self._competition_service = competition_service
        self._requests_serializer = requests_serializer

    def get_requests_for_competition(
        self, request: HttpRequest, _operation_id: UUID, competition_id: int = Path(...)
    ) -> List[CompetitionRequestOut]:
        if not (competition := self._competition_service.get_competition_with_requests(competition_id)):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.is_competition_admin(request.user, competition_id):
            raise ForbiddenException()

        return [CompetitionRequestOut.from_orm(user_request) for user_request in competition.requests.all()]

    def get_requests_for_competition_in_xlsx(
        self,
        request: HttpRequest,
        _operation_id: UUID,
        competition_id: int = Path(...),
        params: SerializerParams = Query(...),
    ) -> FileResponse:
        return self._get_requests_for_competition_in_file(
            request, competition_id, params, self._requests_serializer.to_xlsx, extension=self.XLSX
        )

    def get_requests_for_competition_in_csv(
        self,
        request: HttpRequest,
        _operation_id: UUID,
        competition_id: int = Path(...),
        params: SerializerParams = Query(...),
    ) -> FileResponse:
        return self._get_requests_for_competition_in_file(
            request, competition_id, params, self._requests_serializer.to_csv, extension=self.CSV
        )

    def _get_requests_for_competition_in_file(
        self,
        request: HttpRequest,
        competition_id: int,
        params: SerializerParams,
        get_file: Callable[[Competition, bool], BytesIO],
        extension: str,
    ) -> FileResponse:
        if not (
            competition := self._competition_service.get_competition_with_requests_for_serialization(
                competition_id, params
            )
        ):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.is_competition_admin(request.user, competition_id):
            raise ForbiddenException()

        buffer = get_file(competition, params.has_headers)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=self.REQUESTS_FILENAME.format(
                date=now().strftime(settings.DATETIME_FORMAT),
                name=competition.name,
                extension=extension,
            ),
        )

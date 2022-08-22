import uuid
from io import BytesIO
from typing import Callable, List
from uuid import UUID

from django.conf import settings
from django.http import FileResponse, HttpRequest
from django.utils.timezone import now
from loguru import logger
from ninja import Body, Query

from api.internal.base_handlers import BaseHandlers
from api.internal.competitions.domain.entities import (
    AdminsIn,
    CompetitionDetailsOut,
    CompetitionIn,
    CompetitionOut,
    FieldDetailsOut,
    Filters,
    FormIn,
    RequestOut,
    RequestsSerializationIn,
    RequestTemplateIn,
)
from api.internal.competitions.domain.services import CompetitionSerializer, CompetitionService
from api.internal.db.models import Competition
from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.services import FieldService
from api.internal.logging import log
from api.internal.requests.domain.services import RequestService
from api.internal.responses import SuccessResponse
from api.internal.users.domain.services import UserService

STARTING = "Starting"
PROCESSING = "Processing"
OPERATION_IS_OVER = "Operation is over"

OPERATION_IS_OVER__PERMISSION_DENIED = f"{OPERATION_IS_OVER}(permission denied)"
OPERATION_IS_OVER__INVALID_FIELDS = f"{OPERATION_IS_OVER} (invalid fields)"
OPERATION_IS_OVER__INVALID_ADMINS = f"{OPERATION_IS_OVER} (invalid admins)"
OPERATION_IS_OVER__INVALID_PERSONS_AMOUNT = f"{OPERATION_IS_OVER} (invalid amount of persons)"
OPERATION_IS_OVER__INVALID_DATES = f"{OPERATION_IS_OVER} (invalid dates)"


class CompetitionHandlers(BaseHandlers):
    VALIDATION_DATES_ERROR = "Values must be next: now < registration_start < registration_end < started_at"
    VALIDATION_PERSONS_AMOUNT_ERROR = f"persons_amount must be >= {settings.MIN_PARTICIPANTS_AMOUNT}"
    VALIDATION_FIELDS_ERROR = "Validation fields error"
    VALIDATION_ADMINS_ERROR = "Validation admins error"

    COMPETITION = "competition"
    BAD_FIELDS = "bad fields"
    BAD_ADMINS = "bad admins"
    BAD_DATES = "bad dates"
    BAD_PERSONS_AMOUNT = "bad persons_amount"

    def __init__(
        self,
        competition_service: CompetitionService,
        request_service: RequestService,
        field_service: FieldService,
        user_service: UserService,
        competition_serializer: CompetitionSerializer,
    ):
        self._competition_service = competition_service
        self._request_service = request_service
        self._field_service = field_service
        self._user_service = user_service
        self._competition_serializer = competition_serializer

    def get_competitions(self, request: HttpRequest, filters: Filters = Query(...)) -> List[CompetitionOut]:
        competitions = self._competition_service.get_filtered(filters)

        return [CompetitionOut.from_orm(competition) for competition in competitions]

    def get_competition(self, request: HttpRequest, competition_id: int) -> CompetitionDetailsOut:
        if not (competition := self._competition_service.get(competition_id)):
            raise NotFoundException(self.COMPETITION)

        return CompetitionDetailsOut.from_orm(competition)

    def get_form(self, request: HttpRequest, competition_id: int) -> List[FieldDetailsOut]:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        return self._competition_service.get_form_details(competition_id)

    def create_competition(
        self, request: HttpRequest, data: CompetitionIn = Body(...), operation_id: UUID = None
    ) -> SuccessResponse:
        creator = request.user
        log_kwargs = {"creator_id": creator.id, "permission": creator.permission} | data.dict()

        logger.info(log(operation_id, STARTING, **log_kwargs))

        self._assert_competition_in(data, operation_id)

        logger.info(log(operation_id, PROCESSING))
        self._competition_service.create(data)

        logger.success(log(operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def update_competition(
        self, request: HttpRequest, competition_id: int, data: CompetitionIn = Body(...), operation_id: UUID = None
    ) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        updater = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "permission": updater.permission,
            "competition_id": competition_id,
        } | data.dict()

        logger.info(log(operation_id, STARTING, **log_kwargs))

        if not self._competition_service.has_access(competition_id, updater):
            logger.success(log(operation_id, OPERATION_IS_OVER__PERMISSION_DENIED))
            raise ForbiddenException()

        self._assert_competition_in(data, operation_id)

        logger.info(log(operation_id, PROCESSING))
        self._competition_service.update(competition_id, data)

        logger.success(log(operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def delete_competition(self, request: HttpRequest, competition_id: int) -> SuccessResponse:
        if not self._competition_service.delete(competition_id):
            raise NotFoundException(self.COMPETITION)

        return SuccessResponse()

    def get_requests_on_competition(self, request: HttpRequest, competition_id: int) -> List[RequestOut]:
        if not (competition := self._competition_service.get_with_requests(competition_id)):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.has_access(competition_id, request.user):
            raise ForbiddenException()

        return [RequestOut.from_orm(user_request) for user_request in competition.requests.all()]

    def get_requests_on_competition_in_xlsx(
        self, request: HttpRequest, competition_id: int, params: RequestsSerializationIn = Query(...)
    ) -> FileResponse:
        return self._get_requests_on_competition_in_file(
            request, competition_id, params, self._competition_serializer.requests_to_xlsx, extension="xlsx"
        )

    def get_requests_on_competition_in_csv(
        self, request: HttpRequest, competition_id: int, params: RequestsSerializationIn = Query(...)
    ) -> FileResponse:
        return self._get_requests_on_competition_in_file(
            request, competition_id, params, self._competition_serializer.requests_to_csv, extension="csv"
        )

    def _get_requests_on_competition_in_file(
        self,
        request: HttpRequest,
        competition_id: int,
        params: RequestsSerializationIn,
        get_file: Callable[[Competition, bool], BytesIO],
        extension: str,
    ) -> FileResponse:
        if not (competition := self._competition_service.get_with_requests_for_serialization(competition_id, params)):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.has_access(competition_id, request.user):
            raise ForbiddenException()

        buffer = get_file(competition, params.has_headers)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=f"{now().strftime(settings.DATETIME_FORMAT)}_requests_on_competition_{competition_id}.{extension}",
        )

    def update_form(
        self, request: HttpRequest, competition_id: int, data: FormIn = Body(...), operation_id: UUID = None
    ) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        updater = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "permission": updater.permission,
            "competition_id": competition_id,
        } | data.dict()

        logger.info(log(operation_id, STARTING, **log_kwargs))

        if not self._competition_service.has_access(competition_id, updater):
            logger.success(log(operation_id, OPERATION_IS_OVER__PERMISSION_DENIED))
            raise ForbiddenException()

        if not self._competition_service.validate_fields(data.fields):
            logger.success(log(operation_id, OPERATION_IS_OVER__INVALID_FIELDS))
            raise UnprocessableEntityException(self.VALIDATION_FIELDS_ERROR, error=self.BAD_FIELDS)

        logger.info(log(operation_id, PROCESSING))
        self._competition_service.update_form(competition_id, data)

        logger.success(log(operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def update_admins(
        self, request: HttpRequest, competition_id: int, data: AdminsIn = Body(...), operation_id: UUID = None
    ) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        updater = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "permission": updater.permission,
            "competition_id": competition_id,
        } | data.dict()

        logger.info(log(operation_id, STARTING, **log_kwargs))

        if not self._competition_service.validate_admins(data.admins):
            logger.success(log(operation_id, OPERATION_IS_OVER__INVALID_ADMINS))
            raise UnprocessableEntityException(self.VALIDATION_ADMINS_ERROR, error=self.BAD_ADMINS)

        logger.info(log(operation_id, PROCESSING))
        self._competition_service.update_admins(competition_id, data)

        logger.success(log(operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def update_request_template(
        self, request: HttpRequest, competition_id: int, data: RequestTemplateIn = Body(...)
    ) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.has_access(competition_id, request.user):
            raise ForbiddenException()

        self._competition_service.update_request_template(competition_id, data)

        return SuccessResponse()

    def _assert_competition_in(self, data: CompetitionIn, operation_id: uuid.UUID) -> None:
        if not self._competition_service.validate_persons_amount(data):
            logger.success(
                log(
                    operation_id,
                    OPERATION_IS_OVER__INVALID_PERSONS_AMOUNT,
                )
            )
            raise UnprocessableEntityException(self.VALIDATION_PERSONS_AMOUNT_ERROR, error=self.BAD_PERSONS_AMOUNT)

        if not self._competition_service.validate_dates(data):
            logger.success(
                log(
                    operation_id,
                    OPERATION_IS_OVER__INVALID_DATES,
                )
            )
            raise UnprocessableEntityException(self.VALIDATION_DATES_ERROR, error=self.BAD_DATES)

        if not self._competition_service.validate_admins(data.admins):
            logger.success(log(operation_id, OPERATION_IS_OVER__INVALID_ADMINS))
            raise UnprocessableEntityException(self.VALIDATION_ADMINS_ERROR, error=self.BAD_ADMINS)

        if not self._competition_service.validate_fields(data.fields):
            logger.success(log(operation_id, OPERATION_IS_OVER__INVALID_FIELDS))
            raise UnprocessableEntityException(self.VALIDATION_FIELDS_ERROR, error=self.BAD_FIELDS)

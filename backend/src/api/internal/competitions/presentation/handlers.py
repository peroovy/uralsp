from typing import List
from uuid import UUID

from django.conf import settings
from django.http import HttpRequest
from loguru import logger
from ninja import Body, Query

from api.internal.base import HandlersMetaclass
from api.internal.competitions.domain.entities import (
    AdminsIn,
    CompetitionDetailsOut,
    CompetitionFilters,
    CompetitionIn,
    CompetitionOut,
    FieldDetailsOut,
    FormIn,
    RequestTemplateIn,
)
from api.internal.competitions.domain.services import CompetitionsService
from api.internal.competitions.requests.presentation.handlers import CompetitionRequestsHandlers
from api.internal.db.models import User
from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
from api.internal.logging import log
from api.internal.responses import SuccessResponse

STARTING = "Starting"
PROCESSING = "Processing"
OPERATION_IS_OVER = "Operation is over"

OPERATION_IS_OVER__PERMISSION_DENIED = f"{OPERATION_IS_OVER}(permission denied)"
OPERATION_IS_OVER__INVALID_FIELDS = f"{OPERATION_IS_OVER} (invalid fields)"
OPERATION_IS_OVER__INVALID_ADMINS = f"{OPERATION_IS_OVER} (invalid admins)"
OPERATION_IS_OVER__INVALID_PERSONS_AMOUNT = f"{OPERATION_IS_OVER} (invalid amount of persons)"
OPERATION_IS_OVER__INVALID_DATES = f"{OPERATION_IS_OVER} (invalid dates)"


class CompetitionsHandlers(metaclass=HandlersMetaclass):
    VALIDATION_DATES_ERROR = "Values must be next: now < registration_start < registration_end < started_at"
    VALIDATION_PERSONS_AMOUNT_ERROR = f"persons_amount must be >= {settings.MIN_PARTICIPANTS_AMOUNT}"
    VALIDATION_FIELDS_ERROR = "Validation fields error"
    VALIDATION_ADMINS_ERROR = "Validation admins error"

    COMPETITION = "competition"
    BAD_FIELDS = "bad fields"
    BAD_ADMINS = "bad admins"
    BAD_DATES = "bad dates"
    BAD_PERSONS_AMOUNT = "bad persons_amount"

    def __init__(self, competitions_service: CompetitionsService, requests_handlers: CompetitionRequestsHandlers):
        self._competitions_service = competitions_service

        self._requests_handlers = requests_handlers

    @property
    def requests(self) -> CompetitionRequestsHandlers:
        return self._requests_handlers

    def get_competitions(
        self, request: HttpRequest, _operation_id: UUID, filters: CompetitionFilters = Query(...)
    ) -> List[CompetitionOut]:
        competitions = self._competitions_service.get_competitions_by_filters(filters)

        return [CompetitionOut.from_orm(competition) for competition in competitions]

    def get_competition(self, request: HttpRequest, _operation_id: UUID, competition_id: int) -> CompetitionDetailsOut:
        if not (competition := self._competitions_service.get_competition(competition_id)):
            raise NotFoundException(self.COMPETITION)

        return CompetitionDetailsOut.from_orm(competition)

    def get_form(self, request: HttpRequest, _operation_id: UUID, competition_id: int) -> List[FieldDetailsOut]:
        if not self._competitions_service.exists_competition(competition_id):
            raise NotFoundException(self.COMPETITION)

        return self._competitions_service.get_form_details(competition_id)

    def create_competition(
        self, request: HttpRequest, _operation_id: UUID, data: CompetitionIn = Body(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad persons_amount" - persons_amount must be >= 1
            "bad dates" - dates must be next: now < registration_start < registration_end < started_at
            "bad admins" - admin ids must be unique and exist, amount >= 0
            "bad fields" - field ids must be unique and exist, amount > 0
        """

        creator: User = request.user
        log_kwargs = {"creator_id": creator.id, "permission": creator.permission} | data.dict()

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        self._assert_competition_in(data, _operation_id)

        logger.info(log(_operation_id, PROCESSING))
        self._competitions_service.create(data)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def update_competition(
        self, request: HttpRequest, _operation_id: UUID, competition_id: int, data: CompetitionIn = Body(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad persons_amount" - persons_amount must be >= 1
            "bad dates" - dates must be next: now < registration_start < registration_end < started_at
            "bad admins" - admin ids must be unique and exist, amount >= 0
            "bad fields" - field ids must be unique and exist, amount > 0
        """

        if not self._competitions_service.exists_competition(competition_id):
            raise NotFoundException(self.COMPETITION)

        updater: User = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "permission": updater.permission,
            "competition_id": competition_id,
        } | data.dict()

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if not self._competitions_service.is_competition_admin(updater, competition_id):
            logger.success(log(_operation_id, OPERATION_IS_OVER__PERMISSION_DENIED))
            raise ForbiddenException()

        self._assert_competition_in(data, _operation_id)

        logger.info(log(_operation_id, PROCESSING))
        self._competitions_service.update(competition_id, data)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def delete_competition(self, request: HttpRequest, _operation_id: UUID, competition_id: int) -> SuccessResponse:
        if not self._competitions_service.delete_competition(competition_id):
            raise NotFoundException(self.COMPETITION)

        return SuccessResponse()

    def update_form(
        self, request: HttpRequest, _operation_id: UUID, competition_id: int, data: FormIn = Body(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad fields" - field ids must be unique and exist, amount > 0
        """

        if not self._competitions_service.exists_competition(competition_id):
            raise NotFoundException(self.COMPETITION)

        updater: User = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "permission": updater.permission,
            "competition_id": competition_id,
        } | data.dict()

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if not self._competitions_service.is_competition_admin(updater, competition_id):
            logger.success(log(_operation_id, OPERATION_IS_OVER__PERMISSION_DENIED))
            raise ForbiddenException()

        if not self._competitions_service.validate_fields(data.fields):
            logger.success(log(_operation_id, OPERATION_IS_OVER__INVALID_FIELDS))
            raise UnprocessableEntityException(self.VALIDATION_FIELDS_ERROR, error=self.BAD_FIELDS)

        logger.info(log(_operation_id, PROCESSING))
        self._competitions_service.update_form(competition_id, data)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def update_admins(
        self, request: HttpRequest, _operation_id: UUID, competition_id: int, data: AdminsIn = Body(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad admins" - admin ids must be unique and exist, amount >= 0
        """

        if not self._competitions_service.exists_competition(competition_id):
            raise NotFoundException(self.COMPETITION)

        updater: User = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "permission": updater.permission,
            "competition_id": competition_id,
        } | data.dict()

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if not self._competitions_service.validate_admins(data.admins):
            logger.success(log(_operation_id, OPERATION_IS_OVER__INVALID_ADMINS))
            raise UnprocessableEntityException(self.VALIDATION_ADMINS_ERROR, error=self.BAD_ADMINS)

        logger.info(log(_operation_id, PROCESSING))
        self._competitions_service.update_admins(competition_id, data)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def update_request_template(
        self, request: HttpRequest, _operation_id: UUID, competition_id: int, data: RequestTemplateIn = Body(...)
    ) -> SuccessResponse:
        if not self._competitions_service.exists_competition(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competitions_service.is_competition_admin(request.user, competition_id):
            raise ForbiddenException()

        self._competitions_service.update_request_template(competition_id, data)

        return SuccessResponse()

    def _assert_competition_in(self, data: CompetitionIn, _operation_id: UUID) -> None:
        if not self._competitions_service.validate_persons_amount(data):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__INVALID_PERSONS_AMOUNT,
                )
            )
            raise UnprocessableEntityException(self.VALIDATION_PERSONS_AMOUNT_ERROR, error=self.BAD_PERSONS_AMOUNT)

        if not self._competitions_service.validate_dates(data):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__INVALID_DATES,
                )
            )
            raise UnprocessableEntityException(self.VALIDATION_DATES_ERROR, error=self.BAD_DATES)

        if not self._competitions_service.validate_admins(data.admins):
            logger.success(log(_operation_id, OPERATION_IS_OVER__INVALID_ADMINS))
            raise UnprocessableEntityException(self.VALIDATION_ADMINS_ERROR, error=self.BAD_ADMINS)

        if not self._competitions_service.validate_fields(data.fields):
            logger.success(log(_operation_id, OPERATION_IS_OVER__INVALID_FIELDS))
            raise UnprocessableEntityException(self.VALIDATION_FIELDS_ERROR, error=self.BAD_FIELDS)

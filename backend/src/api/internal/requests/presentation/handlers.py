from typing import List
from uuid import UUID

from django.conf import settings
from django.http import HttpRequest
from loguru import logger
from ninja import Body

from api.internal.base import HandlersMetaclass
from api.internal.db.models import User
from api.internal.db.models.user import Permissions
from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
from api.internal.logging import log
from api.internal.requests.domain.entities import FormsIn, ProcessIn, RequestDetailsOut, RequestIn, RequestOut
from api.internal.requests.domain.services import RequestCompetitionService, RequestsService
from api.internal.responses import SuccessResponse

STARTING = "starting"
PROCESSING = "processing"
OPERATION_IS_OVER = "Operation is over"

OPERATION_IS_OVER__UNKNOWN_COMPETITION = f"{OPERATION_IS_OVER} (unknown competition id)"
OPERATION_IS_OVER__REQUEST_EXISTS = f"{OPERATION_IS_OVER} (request already exists)"
OPERATION_IS_OVER__REGISTRATION_HAS_NOT_STARTED = f"{OPERATION_IS_OVER} (registration has not started yet)"
OPERATION_IS_OVER__REGISTRATION_IS_OVER = f"{OPERATION_IS_OVER} (registration is over)"
OPERATION_IS_OVER__INVALID_USERS = f"{OPERATION_IS_OVER} (invalid users)"
OPERATION_IS_OVER__INVALID_FORMS = f"{OPERATION_IS_OVER} (invalid forms)"
OPERATION_IS_OVER__PERMISSION_DENIED = f"{OPERATION_IS_OVER} (permission denied)"
OPERATION_IS_OVER__COMPETITION_STARTED = f"{OPERATION_IS_OVER} (competition started)"


class RequestsHandlers(metaclass=HandlersMetaclass):
    REGISTRATION_IS_OVER = "Registration is over"
    INVALID_TEAM = "Team validation error"
    INVALID_FORMS = "Forms validation error"
    UNKNOWN_COMPETITION = "Unknown competition"
    REQUEST_HAS_ALREADY_CREATED = "Request has already created"
    REGISTRATION_HAS_NOT_STARTED_YET = "Registration has not started yet"

    REQUEST = "request"
    COMPETITION = "competition"
    BAD_USERS = "bad users"
    BAD_FORMS = "bad forms"
    REGISTRATION_END = "registration end"
    REGISTRATION_START = "registration start"

    def __init__(self, requests_service: RequestsService, competition_service: RequestCompetitionService):
        self._requests_service = requests_service
        self._competition_service = competition_service

    def get_all_requests(self, request: HttpRequest, _operation_id: UUID) -> List[RequestOut]:
        return [RequestOut.from_orm(user_request) for user_request in self._requests_service.get_requests()]

    def get_request(self, request: HttpRequest, _operation_id: UUID, request_id: int) -> RequestDetailsOut:
        if not (user_request := self._requests_service.get_request_with_participation_and_forms(request_id)):
            raise NotFoundException(self.REQUEST)

        return self._requests_service.get_request_details(user_request)

    def delete_request(self, request: HttpRequest, _operation_id: UUID, request_id: int) -> SuccessResponse:
        if not (user_request := self._requests_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        user_request.delete()

        return SuccessResponse()

    def create_request(self, request: HttpRequest, _operation_id: UUID, data: RequestIn = Body(...)) -> SuccessResponse:
        """
        Note:\n
            1) Unknown fields are ignored
            2) Optional fields are not created in the database if they are not in a user form

        422 error codes:\n
            "competition" - unknown competition id
            "request" - the default user has already created request for the competition
            "registration start" - the competition registration has not started yet
            "registration end" - the competition registration is over
            "bad users" - participant ids must be unique and exist, their number must equal the competition's persons_amount
            "bad forms" - all required fields must be in any forms, any fields in form must be unique
        """

        user: User = request.user
        log_kwargs = {"creator_id": user.id, "creator_permission": user.permission} | data.dict()

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if not (competition := self._competition_service.get_competition(data.competition)):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__UNKNOWN_COMPETITION,
                    competition_id=data.competition,
                )
            )
            raise UnprocessableEntityException(self.UNKNOWN_COMPETITION, error=self.COMPETITION)

        if user.permission == Permissions.DEFAULT and self._requests_service.exists_request_for_competition(
            user.id, data.competition
        ):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__REQUEST_EXISTS,
                    competition_id=data.competition,
                )
            )
            raise UnprocessableEntityException(self.REQUEST_HAS_ALREADY_CREATED, error=self.REQUEST)

        if not self._competition_service.is_registration_started(competition):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__REGISTRATION_HAS_NOT_STARTED,
                    competition_id=competition.id,
                    registration_start=competition.registration_start.strftime(settings.DATETIME_FORMAT),
                )
            )
            raise UnprocessableEntityException(self.REGISTRATION_HAS_NOT_STARTED_YET, error=self.REGISTRATION_START)

        if self._competition_service.is_registration_over(competition):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__REGISTRATION_IS_OVER,
                    competition_id=competition.id,
                    registration_end=competition.registration_end.strftime(settings.DATETIME_FORMAT),
                )
            )
            raise UnprocessableEntityException(self.REGISTRATION_IS_OVER, error=self.REGISTRATION_END)

        if not self._requests_service.validate_users(competition, data):
            logger.success(log(_operation_id, OPERATION_IS_OVER__INVALID_USERS))
            raise UnprocessableEntityException(self.INVALID_TEAM, error=self.BAD_USERS)

        if not self._requests_service.validate_forms(data):
            logger.success(log(_operation_id, OPERATION_IS_OVER__INVALID_FORMS))
            raise UnprocessableEntityException(self.INVALID_FORMS, error=self.BAD_FORMS)

        logger.info(log(_operation_id, PROCESSING))
        self._requests_service.create_request(request.user, data)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def update_request(
        self, request: HttpRequest, _operation_id: UUID, request_id: int, data: FormsIn = Body(...)
    ) -> SuccessResponse:
        """
        Note:\n
            1) Unknown fields are ignored
            2) Optional fields are not created in the database if they are not in a user form

        422 error codes:\n
            "competition" - unknown competition id
            "request" - the default user has already created request for the competition
            "registration start" - the competition registration has not started yet
            "registration end" - the competition registration is over
            "bad users" - participant ids must be unique and exist, their number must equal the competition's persons_amount
            "bad forms" - all required fields must be in any forms, any fields in form must be unique
        """

        if not (user_request := self._requests_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        updater: User = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "updater_permission": updater.permission,
            "request_id": user_request.id,
            "owner_id": user_request.owner_id,
        } | data.dict()

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if not self._requests_service.is_owner_or_competition_admin(updater, user_request):
            logger.info(log(_operation_id, OPERATION_IS_OVER__PERMISSION_DENIED))
            raise ForbiddenException()

        if self._competition_service.is_registration_over(user_request.competition):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__REGISTRATION_IS_OVER,
                    competition_id=user_request.competition.id,
                    registration_end=user_request.competition.registration_end.strftime(settings.DATETIME_FORMAT),
                )
            )
            raise UnprocessableEntityException(self.REGISTRATION_IS_OVER, error=self.REGISTRATION_END)

        if not self._requests_service.validate_users(user_request.competition, data):
            logger.success(log(_operation_id, OPERATION_IS_OVER__INVALID_USERS))
            raise UnprocessableEntityException(self.INVALID_TEAM, error=self.BAD_USERS)

        request_in = RequestIn(competition=user_request.competition_id, team_name=data.team_name, team=data.team)
        if not self._requests_service.validate_forms(request_in):
            logger.success(log(_operation_id, OPERATION_IS_OVER__INVALID_FORMS))
            raise UnprocessableEntityException(self.INVALID_FORMS, error=self.BAD_FORMS)

        logger.info(log(_operation_id, PROCESSING))
        self._requests_service.update_request(user_request, request_in)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def process_request(
        self, request: HttpRequest, _operation_id: UUID, request_id: int, data: ProcessIn
    ) -> SuccessResponse:
        if not (user_request := self._requests_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        updater: User = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "updater_permission": updater.permission,
            "request_id": user_request.id,
            "owner_id": user_request.owner_id,
            "prev_status": user_request.status,
            "prev_description": user_request.description,
        } | data.dict()

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if not self._requests_service.is_owner_or_competition_admin(updater, user_request, only_admin=True):
            logger.success(log(_operation_id, OPERATION_IS_OVER__PERMISSION_DENIED))
            raise ForbiddenException()

        logger.info(log(_operation_id, PROCESSING))
        self._requests_service.process_request(user_request, data)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

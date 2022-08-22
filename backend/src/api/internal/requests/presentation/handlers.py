import uuid
from typing import List
from uuid import UUID

from django.conf import settings
from django.http import HttpRequest
from loguru import logger
from ninja import Body

from api.internal.base_handlers import BaseHandlers
from api.internal.competitions.domain.services import CompetitionService
from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
from api.internal.logging import log
from api.internal.requests.domain.entities import FormsIn, ProcessIn, RequestDetailsOut, RequestIn, RequestOut
from api.internal.requests.domain.services import RequestService
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


class RequestHandlers(BaseHandlers):
    REGISTRATION_IS_OVER = "Registration is over"
    INVALID_TEAM = "Team validation error"
    INVALID_FORMS = "Forms validation error"
    COMPETITION_STARTED = "Competition started"
    UNKNOWN_COMPETITION = "Unknown competition"
    REQUEST_HAS_ALREADY_CREATED = "Request has already created"
    REGISTRATION_HAS_NOT_STARTED_YET = "Registration has not started yet"

    REQUEST = "request"
    COMPETITION = "competition"
    BAD_USERS = "bad users"
    BAD_FORMS = "bad forms"
    REGISTRATION_END = "registration_end"
    REGISTRATION_START = "registration_start"

    def __init__(self, request_service: RequestService, competition_service: CompetitionService):
        self._request_service = request_service
        self._competition_service = competition_service

    def get_requests(self, request: HttpRequest) -> List[RequestOut]:
        requests = self._request_service.get_requests(request.user)

        return [RequestOut.from_orm(user_request) for user_request in requests]

    def get_request(self, request: HttpRequest, request_id: int) -> RequestDetailsOut:
        if not (user_request := self._request_service.get_request_with_participation_and_forms(request_id)):
            raise NotFoundException(self.REQUEST)

        if not self._request_service.has_access(request.user, user_request):
            raise ForbiddenException()

        return self._request_service.get_request_details(user_request)

    def create_request(
        self, request: HttpRequest, data: RequestIn = Body(...), operation_id: UUID = None
    ) -> SuccessResponse:
        user = request.user
        log_kwargs = {"creator_id": user.id, "creator_permission": user.permission} | data.dict()

        logger.info(log(operation_id, STARTING, **log_kwargs))

        if not (competition := self._competition_service.get(data.competition)):
            logger.success(
                log(
                    operation_id,
                    OPERATION_IS_OVER__UNKNOWN_COMPETITION,
                    competition_id=data.competition,
                )
            )
            raise UnprocessableEntityException(self.UNKNOWN_COMPETITION, error=self.COMPETITION)

        if self._request_service.exists_request_on_competition(user.id, data.competition):
            logger.success(
                log(
                    operation_id,
                    OPERATION_IS_OVER__REQUEST_EXISTS,
                    competition_id=data.competition,
                )
            )
            raise UnprocessableEntityException(self.REQUEST_HAS_ALREADY_CREATED, error=self.REQUEST)

        if not self._competition_service.is_registration_started(competition):
            logger.success(
                log(
                    operation_id,
                    OPERATION_IS_OVER__REGISTRATION_HAS_NOT_STARTED,
                    competition_id=competition.id,
                    registration_start=competition.registration_start.strftime(settings.DATETIME_FORMAT),
                )
            )
            raise UnprocessableEntityException(self.REGISTRATION_HAS_NOT_STARTED_YET, error=self.REGISTRATION_START)

        if self._competition_service.is_registration_over(competition):
            logger.success(
                log(
                    operation_id,
                    OPERATION_IS_OVER__REGISTRATION_IS_OVER,
                    competition_id=competition.id,
                    registration_end=competition.registration_end.strftime(settings.DATETIME_FORMAT),
                )
            )
            raise UnprocessableEntityException(self.REGISTRATION_IS_OVER, error=self.REGISTRATION_END)

        if not self._request_service.validate_users(competition, data):
            logger.success(log(operation_id, OPERATION_IS_OVER__INVALID_USERS))
            raise UnprocessableEntityException(self.INVALID_TEAM, error=self.BAD_USERS)

        if not self._request_service.validate_forms(data):
            logger.success(log(operation_id, OPERATION_IS_OVER__INVALID_FORMS))
            raise UnprocessableEntityException(self.INVALID_FORMS, error=self.BAD_FORMS)

        logger.info(log(operation_id, PROCESSING))
        self._request_service.create(request.user, data)

        logger.success(log(operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def update_request(
        self, request: HttpRequest, request_id: int, data: FormsIn = Body(...), operation_id: UUID = None
    ) -> SuccessResponse:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        updater = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "updater_permission": updater.permission,
            "request_id": user_request.id,
            "owner_id": user_request.owner_id,
        } | data.dict()

        logger.info(log(operation_id, STARTING, **log_kwargs))

        if not self._request_service.has_access(updater, user_request):
            logger.info(log(operation_id, OPERATION_IS_OVER__PERMISSION_DENIED))
            raise ForbiddenException()

        if self._competition_service.is_registration_over(user_request.competition):
            logger.success(
                log(
                    operation_id,
                    OPERATION_IS_OVER__REGISTRATION_IS_OVER,
                    competition_id=user_request.competition.id,
                    registration_end=user_request.competition.registration_end.strftime(settings.DATETIME_FORMAT),
                )
            )
            raise UnprocessableEntityException(self.REGISTRATION_IS_OVER, error=self.REGISTRATION_END)

        if not self._request_service.validate_users(user_request.competition, data):
            logger.success(log(operation_id, OPERATION_IS_OVER__INVALID_USERS))
            raise UnprocessableEntityException(self.INVALID_TEAM, error=self.BAD_USERS)

        request_in = RequestIn(competition=user_request.competition_id, team_name=data.team_name, team=data.team)
        if not self._request_service.validate_forms(request_in):
            logger.success(log(operation_id, OPERATION_IS_OVER__INVALID_FORMS))
            raise UnprocessableEntityException(self.INVALID_FORMS, error=self.BAD_FORMS)

        logger.info(log(operation_id, PROCESSING))
        self._request_service.update(user_request, request_in)

        logger.success(log(operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def cancel_request(self, request: HttpRequest, request_id: int, operation_id: UUID = None) -> SuccessResponse:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        updater = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "updater_permission": updater.permission,
            "request_id": user_request.id,
            "owner_id": user_request.owner_id,
            "prev_status": user_request.status,
        }

        logger.info(log(operation_id, STARTING, **log_kwargs))

        if not self._request_service.has_access(updater, user_request):
            logger.success(log(operation_id, OPERATION_IS_OVER__PERMISSION_DENIED))
            raise ForbiddenException()

        if self._competition_service.is_started(competition := user_request.competition):
            logger.success(
                log(
                    operation_id,
                    OPERATION_IS_OVER__COMPETITION_STARTED,
                    competition_id=competition.id,
                    started_at=competition.started_at.strftime(settings.DATETIME_FORMAT),
                )
            )
            raise UnprocessableEntityException(self.COMPETITION_STARTED, error=self.COMPETITION)

        logger.info(log(operation_id, PROCESSING))
        self._request_service.cancel(user_request)

        logger.success(log(operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def process_request(
        self, request: HttpRequest, request_id: int, data: ProcessIn, operation_id: UUID = None
    ) -> SuccessResponse:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        updater = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "updater_permission": updater.permission,
            "request_id": user_request.id,
            "owner_id": user_request.owner_id,
            "prev_status": user_request.status,
            "prev_description": user_request.description,
        } | data.dict()

        logger.info(log(operation_id, STARTING, **log_kwargs))

        if not self._request_service.has_access(updater, user_request, only_admin=True):
            logger.success(log(operation_id, OPERATION_IS_OVER__PERMISSION_DENIED))
            raise ForbiddenException()

        logger.info(log(operation_id, PROCESSING))
        self._request_service.process(user_request, data)

        logger.success(log(operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

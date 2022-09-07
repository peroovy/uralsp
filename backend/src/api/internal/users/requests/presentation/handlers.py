from typing import List
from uuid import UUID

from django.conf import settings
from django.http import HttpRequest
from loguru import logger
from ninja import Path

from api.internal.base import HandlersMetaclass
from api.internal.db.models import User
from api.internal.db.models.request import RequestStatus
from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.logging import log
from api.internal.requests.domain.services import RequestCompetitionService
from api.internal.responses import SuccessResponse
from api.internal.users.requests.domain.entities import CurrentUserRequestOut
from api.internal.users.requests.domain.services import CurrentUserRequestsService

STARTING = "starting"
PROCESSING = "processing"
OPERATION_IS_OVER = "Operation is over"

OPERATION_IS_OVER__COMPETITION_STARTED = f"{OPERATION_IS_OVER} (competition started)"
OPERATION_IS_OVER__BAD_PREVIOUS_REQUEST_STATUS = f"{OPERATION_IS_OVER} (bad previous request status)"
OPERATION_IS_OVER__REGISTRATION_IS_OVER = f"{OPERATION_IS_OVER} (registration is end)"


class CurrentUserRequestsHandlers(metaclass=HandlersMetaclass):
    COMPETITION_HAS_ALREADY_STARTED = "The competition has already started"
    REGISTRATION_IS_OVER = "Registration is over"
    REQUEST_WAS_NOT_CANCELED = "The request was not canceled"

    STARTED_COMPETITION = "started competition"
    REGISTRATION_END = "registration end"
    BAD_STATUS = "bad status"
    REQUEST = "request"

    def __init__(self, requests_service: CurrentUserRequestsService, competition_service: RequestCompetitionService):
        self._requests_service = requests_service
        self._competition_service = competition_service

    def get_requests_from_user(self, request: HttpRequest, _operation_id: UUID) -> List[CurrentUserRequestOut]:
        requests = self._requests_service.get_requests_from_user(request.user)

        return [CurrentUserRequestOut.from_orm(user_request) for user_request in requests]

    def cancel_request_from_user(
        self, request: HttpRequest, _operation_id: UUID, request_id: int = Path(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "started competition" - the competition has already started
        """

        if not (user_request := self._requests_service.get_request_from_user(request.user, request_id)):
            raise NotFoundException(self.REQUEST)

        updater: User = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "updater_permission": updater.permission,
            "request_id": user_request.id,
            "owner_id": user_request.owner_id,
            "prev_status": user_request.status,
        }

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if self._competition_service.is_started(competition := user_request.competition):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__COMPETITION_STARTED,
                    competition_id=competition.id,
                    started_at=competition.started_at.strftime(settings.DATETIME_FORMAT),
                )
            )
            raise UnprocessableEntityException(self.COMPETITION_HAS_ALREADY_STARTED, error=self.STARTED_COMPETITION)

        logger.info(log(_operation_id, PROCESSING))
        self._requests_service.cancel_request(user_request)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

    def renew_request_from_user(
        self, request: HttpRequest, _operation_id: UUID, request_id: int = Path(...)
    ) -> SuccessResponse:
        """
        422 error codes:\n
            "bad status" - attempt to update not-canceled status
            "registration end" - registration for the competition is over
        """

        if not (user_request := self._requests_service.get_request_from_user(request.user, request_id)):
            raise NotFoundException(self.REQUEST)

        updater: User = request.user
        log_kwargs = {
            "updater_id": updater.id,
            "updater_permission": updater.permission,
            "request_id": user_request.id,
            "owner_id": user_request.owner_id,
            "prev_status": user_request.status,
        }

        logger.info(log(_operation_id, STARTING, **log_kwargs))

        if user_request.status != RequestStatus.CANCELED:
            logger.success(log(_operation_id, OPERATION_IS_OVER__BAD_PREVIOUS_REQUEST_STATUS))
            raise UnprocessableEntityException(self.REQUEST_WAS_NOT_CANCELED, error=self.BAD_STATUS)

        if self._competition_service.is_registration_over(competition := user_request.competition):
            logger.success(
                log(
                    _operation_id,
                    OPERATION_IS_OVER__REGISTRATION_IS_OVER,
                    competition_id=competition.id,
                    registration_end=competition.registration_end.strftime(settings.DATETIME_FORMAT),
                )
            )
            raise UnprocessableEntityException(self.REGISTRATION_IS_OVER, error=self.REGISTRATION_END)

        logger.info(log(_operation_id, PROCESSING))
        self._requests_service.renew_request(user_request)

        logger.success(log(_operation_id, OPERATION_IS_OVER))
        return SuccessResponse()

from typing import List
from uuid import UUID

from django.conf import settings
from django.http import HttpRequest
from loguru import logger

from api.internal.base import HandlersMetaclass
from api.internal.db.models import User
from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.logging import log
from api.internal.requests.domain.services import RequestCompetitionService
from api.internal.responses import SuccessResponse
from api.internal.users.requests.domain.entities import CurrentUserRequestDetailsOut, CurrentUserRequestOut
from api.internal.users.requests.domain.services import CurrentUserRequestsService

STARTING = "starting"
PROCESSING = "processing"
OPERATION_IS_OVER = "Operation is over"

OPERATION_IS_OVER__COMPETITION_STARTED = f"{OPERATION_IS_OVER} (competition started)"


class CurrentUserRequestsHandlers(metaclass=HandlersMetaclass):
    COMPETITION_HAS_ALREADY_STARTED = "The competition has already started"

    STARTED_COMPETITION = "started competition"
    REQUEST = "request"

    def __init__(self, requests_service: CurrentUserRequestsService, competition_service: RequestCompetitionService):
        self._requests_service = requests_service
        self._competition_service = competition_service

    def get_requests_from_user(self, request: HttpRequest, _operation_id: UUID) -> List[CurrentUserRequestOut]:
        requests = self._requests_service.get_requests_from_user(request.user)

        return [CurrentUserRequestOut.from_orm(user_request) for user_request in requests]

    def get_request_from_user(
        self, request: HttpRequest, _operation_id: UUID, request_id: int
    ) -> CurrentUserRequestDetailsOut:
        if not (
            user_request := self._requests_service.get_request_with_participation_and_forms_from_user(
                request_id, request.user
            )
        ):
            raise NotFoundException(self.REQUEST)

        return self._requests_service.get_request_details(user_request)

    def cancel_request_from_user(self, request: HttpRequest, _operation_id: UUID, request_id: int) -> SuccessResponse:
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

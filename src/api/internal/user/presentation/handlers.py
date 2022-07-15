from typing import List

from django.http import HttpRequest
from ninja import Body

from api.internal.exceptions import NotFoundException, ServerException, UnprocessableEntityException
from api.internal.responses import SuccessResponse
from api.internal.user.domain.entities import (
    DefaultProfileIn,
    DefaultProfileOut,
    FieldValueSchema,
    FormsIn,
    ParticipationSchema,
    RequestDetailsOut,
    RequestIn,
    RequestOut,
    SwitchOut,
)
from api.internal.user.domain.services import RequestService, UserService


class UserHandlers:
    INVALID_COMPETITION_ERROR = "Invalid competition data"
    INVALID_TEAM_ERROR = "Invalid user ids"
    INVALID_ANY_FORMS_ERROR = "Invalid form details"

    def __init__(self, user_service: UserService, request_service: RequestService):
        self._user_service = user_service
        self._request_service = request_service

    def get_profile(self, request: HttpRequest) -> DefaultProfileOut:
        return DefaultProfileOut.from_orm(request.user)

    def update_profile(self, request: HttpRequest, data: DefaultProfileIn = Body(...)) -> SuccessResponse:
        self._user_service.update_profile(request.user, data)

        return SuccessResponse()

    def get_requests(self, request: HttpRequest) -> List[RequestOut]:
        requests = self._request_service.get_requests(request.user)

        return [RequestOut.from_orm(r) for r in requests]

    def get_request(self, request: HttpRequest, request_id: int) -> RequestDetailsOut:
        request = self._request_service.get_request(request.user, request_id)
        if not request:
            raise NotFoundException("request")

        participants = self._request_service.get_participants(request)

        return RequestDetailsOut.create(request, participants)

    def create_request(self, request: HttpRequest, data: RequestIn = Body(...)) -> RequestOut:
        is_competition_valid = self._request_service.validate_competition_for_registration(request.user, data)
        if not is_competition_valid:
            raise UnprocessableEntityException(self.INVALID_COMPETITION_ERROR)

        if not self._request_service.validate_users(data):
            raise UnprocessableEntityException(self.INVALID_TEAM_ERROR)

        if not self._request_service.validate_forms(data):
            raise UnprocessableEntityException(self.INVALID_ANY_FORMS_ERROR)

        req = self._request_service.try_create(request.user, data)
        if not req:
            raise ServerException()

        return RequestOut.from_orm(req)

    def update_request(self, request: HttpRequest, request_id: int, data: FormsIn = Body(...)) -> SuccessResponse:
        req = self._request_service.get_request(request.user, request_id)
        if not req:
            raise NotFoundException("request")

        if not self._request_service.validate_competition_for_updating(req, data):
            raise UnprocessableEntityException(self.INVALID_COMPETITION_ERROR)

        if not self._request_service.validate_users(data):
            raise UnprocessableEntityException(self.INVALID_TEAM_ERROR)

        request_in = RequestIn(competition_id=req.competition.id, team_name=data.team_name, team=data.team)
        if not self._request_service.validate_forms(request_in):
            raise UnprocessableEntityException(self.INVALID_ANY_FORMS_ERROR)

        was_updated = self._request_service.try_update(request_id, request_in)
        if not was_updated:
            raise ServerException()

        return SuccessResponse()

    def cancel_request(self, request: HttpRequest, request_id: int) -> SuccessResponse:
        if not self._request_service.exists(request.user, request_id):
            raise NotFoundException("request")

        self._request_service.cancel(request_id)

        return SuccessResponse()

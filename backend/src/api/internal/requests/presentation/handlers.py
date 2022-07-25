from typing import List

from django.http import HttpRequest
from ninja import Body

from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
from api.internal.requests.domain.entities import FormsIn, ProcessIn, RequestDetailsOut, RequestIn, RequestOut
from api.internal.requests.domain.services import RequestService
from api.internal.responses import SuccessResponse


class RequestHandlers:
    INVALID_COMPETITION_ERROR = "Invalid competition data"
    INVALID_TEAM_ERROR = "Invalid user ids"
    INVALID_ANY_FORMS_ERROR = "Invalid form details"
    COMPETITION_ALREADY_STARTED_ERROR = "Competition already started"

    REQUEST = "request"

    def __init__(self, request_service: RequestService):
        self._request_service = request_service

    def get_requests(self, request: HttpRequest) -> List[RequestOut]:
        requests = self._request_service.get_requests(request.user)

        return [RequestOut.from_orm(user_request) for user_request in requests]

    def get_request(self, request: HttpRequest, request_id: int) -> RequestDetailsOut:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        if not self._request_service.is_owner_or_admin_on_competition(request.user, user_request):
            raise ForbiddenException()

        return self._request_service.get_request_details(user_request)

    def create_request(self, request: HttpRequest, data: RequestIn = Body(...)) -> RequestOut:
        if not self._request_service.validate_competition_for_registration(request.user, data):
            raise UnprocessableEntityException(self.INVALID_COMPETITION_ERROR)

        if not self._request_service.validate_users(data):
            raise UnprocessableEntityException(self.INVALID_TEAM_ERROR)

        if not self._request_service.validate_forms(data):
            raise UnprocessableEntityException(self.INVALID_ANY_FORMS_ERROR)

        return RequestOut.from_orm(self._request_service.create(request.user, data))

    def update_request(self, request: HttpRequest, request_id: int, data: FormsIn = Body(...)) -> SuccessResponse:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        if not self._request_service.is_owner_or_admin_on_competition(request.user, user_request):
            raise ForbiddenException()

        if not self._request_service.validate_competition_for_updating(user_request, data):
            raise UnprocessableEntityException(self.INVALID_COMPETITION_ERROR)

        if not self._request_service.validate_users(data):
            raise UnprocessableEntityException(self.INVALID_TEAM_ERROR)

        request_in = RequestIn(competition_id=user_request.competition.id, team_name=data.team_name, team=data.team)
        if not self._request_service.validate_forms(request_in):
            raise UnprocessableEntityException(self.INVALID_ANY_FORMS_ERROR)

        self._request_service.update(request_id, request_in)

        return SuccessResponse()

    def cancel_request(self, request: HttpRequest, request_id: int) -> SuccessResponse:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        if not self._request_service.is_owner_or_admin_on_competition(request.user, user_request):
            raise ForbiddenException()

        if self._request_service.is_competition_started(user_request):
            raise UnprocessableEntityException(self.COMPETITION_ALREADY_STARTED_ERROR)

        self._request_service.cancel(request_id)

        return SuccessResponse()

    def process_request(self, request: HttpRequest, request_id: int, data: ProcessIn) -> SuccessResponse:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        if not self._request_service.is_admin_on_competition(request.user, user_request):
            raise ForbiddenException()

        self._request_service.process(user_request, data)

        return SuccessResponse()

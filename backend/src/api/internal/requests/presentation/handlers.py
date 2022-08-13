from typing import List

from django.http import HttpRequest
from ninja import Body

from api.internal.competitions.domain.services import CompetitionService
from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
from api.internal.requests.domain.entities import FormsIn, ProcessIn, RequestDetailsOut, RequestIn, RequestOut
from api.internal.requests.domain.services import RequestService
from api.internal.responses import SuccessResponse


class RequestHandlers:
    REGISTRATION_IS_OVER = "Registration is over"
    INVALID_TEAM = "Team validation error"
    INVALID_FORMS = "Forms validation error"
    COMPETITION_HAS_ALREADY_STARTED = "Competition has already started"
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

    def create_request(self, request: HttpRequest, data: RequestIn = Body(...)) -> SuccessResponse:
        if not (competition := self._competition_service.get(data.competition)):
            raise UnprocessableEntityException(self.UNKNOWN_COMPETITION, error=self.COMPETITION)

        if self._request_service.exists_request_on_competition(request.user.id, data.competition):
            raise UnprocessableEntityException(self.REQUEST_HAS_ALREADY_CREATED, error=self.REQUEST)

        if not self._competition_service.is_registration_started(competition):
            raise UnprocessableEntityException(self.REGISTRATION_HAS_NOT_STARTED_YET, error=self.REGISTRATION_START)

        if self._competition_service.is_registration_over(competition):
            raise UnprocessableEntityException(self.REGISTRATION_IS_OVER, error=self.REGISTRATION_END)

        if not self._request_service.validate_users(competition, data):
            raise UnprocessableEntityException(self.INVALID_TEAM, error=self.BAD_USERS)

        if not self._request_service.validate_forms(data):
            raise UnprocessableEntityException(self.INVALID_FORMS, error=self.BAD_FORMS)

        self._request_service.create(request.user, data)

        return SuccessResponse()

    def update_request(self, request: HttpRequest, request_id: int, data: FormsIn = Body(...)) -> SuccessResponse:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        if not self._request_service.has_access(request.user, user_request):
            raise ForbiddenException()

        if self._competition_service.is_registration_over(user_request.competition):
            raise UnprocessableEntityException(self.REGISTRATION_IS_OVER, error=self.REGISTRATION_END)

        if not self._request_service.validate_users(user_request.competition, data):
            raise UnprocessableEntityException(self.INVALID_TEAM, error=self.BAD_USERS)

        request_in = RequestIn(competition=user_request.competition_id, team_name=data.team_name, team=data.team)
        if not self._request_service.validate_forms(request_in):
            raise UnprocessableEntityException(self.INVALID_FORMS, error=self.BAD_FORMS)

        self._request_service.update(user_request, request_in)

        return SuccessResponse()

    def cancel_request(self, request: HttpRequest, request_id: int) -> SuccessResponse:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        if not self._request_service.has_access(request.user, user_request):
            raise ForbiddenException()

        if self._competition_service.is_started(user_request.competition):
            raise UnprocessableEntityException(self.COMPETITION_HAS_ALREADY_STARTED, error=self.COMPETITION)

        self._request_service.cancel(user_request)

        return SuccessResponse()

    def process_request(self, request: HttpRequest, request_id: int, data: ProcessIn) -> SuccessResponse:
        if not (user_request := self._request_service.get_request(request_id)):
            raise NotFoundException(self.REQUEST)

        if not self._request_service.has_access(request.user, user_request, only_admin=True):
            raise ForbiddenException()

        self._request_service.process(user_request, data)

        return SuccessResponse()

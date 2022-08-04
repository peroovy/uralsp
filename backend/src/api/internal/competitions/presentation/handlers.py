from typing import List

from django.http import HttpRequest
from ninja import Body, Query

from api.internal.competitions.domain.entities import (
    AdminsIn,
    CompetitionDetailsOut,
    CompetitionIn,
    CompetitionOut,
    FieldDetailsOut,
    Filters,
    FormIn,
    RequestOut,
    RequestTemplateIn,
)
from api.internal.competitions.domain.services import CompetitionService
from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.services import FieldService
from api.internal.requests.domain.services import RequestService
from api.internal.responses import SuccessResponse
from api.internal.users.domain.services import UserService


class CompetitionHandlers:
    INVALID_DATES = "Invalid dates"
    INVALID_PERSONS_AMOUNT = "Invalid persons_amount"
    INVALID_FIELDS = "Invalid field ids"
    INVALID_ADMINS = "Invalid admin ids"

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
    ):
        self._competition_service = competition_service
        self._request_service = request_service
        self._field_service = field_service
        self._user_service = user_service

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

    def create_competition(self, request: HttpRequest, data: CompetitionIn = Body(...)) -> SuccessResponse:
        self._assert_data_in(data)

        self._competition_service.create(data)

        return SuccessResponse()

    def update_competition(
        self, request: HttpRequest, competition_id: int, data: CompetitionIn = Body(...)
    ) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.has_access(competition_id, request.user):
            raise ForbiddenException()

        self._assert_data_in(data)

        self._competition_service.update(competition_id, data)

        return SuccessResponse()

    def delete_competition(self, request: HttpRequest, competition_id: int) -> SuccessResponse:
        if not self._competition_service.delete(competition_id):
            raise NotFoundException(self.COMPETITION)

        return SuccessResponse()

    def get_requests_on_competition(self, request: HttpRequest, competition_id: int) -> List[RequestOut]:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.has_access(competition_id, request.user):
            raise ForbiddenException()

        return [
            RequestOut.from_orm(user_request) for user_request in self._request_service.get_requests_for(competition_id)
        ]

    def update_form(self, request: HttpRequest, competition_id: int, data: FormIn = Body(...)) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.has_access(competition_id, request.user):
            raise ForbiddenException()

        if not self._competition_service.validate_fields(data.fields):
            raise UnprocessableEntityException(self.INVALID_FIELDS, error=self.BAD_FIELDS)

        self._competition_service.update_form(competition_id, data)

        return SuccessResponse()

    def update_admins(self, request: HttpRequest, competition_id: int, data: AdminsIn = Body(...)) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.validate_admins(data.admins):
            raise UnprocessableEntityException(self.INVALID_ADMINS, error=self.BAD_ADMINS)

        self._competition_service.update_admins(competition_id, data)

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

    def _assert_data_in(self, data: CompetitionIn) -> None:
        if not self._competition_service.validate_persons_amount(data):
            raise UnprocessableEntityException(self.INVALID_PERSONS_AMOUNT, error=self.BAD_PERSONS_AMOUNT)

        if not self._competition_service.validate_dates(data):
            raise UnprocessableEntityException(self.INVALID_DATES, error=self.BAD_DATES)

        if not self._competition_service.validate_admins(data.admins):
            raise UnprocessableEntityException(self.INVALID_ADMINS, error=self.BAD_ADMINS)

        if not self._competition_service.validate_fields(data.fields):
            raise UnprocessableEntityException(self.INVALID_FIELDS, error=self.BAD_FIELDS)

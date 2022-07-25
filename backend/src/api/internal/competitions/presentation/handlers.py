from typing import List

from django.forms import model_to_dict
from django.http import HttpRequest
from ninja import Body, Query

from api.internal.competitions.domain.entities import (
    AdminsIn,
    CompetitionDetailsOut,
    CompetitionFieldDetailsOut,
    CompetitionFilters,
    CompetitionIn,
    CompetitionOut,
    CompetitionRequestOut,
    FormIn,
    RequestTemplateIn,
)
from api.internal.competitions.domain.services import CompetitionService
from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
from api.internal.responses import SuccessResponse


class CompetitionHandlers:
    INVALID_DATES_ERROR = "Invalid dates"
    INVALID_PERSONS_AMOUNT_ERROR = "Invalid amount of persons"
    UNKNOWN_ANY_FIELDS_ERROR = "Unknown any fields"
    UNKNOWN_ANY_ADMINS_ERROR = "Unknown any admins"

    COMPETITION = "competition"

    def __init__(self, competition_service: CompetitionService):
        self._competition_service = competition_service

    def get_competitions(self, request: HttpRequest, filters: CompetitionFilters = Query(...)) -> List[CompetitionOut]:
        competitions = self._competition_service.get_filtered(filters)

        return [CompetitionOut.from_orm(competition) for competition in competitions]

    def get_competition(self, request: HttpRequest, competition_id: int) -> CompetitionDetailsOut:
        if not (competition := self._competition_service.get(competition_id)):
            raise NotFoundException(self.COMPETITION)

        return CompetitionDetailsOut.from_orm(competition)

    def get_form(self, request: HttpRequest, competition_id: int) -> List[CompetitionFieldDetailsOut]:
        if not (competition := self._competition_service.get(competition_id)):
            raise NotFoundException(self.COMPETITION)

        return [
            CompetitionFieldDetailsOut(
                **model_to_dict(field), default_values=list(field.default_values.values_list("value", flat=True))
            )
            for field in competition.fields.all()
        ]

    def create_competition(self, request: HttpRequest, data: CompetitionIn = Body(...)) -> SuccessResponse:
        self._validate_competition_in(data)

        self._competition_service.create(data)

        return SuccessResponse()

    def update_competition(
        self, request: HttpRequest, competition_id: int, data: CompetitionIn = Body(...)
    ) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.is_admin_on_competition(competition_id, request.user):
            raise ForbiddenException()

        self._validate_competition_in(data)

        self._competition_service.update(competition_id, data)

        return SuccessResponse()

    def delete_competition(self, request: HttpRequest, competition_id: int) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        self._competition_service.delete(competition_id)

        return SuccessResponse()

    def get_requests_on_competition(self, request: HttpRequest, competition_id: int) -> List[CompetitionRequestOut]:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.is_admin_on_competition(competition_id, request.user):
            raise ForbiddenException()

        return [
            CompetitionRequestOut.from_orm(user_request)
            for user_request in self._competition_service.get_requests_for(competition_id)
        ]

    def update_form(self, request: HttpRequest, competition_id: int, data: FormIn = Body(...)) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.is_admin_on_competition(competition_id, request.user):
            raise ForbiddenException()

        if not self._competition_service.exists_all_fields(data.fields):
            raise UnprocessableEntityException(self.UNKNOWN_ANY_FIELDS_ERROR)

        self._competition_service.update_form(competition_id, data)

        return SuccessResponse()

    def update_admins(self, request: HttpRequest, competition_id: int, data: AdminsIn = Body(...)) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.exists_all_admins(data.admins):
            raise UnprocessableEntityException(self.UNKNOWN_ANY_ADMINS_ERROR)

        self._competition_service.update_admins(competition_id, data)

        return SuccessResponse()

    def update_request_template(
        self, request: HttpRequest, competition_id: int, data: RequestTemplateIn = Body(...)
    ) -> SuccessResponse:
        if not self._competition_service.exists(competition_id):
            raise NotFoundException(self.COMPETITION)

        if not self._competition_service.is_admin_on_competition(competition_id, request.user):
            raise ForbiddenException()

        self._competition_service.update_request_template(competition_id, data.request_template)

        return SuccessResponse()

    def _validate_competition_in(self, data: CompetitionIn) -> None:
        if not self._competition_service.validate_person_amount(data.persons_amount):
            raise UnprocessableEntityException(self.INVALID_PERSONS_AMOUNT_ERROR)

        if not self._competition_service.validate_dates(data.registration_before, data.started_at, data.end_at):
            raise UnprocessableEntityException(self.INVALID_DATES_ERROR)

        if not self._competition_service.exists_all_fields(data.fields):
            raise UnprocessableEntityException(self.UNKNOWN_ANY_FIELDS_ERROR)

        if not self._competition_service.exists_all_admins(data.admins):
            raise UnprocessableEntityException(self.UNKNOWN_ANY_ADMINS_ERROR)

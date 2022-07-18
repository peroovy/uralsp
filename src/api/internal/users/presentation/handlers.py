from django.http import HttpRequest
from ninja import Body

from api.internal.responses import SuccessResponse
from api.internal.users.domain.entities import DefaultProfileIn, DefaultProfileOut
from api.internal.users.domain.services import UserService


class UserHandlers:
    def __init__(self, user_service: UserService):
        self._user_service = user_service

    def get_profile(self, request: HttpRequest) -> DefaultProfileOut:
        return DefaultProfileOut.from_orm(request.user)

    def update_profile(self, request: HttpRequest, data: DefaultProfileIn = Body(...)) -> SuccessResponse:
        self._user_service.update_profile(request.user, data)

        return SuccessResponse()

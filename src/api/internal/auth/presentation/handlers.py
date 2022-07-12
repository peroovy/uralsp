from django.conf import settings
from django.http import HttpRequest
from ninja import Body
from ninja.responses import Response
from vk import API
from vk.exceptions import VkAPIError

from api.internal.auth.domain.entities import TokenDetailsOut, VKLoginIn
from api.internal.auth.domain.services import AuthService, RegisterService
from api.internal.auth.domain.services.auth import TokenTypes
from api.internal.exceptions import (
    ExpiredTokenException,
    InvalidPayloadException,
    NotFoundRefreshTokenException,
    RevokedRefreshTokenException,
    ServerException,
    UnauthorizedException,
    UnknownRefreshTokenException,
)


class AuthHandlers:
    def __init__(self, auth_service: AuthService, register_service: RegisterService):
        self._auth_service = auth_service
        self._register_service = register_service

    def signin_vkontakte(self, request: HttpRequest, params: VKLoginIn = Body(...)) -> Response:
        try:
            api = API(access_token=params.access_token, v=settings.VKONTAKTE_API_VERSION)
            response = api.secure.checkToken(token=params.access_token, access_token=params.service_token)
        except VkAPIError:
            raise UnauthorizedException()

        vk_id = response["user_id"]
        user = self._auth_service.get_user_by_vkontakte_id(vk_id)
        if not user:
            user = self._register_service.register_from_vkontakte(vk_id, params.name, params.surname)

        details = self._auth_service.try_create_access_and_refresh_tokens(user)
        if not details:
            raise ServerException()

        details_response = Response(data=TokenDetailsOut(access_token=details.access, expires_in=details.expires_in))
        details_response.set_cookie(settings.REFRESH_TOKEN_COOKIE, details.refresh, httponly=True)

        return details_response

    def refresh(self, request: HttpRequest) -> Response:
        refresh_token: str = request.COOKIES.get(settings.REFRESH_TOKEN_COOKIE)
        if not refresh_token:
            raise NotFoundRefreshTokenException()

        payload = self._auth_service.try_get_payload(refresh_token)
        if (
            not payload
            or not self._auth_service.is_payload_valid(payload)
            or not self._auth_service.is_token_type(payload, TokenTypes.REFRESH)
        ):
            raise InvalidPayloadException()

        if self._auth_service.is_token_expired(payload):
            raise ExpiredTokenException()

        token = self._auth_service.get_refresh_token_details(refresh_token)
        if not token:
            raise UnknownRefreshTokenException()

        details = self._auth_service.try_update_access_and_refresh_tokens(token)
        if details is None:
            raise ServerException()

        if details is False:
            raise RevokedRefreshTokenException()

        response = Response(data=TokenDetailsOut(access_token=details.access, expires_in=details.expires_in))
        response.set_cookie(settings.REFRESH_TOKEN_COOKIE, details.refresh, httponly=True)

        return response

import httpx
from django.conf import settings
from django.http import HttpRequest
from ninja import Body
from ninja.responses import Response

from api.internal.auth.domain.entities import SocialLoginIn, TokenDetailsOut
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
    VKONTAKTE_ACCESS_TOKEN_URL = "https://oauth.vk.com/access_token"
    VKONTAKTE_USER_DETAILS_URL = "https://api.vk.com/method/users.get"

    def __init__(self, auth_service: AuthService, register_service: RegisterService):
        self._auth_service = auth_service
        self._register_service = register_service

    def signin_vkontakte(self, request: HttpRequest, auth_params: SocialLoginIn = Body(...)) -> Response:
        access_response = httpx.get(
            url=self.VKONTAKTE_ACCESS_TOKEN_URL,
            params={
                "client_id": auth_params.client_id,
                "client_secret": auth_params.client_secret,
                "code": auth_params.code,
            },
        )
        if access_response.is_error:
            raise UnauthorizedException()

        details_response = httpx.get(
            url=self.VKONTAKTE_USER_DETAILS_URL,
            params={
                "access_token": access_response.json()["access_token"],
                "fields": "nickname,contacts",
                "v": settings.VKONTAKTE_API_VERSION,
            },
        )

        if details_response.is_error:
            raise UnauthorizedException()

        body = details_response.json()["response"][0]
        vk_id, name, surname, patronymic, phone = (
            body["id"],
            body["first_name"],
            body["last_name"],
            body["nickname"],
            body["mobile_phone"],
        )

        user = self._auth_service.get_user_by_vkontakte_id(vk_id)
        if not user:
            if not (
                user := self._register_service.try_register_from_vkontakte(vk_id, name, surname, patronymic, phone)
            ):
                raise ServerException()

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

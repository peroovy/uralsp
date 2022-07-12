from typing import Callable, Optional

from django.conf import settings
from django.http import HttpRequest
from google.auth.transport import requests
from google.oauth2 import id_token
from ninja import Body
from ninja.responses import Response
from vk import API
from vk.exceptions import VkAPIError

from api.internal.auth.domain.entities import GoogleLoginIn, TokenDetailsOut, VKLoginIn
from api.internal.auth.domain.services import AuthService, RegisterService
from api.internal.auth.domain.services.auth import TokenTypes
from api.internal.db.models import User
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
            info = api.account.getProfileInfo(access_token=params.access_token)
        except VkAPIError:
            raise UnauthorizedException()

        return self.signin(
            social_id=info["id"],
            name=info["first_name"],
            surname=info["last_name"],
            get_user_by_social_id=self._auth_service.get_user_by_vkontakte_id,
            register=self._register_service.register_by_vkontakte_id,
        )

    def signin_google(self, request: HttpRequest, params: GoogleLoginIn = Body(...)) -> Response:
        try:
            info = id_token.verify_oauth2_token(params.id_token, requests.Request(), params.client_id)
        except ValueError:
            raise UnauthorizedException()

        google_id, name, surname = info["sub"], info["given_name"], info["family_name"]

        return self.signin(
            social_id=google_id,
            name=name,
            surname=surname,
            get_user_by_social_id=self._auth_service.get_user_by_google_id,
            register=self._register_service.register_by_google_id,
        )

    def signin(
        self,
        social_id: int,
        name: str,
        surname: str,
        get_user_by_social_id: Callable[[int], Optional[User]],
        register: Callable[[str, str, int], User],
    ) -> Response:
        user = get_user_by_social_id(social_id)
        if not user:
            user = register(name, surname, social_id)

        details = self._auth_service.try_create_access_and_refresh_tokens(user)
        if not details:
            raise ServerException()

        response = Response(data=TokenDetailsOut(access_token=details.access, expires_in=details.expires_in))
        response.set_cookie(settings.REFRESH_TOKEN_COOKIE, details.refresh, httponly=True)

        return response

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
        if not details:
            raise ServerException()

        if not details.access:
            raise RevokedRefreshTokenException()

        response = Response(data=TokenDetailsOut(access_token=details.access, expires_in=details.expires_in))
        response.set_cookie(settings.REFRESH_TOKEN_COOKIE, details.refresh, httponly=True)

        return response

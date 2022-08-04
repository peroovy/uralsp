from django.conf import settings
from django.http import HttpRequest
from ninja import Body
from ninja.responses import Response

from api.internal.auth.domain.entities import GoogleLoginIn, TokenDetailsOut, VKLoginIn
from api.internal.auth.domain.services import AuthService, SocialService, TokenTypes
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
    def __init__(self, auth_service: AuthService, social_service: SocialService):
        self._auth_service = auth_service
        self._social_service = social_service

    def signin_vkontakte(self, request: HttpRequest, params: VKLoginIn = Body(...)) -> Response:
        user = self._social_service.try_get_or_create_user_from_vkontakte(params.access_token)
        if not user:
            raise UnauthorizedException()

        return self.signin(user)

    def signin_google(self, request: HttpRequest, params: GoogleLoginIn = Body(...)) -> Response:
        user = self._social_service.try_get_or_create_user_from_google(params.id_token)
        if not user:
            raise UnauthorizedException()

        return self.signin(user)

    def signin(self, user: User) -> Response:
        details = self._auth_service.try_create_access_and_refresh_tokens(user)
        if not details:
            raise ServerException()

        response = Response(data=TokenDetailsOut(access_token=details.access, expires_in=details.expires_in))
        response.set_cookie(settings.REFRESH_TOKEN_COOKIE, details.refresh, httponly=True)

        return response

    def refresh(self, request: HttpRequest) -> Response:
        refresh_token: str = request.COOKIES.try_get(settings.REFRESH_TOKEN_COOKIE)
        if not refresh_token:
            raise NotFoundRefreshTokenException()

        payload = self._auth_service.try_get_payload(refresh_token)

        if not payload or not self._auth_service.is_token_type(payload, TokenTypes.REFRESH):
            raise InvalidPayloadException(TokenTypes.REFRESH)

        if self._auth_service.is_token_expired(payload):
            raise ExpiredTokenException(TokenTypes.REFRESH)

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

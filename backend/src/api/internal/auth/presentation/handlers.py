from django.conf import settings
from django.http import HttpRequest
from ninja import Body
from ninja.responses import Response

from api.internal.auth.domain.entities import GoogleCredentialsIn, TokenDetailsOut, VKCredentialsIn
from api.internal.auth.domain.services import JWTService, TokenTypes
from api.internal.auth.domain.social import GoogleAuth, SocialBase, VKAuth
from api.internal.db.repositories import google_repo, vk_repo
from api.internal.exceptions import (
    ExpiredTokenException,
    InvalidPayloadException,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
)


class AuthHandlers:
    REFRESH_TOKEN_WAS_REVOKED = "Refresh token was revoked"

    REFRESH_TOKEN = "refresh token"
    REVOKED_TOKEN = "revoked token"
    REFRESH_TOKEN_IN_COOKIES = "refresh token in cookies"

    def __init__(self, auth_service: JWTService):
        self._auth_service = auth_service

    def signin_vkontakte(self, request: HttpRequest, credentials: VKCredentialsIn = Body(...)) -> Response:
        return self.signin(VKAuth(credentials, vk_repo))

    def signin_google(self, request: HttpRequest, credentials: GoogleCredentialsIn = Body(...)) -> Response:
        return self.signin(GoogleAuth(credentials, google_repo))

    def signin(self, social: SocialBase) -> Response:
        if not (user := social.signin()):
            raise UnauthorizedException()

        details = self._auth_service.create_access_and_refresh_tokens(user)

        response = Response(data=TokenDetailsOut(access_token=details.access, expires_in=details.expires_in))
        response.set_cookie(settings.REFRESH_TOKEN_COOKIE, details.refresh, httponly=True)

        return response

    def refresh(self, request: HttpRequest) -> Response:
        if not (refresh_token := request.COOKIES.get(settings.REFRESH_TOKEN_COOKIE)):
            raise NotFoundException(self.REFRESH_TOKEN_IN_COOKIES)

        payload = self._auth_service.try_get_payload(refresh_token)

        if not payload or not self._auth_service.is_token_type(payload, TokenTypes.REFRESH):
            raise InvalidPayloadException(TokenTypes.REFRESH)

        if self._auth_service.is_token_expired(payload):
            raise ExpiredTokenException(TokenTypes.REFRESH)

        if not (token := self._auth_service.get_refresh_token_details(refresh_token)):
            raise NotFoundException(self.REFRESH_TOKEN)

        if not (details := self._auth_service.try_update_access_and_refresh_tokens(token)):
            raise UnprocessableEntityException(self.REFRESH_TOKEN_WAS_REVOKED, error=self.REVOKED_TOKEN)

        response = Response(data=TokenDetailsOut(access_token=details.access, expires_in=details.expires_in))
        response.set_cookie(settings.REFRESH_TOKEN_COOKIE, details.refresh, httponly=True)

        return response

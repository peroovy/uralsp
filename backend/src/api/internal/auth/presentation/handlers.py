from django.conf import settings
from django.http import HttpRequest
from ninja import Body
from ninja.responses import Response

from api.internal.auth.domain.entities import TokenDetailsOut
from api.internal.auth.domain.services import JWTService, TokenTypes
from api.internal.auth.domain.socials.entities import GoogleCredentialsIn, TelegramCredentialsIn, VKCredentialsIn
from api.internal.auth.domain.socials.services import GoogleAuth, SocialBase, TelegramAuth, VKAuth
from api.internal.base_handlers import BaseHandlers
from api.internal.db.repositories import google_repo, telegram_repo, vk_repo
from api.internal.exceptions import UnauthorizedException, UnprocessableEntityException


class AuthHandlers(BaseHandlers):
    REFRESH_TOKEN_IS_REVOKED = "Refresh token is revoked"
    REFRESH_TOKEN_IS_EXPIRED = "Refresh token is expired"
    NOT_FOUND_REFRESH_TOKEN_IN_COOKIES = "Not found refresh token in cookies"
    NOT_FOUND_REFRESH_TOKEN_DETAILS = "Not found refresh token details in database"
    INVALID_PAYLOAD = "Invalid payload"

    UNKNOWN_TOKEN = "unknown token"
    REVOKED_TOKEN = "revoked token"
    EXPIRED_TOKEN = "expired token"
    BAD_COOKIES = "bad cookies"
    BAD_SOCIAL_CREDENTIALS = "bad social credentials"
    BAD_TOKEN = "bad token"

    def __init__(self, jwt_service: JWTService):
        self._jwt_service = jwt_service

    def signin_vkontakte(self, request: HttpRequest, credentials: VKCredentialsIn = Body(...)) -> Response:
        return self._signin(VKAuth(credentials, vk_repo))

    def signin_google(self, request: HttpRequest, credentials: GoogleCredentialsIn = Body(...)) -> Response:
        return self._signin(GoogleAuth(credentials, google_repo))

    def signin_telegram(self, request: HttpRequest, credentials: TelegramCredentialsIn = Body(...)) -> Response:
        return self._signin(TelegramAuth(credentials, telegram_repo))

    def _signin(self, social: SocialBase) -> Response:
        if not (user := social.signin()):
            raise UnauthorizedException(error=self.BAD_SOCIAL_CREDENTIALS)

        details = self._jwt_service.create_access_and_refresh_tokens(user)

        response = Response(data=TokenDetailsOut(access_token=details.access, expires_in=details.expires_in))
        response.set_cookie(settings.REFRESH_TOKEN_COOKIE, details.refresh, httponly=True)

        return response

    def refresh(self, request: HttpRequest) -> Response:
        if settings.REFRESH_TOKEN_COOKIE not in request.COOKIES:
            raise UnprocessableEntityException(self.NOT_FOUND_REFRESH_TOKEN_IN_COOKIES, error=self.BAD_COOKIES)

        value = request.COOKIES[settings.REFRESH_TOKEN_COOKIE]
        payload = self._jwt_service.try_get_payload(value)

        if not payload or not self._jwt_service.is_token_type(payload, TokenTypes.REFRESH):
            raise UnprocessableEntityException(self.INVALID_PAYLOAD, error=self.BAD_TOKEN)

        if self._jwt_service.is_token_expired(payload):
            raise UnprocessableEntityException(self.REFRESH_TOKEN_IS_EXPIRED, error=self.EXPIRED_TOKEN)

        if not (token := self._jwt_service.get_refresh_token_details(value)):
            raise UnprocessableEntityException(self.NOT_FOUND_REFRESH_TOKEN_DETAILS, error=self.UNKNOWN_TOKEN)

        if not (details := self._jwt_service.try_update_access_and_refresh_tokens(token)):
            raise UnprocessableEntityException(self.REFRESH_TOKEN_IS_REVOKED, error=self.REVOKED_TOKEN)

        response = Response(data=TokenDetailsOut(access_token=details.access, expires_in=details.expires_in))
        response.set_cookie(settings.REFRESH_TOKEN_COOKIE, details.refresh, httponly=True)

        return response

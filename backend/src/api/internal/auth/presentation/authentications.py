from abc import abstractmethod
from typing import Optional

from django.http import HttpRequest
from ninja.security import HttpBearer

from api.internal.auth.domain.services import JWTService, TokenTypes
from api.internal.db.models import User
from api.internal.db.models.user import Permissions
from api.internal.db.repositories import refresh_repo, user_repo
from api.internal.exceptions import ForbiddenException, UnauthorizedException


class JWTAuthentication(HttpBearer):
    EXPIRED_TOKEN = "expired token"
    UNKNOWN_USER = "unknown user"

    _service = JWTService(user_repo, refresh_repo)

    def authenticate(self, request: HttpRequest, token: str) -> Optional[str]:
        request.user = None

        payload = self._service.try_get_payload(token)

        if not payload or not self._service.is_token_type(payload, TokenTypes.ACCESS):
            raise UnauthorizedException()

        if self._service.is_token_expired(payload):
            raise UnauthorizedException(error=self.EXPIRED_TOKEN)

        if not (user := self._service.get_user(payload)):
            raise UnauthorizedException(error=self.UNKNOWN_USER)

        if not self.authorize(user):
            raise ForbiddenException()

        request.user = user
        return token

    @abstractmethod
    def authorize(self, user: User) -> bool:
        ...


class AnyUser(JWTAuthentication):
    def authorize(self, user: User) -> bool:
        return True


class AnyAdmin(JWTAuthentication):
    def authorize(self, user: User) -> bool:
        return user.permission in [Permissions.ADMIN, Permissions.SUPER_ADMIN]


class OnlySuperAdmin(JWTAuthentication):
    def authorize(self, user: User) -> bool:
        return user.permission == Permissions.SUPER_ADMIN

from abc import abstractmethod
from typing import Optional

from django.http import HttpRequest
from ninja.security import HttpBearer

from api.internal.auth.domain.services import AuthService
from api.internal.auth.domain.services.auth import TokenTypes
from api.internal.db.models import User
from api.internal.db.models.user import Permissions
from api.internal.db.repositories import refresh_repo, user_repo
from api.internal.exceptions import ForbiddenException, UnauthorizedException


class JWTAuthentication(HttpBearer):
    _service = AuthService(user_repo, refresh_repo)

    def authenticate(self, request: HttpRequest, token: str) -> Optional[str]:
        request.user = None

        payload = self._service.try_get_payload(token)

        if (
            payload
            and self._service.are_payload_keys_valid(payload)
            and self._service.is_token_type(payload, TokenTypes.ACCESS)
            and not self._service.is_token_expired(payload)
        ):
            user = self._service.get_user(payload)
            if not user:
                raise UnauthorizedException()

            if not self.authorize(user):
                raise ForbiddenException()

            request.user = user
            return token

        raise UnauthorizedException()

    @abstractmethod
    def authorize(self, user: User) -> bool:
        ...


class AllowDefaultUser(JWTAuthentication):
    def authorize(self, user: User) -> bool:
        return user.permission == Permissions.DEFAULT

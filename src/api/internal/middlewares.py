from typing import Optional

from django.http import HttpRequest
from ninja.security import HttpBearer

from api.internal.auth.domain.services import AuthService
from api.internal.auth.domain.services.auth import TokenTypes
from api.internal.db.repositories import refresh_repo, user_repo


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
            request.user = self._service.get_user(payload)

            return token if request.user else None

        return None

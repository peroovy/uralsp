from collections import Counter
from datetime import datetime
from enum import Enum
from typing import Optional, Tuple, Union

from django.conf import settings
from django.db import IntegrityError
from django.db.transaction import atomic
from django.utils import timezone
from jwt import PyJWTError, decode, encode

from api.internal.db.models import RefreshToken, User
from api.internal.db.repositories.refresh_token import IRefreshTokenRepository
from api.internal.db.repositories.user import IUserRepository


class TokenTypes(Enum):
    ACCESS = "access"
    REFRESH = "refresh"


class TokenDetails:
    def __init__(self, access: str = None, refresh: str = None, expires_in: float = None):
        self.access = access
        self.refresh = refresh
        self.expires_in = expires_in


class AuthService:
    TOKEN_TYPE = "type"
    USER_ID = "user_id"
    EXPIRES_IN = "expires_in"
    PERMISSION = "permission"

    PAYLOAD_FIELDS = [TOKEN_TYPE, USER_ID, EXPIRES_IN, PERMISSION]
    ALGORITHM = "HS256"

    def __init__(self, user_repo: IUserRepository, refresh_repo: IRefreshTokenRepository):
        self._user_repo = user_repo
        self._refresh_repo = refresh_repo

    def get_user(self, payload: dict) -> Optional[User]:
        return self._user_repo.get(payload[self.USER_ID])

    def get_user_by_vkontakte_id(self, vk_id: int) -> Optional[User]:
        return self._user_repo.get_user_by_vkontakte_id(vk_id)

    def get_user_by_google_id(self, google_id: int) -> Optional[User]:
        return self._user_repo.get_user_by_google_id(google_id)

    def try_create_access_and_refresh_tokens(self, user: User) -> Optional[TokenDetails]:
        access, expires_in = self.generate_token(user, TokenTypes.ACCESS)
        refresh = self.generate_token(user, TokenTypes.REFRESH)[0]

        try:
            with atomic():
                self._refresh_repo.revoke_all(user.id)
                self._refresh_repo.create(user.id, refresh)

                return TokenDetails(access, refresh, expires_in)
        except IntegrityError:
            return None

    def try_update_access_and_refresh_tokens(self, refresh: RefreshToken) -> Optional[TokenDetails]:
        if refresh.revoked:
            self._refresh_repo.revoke_all(refresh.user.id)
            return TokenDetails()

        return self.try_create_access_and_refresh_tokens(refresh.user)

    def generate_token(self, user: User, token_type: TokenTypes) -> Tuple[str, float]:
        ttl = settings.REFRESH_TOKEN_TTL if token_type == TokenTypes.REFRESH else settings.ACCESS_TOKEN_TTL
        expires_in = (self._now() + ttl).timestamp()

        payload = {
            self.TOKEN_TYPE: token_type.value,
            self.USER_ID: user.id,
            self.PERMISSION: user.permission,
            self.EXPIRES_IN: expires_in,
        }

        return encode(payload, settings.SECRET_KEY, algorithm=self.ALGORITHM), expires_in

    def try_get_payload(self, token: str) -> Optional[dict]:
        try:
            return decode(token, settings.SECRET_KEY, algorithms=[self.ALGORITHM])
        except PyJWTError:
            return None

    def is_token_type(self, payload: dict, token_type: TokenTypes) -> bool:
        return payload.get(self.TOKEN_TYPE) == token_type.value

    def is_payload_valid(self, payload: dict) -> bool:
        return Counter(payload.keys()) == Counter(self.PAYLOAD_FIELDS)

    def is_token_expired(self, payload: dict):
        return self._now().timestamp() >= payload[self.EXPIRES_IN]

    def get_refresh_token_details(self, value: str) -> Optional[RefreshToken]:
        return self._refresh_repo.get(value)

    @staticmethod
    def _now() -> datetime:
        return timezone.now()

    @staticmethod
    def _from_timestamp(value: float) -> datetime:
        return datetime.fromtimestamp(value, tz=timezone.get_current_timezone())

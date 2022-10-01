from enum import Enum
from typing import Optional, Tuple

from django.conf import settings
from django.db.transaction import atomic
from django.utils.timezone import now
from jwt import PyJWTError, decode, encode

from api.internal.db.models import RefreshToken, User
from api.internal.db.models.user import Permissions
from api.internal.db.repositories.refresh_token import IRefreshTokenRepository
from api.internal.db.repositories.user import IUserRepository


class TokenTypes(Enum):
    ACCESS = "access"
    REFRESH = "refresh"


class TokenPairDetails:
    def __init__(self, access: str, refresh: str, expires_in: float):
        self.access = access
        self.refresh = refresh
        self.expires_in = expires_in


class Payload:
    TOKEN_TYPE = "type"
    USER_ID = "user_id"
    EXPIRES_IN = "expires_in"
    PERMISSION = "permission"

    def __init__(self, token_type: TokenTypes, expires_in: float, user_id: int, permission: Permissions):
        self._token_type = token_type
        self._user_id = user_id
        self._expires_in = int(expires_in)
        self._permission = permission

    @property
    def token_type(self) -> str:
        return str(self._token_type.value)

    @property
    def expires_in(self) -> int:
        return self._expires_in

    @property
    def user_id(self) -> int:
        return self._user_id

    @property
    def permission(self) -> str:
        return self._permission.value

    def to_dictionary(self) -> dict:
        return {
            self.TOKEN_TYPE: self.token_type,
            self.USER_ID: self.user_id,
            self.EXPIRES_IN: self.expires_in,
            self.PERMISSION: self.permission,
        }

    @staticmethod
    def create(dictionary: dict) -> "Payload":
        return Payload(
            token_type=TokenTypes(dictionary[Payload.TOKEN_TYPE]),
            expires_in=dictionary[Payload.EXPIRES_IN],
            user_id=dictionary[Payload.USER_ID],
            permission=Permissions(dictionary[Payload.PERMISSION]),
        )


class JWTService:
    ALGORITHM = "HS256"

    TTLs = {
        TokenTypes.ACCESS: settings.ACCESS_TOKEN_TTL,
        TokenTypes.REFRESH: settings.REFRESH_TOKEN_TTL,
    }

    def __init__(self, user_repo: IUserRepository, refresh_repo: IRefreshTokenRepository):
        self._user_repo = user_repo
        self._refresh_repo = refresh_repo

    def get_user(self, payload: Payload) -> Optional[User]:
        return self._user_repo.try_get(payload.user_id)

    @atomic
    def create_access_and_refresh_tokens(self, user: User) -> Optional[TokenPairDetails]:
        access, expires_in = self.generate_token(user, TokenTypes.ACCESS)
        refresh: str = self.generate_token(user, TokenTypes.REFRESH)[0]

        self._refresh_repo.revoke_all(user.id)
        refresh: RefreshToken = self._refresh_repo.get_or_create(user.id, refresh)

        return TokenPairDetails(access, refresh.value, expires_in)

    def try_update_access_and_refresh_tokens(self, refresh: RefreshToken) -> Optional[TokenPairDetails]:
        if refresh.revoked:
            self._refresh_repo.revoke_all(refresh.user.id)
            return None

        return self.create_access_and_refresh_tokens(refresh.user)

    def generate_token(self, user: User, token_type: TokenTypes) -> Tuple[str, int]:
        expires_in = int((now() + self.TTLs[token_type]).timestamp())
        payload = Payload(token_type, expires_in, user.id, Permissions(user.permission))

        return encode(payload.to_dictionary(), settings.SECRET_KEY, algorithm=self.ALGORITHM), expires_in

    def try_get_payload(self, token: str) -> Optional[Payload]:
        try:
            return Payload.create(decode(token, settings.SECRET_KEY, algorithms=[self.ALGORITHM]))
        except (PyJWTError, KeyError, ValueError):
            return None

    def is_token_type(self, payload: Payload, token_type: TokenTypes) -> bool:
        return payload.token_type == token_type.value

    def is_token_expired(self, payload: Payload) -> bool:
        return int(now().timestamp()) >= payload.expires_in

    def get_refresh_token_details(self, value: str) -> Optional[RefreshToken]:
        return self._refresh_repo.try_get(value)

from datetime import datetime
from enum import Enum
from typing import Optional, Tuple

from django.conf import settings
from django.db import IntegrityError
from django.db.transaction import atomic
from django.utils import timezone
from google.auth.transport import requests
from google.oauth2 import id_token as google_id_token
from jwt import PyJWTError, decode, encode
from vk import API
from vk.exceptions import VkException

from api.internal.db.models import RefreshToken, User
from api.internal.db.repositories.refresh_token import IRefreshTokenRepository
from api.internal.db.repositories.social import ISocialRepository
from api.internal.db.repositories.user import IUserRepository


class TokenTypes(Enum):
    ACCESS = "access"
    REFRESH = "refresh"


class TokenPairDetails:
    def __init__(self, access: str = None, refresh: str = None, expires_in: float = None):
        self.access = access
        self.refresh = refresh
        self.expires_in = expires_in


class Payload:
    TOKEN_TYPE = "type"
    USER_ID = "user_id"
    EXPIRES_IN = "expires_in"
    PERMISSION = "permission"

    def __init__(self, token_type: str, expires_in: int, user_id: int, permission: int):
        self._token_type = token_type
        self._user_id = user_id
        self._expires_in = expires_in
        self._permission = permission

    @property
    def token_type(self) -> str:
        return self._token_type

    @property
    def expires_in(self) -> int:
        return self._expires_in

    @property
    def user_id(self) -> int:
        return self._user_id

    @property
    def permission(self) -> int:
        return self._permission

    def to_dictionary(self) -> dict:
        return {
            self.TOKEN_TYPE: self._token_type,
            self.USER_ID: self._user_id,
            self.EXPIRES_IN: self._expires_in,
            self.PERMISSION: self._permission,
        }

    @staticmethod
    def create(dictionary: dict) -> "Payload":
        return Payload(
            token_type=dictionary[Payload.TOKEN_TYPE],
            expires_in=dictionary[Payload.EXPIRES_IN],
            user_id=dictionary[Payload.USER_ID],
            permission=dictionary[Payload.PERMISSION],
        )


class AuthService:
    ALGORITHM = "HS256"

    def __init__(self, user_repo: IUserRepository, refresh_repo: IRefreshTokenRepository):
        self._user_repo = user_repo
        self._refresh_repo = refresh_repo

    def get_user(self, payload: Payload) -> Optional[User]:
        return self._user_repo.get(payload.user_id)

    def try_create_access_and_refresh_tokens(self, user: User) -> Optional[TokenPairDetails]:
        access, expires_in = self.generate_token(user, TokenTypes.ACCESS)
        refresh = self.generate_token(user, TokenTypes.REFRESH)[0]

        try:
            with atomic():
                self._refresh_repo.revoke_all(user.id)
                self._refresh_repo.create(user.id, refresh)

                return TokenPairDetails(access, refresh, expires_in)
        except IntegrityError:
            return None

    def try_update_access_and_refresh_tokens(self, refresh: RefreshToken) -> Optional[TokenPairDetails]:
        if refresh.revoked:
            self._refresh_repo.revoke_all(refresh.user.id)
            return TokenPairDetails()

        return self.try_create_access_and_refresh_tokens(refresh.user)

    def generate_token(self, user: User, token_type: TokenTypes) -> Tuple[str, float]:
        ttl = settings.REFRESH_TOKEN_TTL if token_type == TokenTypes.REFRESH else settings.ACCESS_TOKEN_TTL
        expires_in = int((self._now() + ttl).timestamp())

        payload = Payload(token_type.value, expires_in, user.id, user.permission)

        return encode(payload.to_dictionary(), settings.SECRET_KEY, algorithm=self.ALGORITHM), expires_in

    def try_get_payload(self, token: str) -> Optional[Payload]:
        try:
            return Payload.create(decode(token, settings.SECRET_KEY, algorithms=[self.ALGORITHM]))
        except (PyJWTError, KeyError):
            return None

    def is_token_type(self, payload: Payload, token_type: TokenTypes) -> bool:
        return payload.token_type == token_type.value

    def is_token_expired(self, payload: Payload) -> bool:
        return int(self._now().timestamp()) >= payload.expires_in

    def get_refresh_token_details(self, value: str) -> Optional[RefreshToken]:
        return self._refresh_repo.get(value)

    @staticmethod
    def _now() -> datetime:
        return timezone.now()

    @staticmethod
    def _from_timestamp(value: float) -> datetime:
        return datetime.fromtimestamp(value, tz=timezone.get_current_timezone())


class SocialService:
    def __init__(self, vkontakte_repo: ISocialRepository, google_repo: ISocialRepository):
        self._vkontakte_repo = vkontakte_repo
        self._google_repo = google_repo

    def try_get_or_create_user_from_vkontakte(self, access_token: str) -> Optional[User]:
        try:
            api = API(access_token=access_token, v=settings.VKONTAKTE_API_VERSION)
            info = api.account.getProfileInfo(access_token=access_token)

            vk_id, name, surname = info["id"], info["first_name"], info["last_name"]

            return self._vkontakte_repo.get_user(vk_id) or self._vkontakte_repo.create(vk_id, surname, name)
        except VkException:
            return None

    def try_get_or_create_user_from_google(self, id_token: str, client_id: str) -> Optional[User]:
        try:
            info = google_id_token.verify_oauth2_token(id_token, requests.Request(), client_id)
            google_id, name, surname = info["sub"], info["given_name"], info["family_name"]

            return self._google_repo.get_user(google_id) or self._google_repo.create(google_id, surname, name)
        except ValueError:
            return None

import hashlib
import hmac
from abc import ABC, abstractmethod
from collections import namedtuple
from typing import Optional

from django.conf import settings
from django.utils.timezone import now
from google.auth.transport import requests
from google.oauth2 import id_token as google_id_token
from vk import API
from vk.exceptions import VkException

from api.internal.db.models import User
from api.internal.db.repositories.social import SocialBaseRepository
from api.internal.socials.entities import GoogleCredentialsIn, TelegramCredentialsIn, VKCredentialsIn

SocialData = namedtuple("SocialData", ["id", "surname", "name"])


class SocialBase(ABC):
    def __init__(self, social_repo: SocialBaseRepository):
        self._social_repo = social_repo

    def signin(self) -> Optional[User]:
        if not (data := self.authenticate()):
            return None

        return self._social_repo.get_or_create(data.id, data.surname, data.name)

    def link(self, user_id: int) -> Optional[bool]:
        if not (data := self.authenticate()):
            return None

        return self._social_repo.update_user(user_id, data.id)

    def unlink(self, user_id: int) -> bool:
        return self._social_repo.update_user(user_id, None)

    @abstractmethod
    def authenticate(self) -> Optional[SocialData]:
        ...


class VKAuth(SocialBase):
    ID = "id"
    SURNAME = "last_name"
    NAME = "first_name"

    def __init__(self, credentials: Optional[VKCredentialsIn], vk_repo: SocialBaseRepository):
        super(VKAuth, self).__init__(vk_repo)
        self._credentials = credentials

    def authenticate(self) -> Optional[SocialData]:
        try:
            api = API(access_token=self._credentials.access_token, v=settings.VKONTAKTE_API_VERSION)
            data = api.account.getProfileInfo(access_token=self._credentials.access_token)

            return SocialData(data[self.ID], data[self.SURNAME], data[self.NAME])
        except VkException:
            return None


class GoogleAuth(SocialBase):
    ID = "sub"
    SURNAME = "family_name"
    NAME = "given_name"

    def __init__(self, credentials: Optional[GoogleCredentialsIn], google_repo: SocialBaseRepository):
        super(GoogleAuth, self).__init__(google_repo)
        self._credentials = credentials

    def authenticate(self) -> Optional[SocialData]:
        try:
            data = google_id_token.verify_oauth2_token(self._credentials.id_token, requests.Request())

            return SocialData(data[self.ID], data[self.SURNAME], data[self.NAME])
        except ValueError:
            return None


class TelegramAuth(SocialBase):
    HASH = "hash"

    def __init__(self, credentials: Optional[TelegramCredentialsIn], telegram_repo: SocialBaseRepository):
        super(TelegramAuth, self).__init__(telegram_repo)
        self._credentials = credentials

    def authenticate(self) -> Optional[SocialData]:
        if int(now().timestamp()) - self._credentials.auth_date > settings.TELEGRAM_DATA_LIFETIME.seconds:
            return None

        data = dict((key, value) for key, value in self._credentials.dict().items() if value is not None)
        del data[self.HASH]

        data_check_string = "\n".join(f"{key}={value}" for key, value in sorted(data.items(), key=lambda p: p[0]))
        secret_key = hashlib.sha256(settings.TELEGRAM_BOT_TOKEN.encode()).digest()
        _hash = hmac.new(secret_key, msg=data_check_string.encode(), digestmod=hashlib.sha256).hexdigest()

        if _hash != self._credentials.hash:
            return None

        return SocialData(self._credentials.id, self._credentials.last_name, self._credentials.first_name)

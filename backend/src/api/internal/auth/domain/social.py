from abc import ABC, abstractmethod
from typing import Optional

from django.conf import settings
from google.auth.transport import requests
from google.oauth2 import id_token as google_id_token
from vk import API
from vk.exceptions import VkException

from api.internal.auth.domain.entities import GoogleCredentialsIn, VKCredentialsIn
from api.internal.db.models import User
from api.internal.db.repositories.social import ISocialRepository


class SocialBase(ABC):
    @abstractmethod
    def authenticate(self) -> Optional[dict]:
        ...

    @abstractmethod
    def signin(self) -> Optional[User]:
        ...

    @abstractmethod
    def link(self, user_id: int) -> bool:
        ...

    @abstractmethod
    def unlink(self, user_id: int) -> bool:
        ...


class VKAuth(SocialBase):
    ID = "id"
    SURNAME = "last_name"
    NAME = "first_name"

    def __init__(self, credentials: Optional[VKCredentialsIn], vk_repo: ISocialRepository):
        self._credentials = credentials
        self._vk_repo = vk_repo

    def authenticate(self) -> Optional[dict]:
        try:
            api = API(access_token=self._credentials.access_token, v=settings.VKONTAKTE_API_VERSION)

            return api.account.getProfileInfo(access_token=self._credentials.access_token)
        except VkException:
            return None

    def signin(self) -> Optional[User]:
        if not (info := self.authenticate()):
            return None

        vk_id, name, surname = info[self.ID], info[self.NAME], info[self.SURNAME]

        return self._vk_repo.get_or_create(vk_id, surname, name)

    def link(self, user_id: int) -> Optional[bool]:
        if not (info := self.authenticate()):
            return None

        return self._vk_repo.update_user(user_id, info[self.ID])

    def unlink(self, user_id: int) -> bool:
        return self._vk_repo.update_user(user_id, None)


class GoogleAuth(SocialBase):
    ID = "sub"
    SURNAME = "family_name"
    NAME = "given_name"

    def __init__(self, credentials: Optional[GoogleCredentialsIn], google_repo: ISocialRepository):
        self._credentials = credentials
        self._google_repo = google_repo

    def authenticate(self) -> Optional[dict]:
        try:
            return google_id_token.verify_oauth2_token(self._credentials.id_token, requests.Request())
        except ValueError:
            return None

    def signin(self) -> Optional[User]:
        if not (data := self.authenticate()):
            return None

        google_id, name, surname = data[self.ID], data[self.NAME], data[self.SURNAME]

        return self._google_repo.get_or_create(google_id, surname, name)

    def link(self, user_id: int) -> Optional[bool]:
        if not (data := self.authenticate()):
            return None

        return self._google_repo.update_user(user_id, data[self.ID])

    def unlink(self, user_id: int) -> bool:
        return self._google_repo.update_user(user_id, None)

from abc import ABC, abstractmethod
from typing import Optional

from api.internal.db.models import User


class BaseSocial(ABC):
    def __init__(self, name: str, surname: str, social_id: int):
        self.name = name
        self.surname = surname
        self.social_id = social_id

    def get_or_create(self) -> User:
        return self._get_user() or self._create()

    @abstractmethod
    def _get_user(self) -> Optional[User]:
        ...

    @abstractmethod
    def _create(self) -> User:
        ...


class Vkontakte(BaseSocial):
    def _get_user(self) -> Optional[User]:
        return User.objects.filter(vkontakte_id=self.social_id).first()

    def _create(self) -> User:
        return User.objects.create(name=self.name, surname=self.surname, vkontakte_id=self.social_id)


class Google(BaseSocial):
    def _get_user(self) -> Optional[User]:
        return User.objects.filter(google_id=self.social_id).first()

    def _create(self) -> User:
        return User.objects.create(name=self.name, surname=self.surname, google_id=self.social_id)

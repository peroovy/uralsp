from abc import ABC, abstractmethod
from typing import Optional

from api.internal.db.models import User


class ISocialRepository(ABC):
    @abstractmethod
    def get_user(self, social_id: int) -> Optional[User]:
        ...

    @abstractmethod
    def create(self, social_id: int, surname: str, name: str) -> User:
        ...


class VKontakteRepository(ISocialRepository):
    def get_user(self, social_id: int) -> Optional[User]:
        return User.objects.filter(vkontakte_id=social_id).first()

    def create(self, social_id: int, surname: str, name: str) -> User:
        return User.objects.create(name=name, surname=surname, vkontakte_id=social_id)


class GoogleRepository(ISocialRepository):
    def get_user(self, social_id: int) -> Optional[User]:
        return User.objects.filter(google_id=social_id).first()

    def create(self, social_id: int, surname: str, name: str) -> User:
        return User.objects.create(name=name, surname=surname, google_id=social_id)

from abc import ABC, abstractmethod
from typing import Optional

from api.internal.db.models import User


class ISocialRepository(ABC):
    @abstractmethod
    def update_user(self, user_id: int, social_id: Optional[int]) -> bool:
        ...

    @abstractmethod
    def get_or_create(self, social_id: int, surname: str, name: str) -> User:
        ...


class VKRepository(ISocialRepository):
    def update_user(self, user_id: int, social_id: Optional[int]) -> bool:
        return User.objects.filter(id=user_id).update(vkontakte_id=social_id) > 0

    def get_or_create(self, social_id: int, surname: str, name: str) -> User:
        return User.objects.get_or_create(vkontakte_id=social_id, defaults={"surname": surname, "name": name})[0]


class GoogleRepository(ISocialRepository):
    def update_user(self, user_id: int, social_id: Optional[int]) -> bool:
        return User.objects.filter(id=user_id).update(google_id=social_id) > 0

    def get_or_create(self, social_id: int, surname: str, name: str) -> User:
        return User.objects.get_or_create(google_id=social_id, defaults={"surname": surname, "name": name})[0]

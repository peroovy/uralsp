from abc import ABC, abstractmethod
from typing import Optional

from api.internal.db.models import User


class IUserRepository(ABC):
    @abstractmethod
    def get(self, user_id: int) -> Optional[User]:
        ...

    @abstractmethod
    def get_user_by_vkontakte_id(self, vk_id: int) -> Optional[User]:
        ...


class UserRepository(IUserRepository):
    def get(self, user_id: int) -> Optional[User]:
        return User.objects.filter(id=user_id).first()

    def get_user_by_vkontakte_id(self, vk_id: int) -> Optional[User]:
        return User.objects.filter(vkontakte_id=vk_id).first()

from abc import ABC, abstractmethod
from typing import Optional

from phonenumbers import PhoneNumber, PhoneNumberFormat, format_number

from api.internal.db.models import User
from api.internal.db.models.user import Permissions


class IUserRepository(ABC):
    @abstractmethod
    def create(
        self,
        name: str,
        surname: str,
        patronymic: str = None,
        permission: Permissions = Permissions.DEFAULT,
        email: str = None,
        phone: PhoneNumber = None,
        region: str = None,
        school: str = None,
        school_class: str = None,
        vkontakte_id: int = None,
    ) -> User:
        ...

    @abstractmethod
    def get(self, user_id: int) -> Optional[User]:
        ...

    @abstractmethod
    def get_user_by_vkontakte_id(self, vk_id: int) -> Optional[User]:
        ...


class UserRepository(IUserRepository):
    def create(
        self,
        name: str,
        surname: str,
        patronymic: str = None,
        permission: Permissions = Permissions.DEFAULT,
        email: str = None,
        phone: PhoneNumber = None,
        region: str = None,
        school: str = None,
        school_class: str = None,
        vkontakte_id: int = None,
    ):

        if email is not None and "@" not in email:
            raise ValueError("Wrong email")

        return User.objects.create(
            name=name,
            surname=surname,
            patronymic=patronymic,
            permission=permission,
            email=email,
            phone=format_number(phone, PhoneNumberFormat.E164) if phone is not None else None,
            school=school,
            school_class=school_class,
            vkontakte_id=vkontakte_id,
        )

    def get(self, user_id: int) -> Optional[User]:
        return User.objects.filter(id=user_id).first()

    def get_user_by_vkontakte_id(self, vk_id: int) -> Optional[User]:
        return User.objects.filter(vkontakte_id=vk_id).first()

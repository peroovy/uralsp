from abc import ABC, abstractmethod
from typing import Iterable, Optional

from django.db.models import Q, QuerySet, Value
from django.db.models.functions import Concat
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
        google_id: int = None,
        telegram_id: int = None,
    ) -> User:
        ...

    @abstractmethod
    def get(self, user_id: int) -> Optional[User]:
        ...

    @abstractmethod
    def get_all_without_super_admins(
        self, permission: Optional[int], school: str, school_class: str, region: str, email: str, fcs: str
    ) -> QuerySet[User]:
        ...

    @abstractmethod
    def get_count(self, ids: Iterable[int]) -> int:
        ...

    @abstractmethod
    def update(self, user_id: int, **kwargs) -> None:
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
        google_id: int = None,
        telegram_id: int = None,
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
            google_id=google_id,
            telegram_id=telegram_id,
        )

    def get(self, user_id: int) -> Optional[User]:
        return User.objects.filter(id=user_id).first()

    def get_all_without_super_admins(
        self, permission: Optional[int], school: str, school_class: str, region: str, email: str, fcs: str
    ) -> QuerySet[User]:
        attr = dict(
            (key, value)
            for key, value in [
                ["school__istartswith", school],
                ["school_class__istartswith", school_class],
                ["region__istartswith", region],
                ["email__startswith", email],
                ["full_name__icontains", fcs.replace(" ", "")],
            ]
            if value
        )

        if permission is not None:
            attr["permission"] = permission

        return (
            User.objects.annotate(full_name=Concat("surname", "name", "patronymic"))
            .filter(**attr)
            .filter(~Q(permission=Permissions.SUPER_ADMIN))
        )

    def get_count(self, ids: Iterable[int]) -> int:
        return User.objects.filter(id__in=ids).count()

    def update(self, user_id: int, **kwargs) -> None:
        return User.objects.select_for_update().filter(id=user_id).update(**kwargs)

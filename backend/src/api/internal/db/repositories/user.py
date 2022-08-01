from abc import ABC, abstractmethod
from typing import Iterable, Optional, Set

from django.db.models import QuerySet
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
    def get_filtered(
        self, permission: Optional[int], school: str, school_class: str, region: str, email: str, fcs: str
    ) -> QuerySet[User]:
        ...

    @abstractmethod
    def get_count(self, ids: Iterable[int]) -> int:
        ...

    @abstractmethod
    def update(self, user_id: int, **kwargs) -> bool:
        ...

    @abstractmethod
    def get_socials_amount(self, user_id: int) -> int:
        ...

    @abstractmethod
    def exist_all_admins(self, ids: Set[int]) -> bool:
        ...

    @abstractmethod
    def exist_all(self, *ids: int) -> bool:
        ...

    @abstractmethod
    def equal_permissions(self, user_id_1: int, user_id_2: int) -> bool:
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

    def get_filtered(
        self, permission: Optional[int], school: Optional[str], school_class: Optional[str], region: Optional[str], email: Optional[str], fcs: Optional[str]
    ) -> QuerySet[User]:
        attr = dict(
            (key, value)
            for key, value in [
                ["school__istartswith", school],
                ["school_class__istartswith", school_class],
                ["region__istartswith", region],
                ["email__startswith", email],
                ["full_name__istartswith", (fcs or "").replace(" ", "")],
                ["permission", permission]
            ]
            if value is not None
        )

        return User.objects.annotate(full_name=Concat("surname", "name", "patronymic")).filter(**attr)

    def get_count(self, ids: Iterable[int]) -> int:
        return User.objects.filter(id__in=ids).count()

    def update(self, user_id: int, **kwargs) -> bool:
        return User.objects.filter(id=user_id).select_for_update().update(**kwargs) > 0

    def get_socials_amount(self, user_id: int) -> int:
        socials = User.objects.filter(id=user_id).values_list("vkontakte_id", "google_id", "telegram_id").first()

        return sum(social is not None for social in socials)

    def exist_all_admins(self, ids: Set[int]) -> bool:
        return len(ids) == User.objects.filter(id__in=ids, permission=Permissions.ADMIN).count()

    def exist_all(self, *ids: int) -> bool:
        ids = set(ids)

        return len(ids) > 0 and len(ids) == User.objects.filter(id__in=ids).count()

    def equal_permissions(self, user_id_1: int, user_id_2: int) -> bool:
        return User.objects.filter(id=user_id_1).values_list("permission") == User.objects.filter(
            id=user_id_2
        ).values_list("permission")

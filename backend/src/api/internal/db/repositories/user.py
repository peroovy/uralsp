from abc import ABC, abstractmethod
from typing import Iterable, Optional, Set

from django.db.models import QuerySet, Q
from django.db.models.functions import Concat
from phonenumbers import PhoneNumber, PhoneNumberFormat, format_number

from api.internal.db.models import User
from api.internal.db.models.user import Institution, Permissions
from api.internal.utils import get_strip_filters


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
        institution_type: Institution = None,
        institution_name: str = None,
        institution_faculty: str = None,
        institution_course: str = None,
        vkontakte_id: int = None,
        google_id: int = None,
        telegram_id: int = None,
    ) -> User:
        ...

    @abstractmethod
    def try_get(self, user_id: int) -> Optional[User]:
        ...

    @abstractmethod
    def get_filtered(
        self,
        permission: Optional[int],
        institution_type: Optional[Institution],
        institution_name: Optional[str],
        institution_faculty: Optional[str],
        institution_course: Optional[str],
        region: Optional[str],
        email: Optional[str],
        fcs: Optional[str],
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

    @abstractmethod
    def can_update_email(self, owner_id: int, email: str) -> bool:
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
        institution_type: Institution = None,
        institution_name: str = None,
        institution_faculty: str = None,
        institution_course: str = None,
        vkontakte_id: int = None,
        google_id: int = None,
        telegram_id: int = None,
    ):
        return User.objects.create(
            name=name,
            surname=surname,
            patronymic=patronymic,
            permission=permission,
            email=email,
            phone=format_number(phone, PhoneNumberFormat.E164) if phone is not None else None,
            institution_type=institution_type,
            institution_name=institution_name,
            institution_faculty=institution_faculty,
            institution_course=institution_course,
            vkontakte_id=vkontakte_id,
            google_id=google_id,
            telegram_id=telegram_id,
        )

    def try_get(self, user_id: int) -> Optional[User]:
        return User.objects.filter(id=user_id).first()

    def get_filtered(
        self,
        permission: Optional[int],
        institution_type: Optional[Institution],
        institution_name: Optional[str],
        institution_faculty: Optional[str],
        institution_course: Optional[str],
        region: Optional[str],
        email: Optional[str],
        fcs: Optional[str],
    ) -> QuerySet[User]:
        filters = get_strip_filters(
            institution_name__istartswith=institution_name,
            institution_faculty__istartswith=institution_faculty,
            institution_course__istartswith=institution_course,
            region__istartswith=region,
            email__startswith=email,
        )

        if fcs is not None:
            filters["full_name__istartswith"] = fcs.replace(" ", "")

        if permission is not None:
            filters["permission"] = permission

        if institution_type is not None:
            filters["institution_type"] = institution_type

        return User.objects.annotate(full_name=Concat("surname", "name", "patronymic")).filter(**filters)

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
        permissions = User.objects.filter(id__in=[user_id_1, user_id_2]).values_list("permission", flat=True)

        return len(set(permissions)) == 1

    def can_update_email(self, owner_id: int, email: str) -> bool:
        return not User.objects.filter(not Q(id=owner_id) and Q(email=email)).exists()

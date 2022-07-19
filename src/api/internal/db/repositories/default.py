from abc import ABC, abstractmethod
from typing import Iterable

from django.db.models import QuerySet

from api.internal.db.models import DefaultValue


class IDefaultRepository(ABC):
    @abstractmethod
    def create(self, field_id: str, values: Iterable[str]) -> QuerySet[DefaultValue]:
        ...

    @abstractmethod
    def delete_all(self, field_id: str) -> None:
        ...


class DefaultRepository(IDefaultRepository):
    def create(self, field_id: str, values: Iterable[str]) -> QuerySet[DefaultValue]:
        return DefaultValue.objects.bulk_create(DefaultValue(field_id=field_id, value=value) for value in values)

    def delete_all(self, field_id: str) -> None:
        DefaultValue.objects.filter(field_id=field_id).delete()

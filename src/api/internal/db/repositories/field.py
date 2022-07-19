import operator
from abc import ABC, abstractmethod
from functools import reduce
from typing import Optional

from django.db.models import QuerySet, Q

from api.internal.db.models import Field
from api.internal.db.models.field import FieldTypes


class IFieldRepository(ABC):
    @abstractmethod
    def get_filtered(self, search: str) -> QuerySet[Field]:
        ...

    @abstractmethod
    def get(self, field_id: str) -> Optional[Field]:
        ...

    @abstractmethod
    def exists(self, field_id: str) -> bool:
        ...

    @abstractmethod
    def delete(self, field_id: str) -> None:
        ...

    @abstractmethod
    def create(self, field_id: str, name: str, type: FieldTypes, is_required: bool, is_visible: bool) -> Field:
        ...

    @abstractmethod
    def update(self, field_id: str, name: str, type: FieldTypes, is_required: bool, is_visible: bool) -> bool:
        pass


class FieldRepository(IFieldRepository):
    def get_filtered(self, search: str) -> QuerySet[Field]:
        attr = [
            Q(**{key: value}) for key, value in [["id__istartswith", search], ["name__istartswith", search]] if search
        ]

        queryset = Field.objects.prefetch_related("default_values")
        if attr:
            queryset = queryset.filter(reduce(operator.or_, attr))

        return queryset

    def get(self, field_id: str) -> Optional[Field]:
        return Field.objects.filter(id=field_id).prefetch_related("default_values").first()

    def exists(self, field_id: str) -> bool:
        return Field.objects.filter(id=field_id).exists()

    def delete(self, field_id: str) -> None:
        return Field.objects.filter(id=field_id).delete()

    def create(self, field_id: str, name: str, type: FieldTypes, is_required: bool, is_visible: bool):
        return Field.objects.create(id=field_id, name=name, type=type, is_required=is_required, is_visible=is_visible)

    def update(self, field_id: str, name: str, type: FieldTypes, is_required: bool, is_visible: bool) -> bool:
        return (
            Field.objects.filter(id=field_id)
            .select_for_update()
            .update(name=name, type=type, is_required=is_required, is_visible=is_visible)
            > 0
        )

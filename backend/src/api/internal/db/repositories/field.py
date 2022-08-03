import operator
from abc import ABC, abstractmethod
from functools import reduce
from typing import Optional, Set

from django.db.models import Q, QuerySet

from api.internal.db.models import Field
from api.internal.utils import get_strip_filters


class IFieldRepository(ABC):
    @abstractmethod
    def get_filtered_by_id_and_name(self, search: str) -> QuerySet[Field]:
        ...

    @abstractmethod
    def try_get(self, field_id: str) -> Optional[Field]:
        ...

    @abstractmethod
    def exists(self, field_id: str) -> bool:
        ...

    @abstractmethod
    def delete(self, field_id: str) -> bool:
        ...

    @abstractmethod
    def create(self, field_id: str, name: str, type: int, is_required: bool, is_visible: bool) -> Field:
        ...

    @abstractmethod
    def update(self, field_id: str, name: str, type: int, is_required: bool, is_visible: bool) -> bool:
        ...

    @abstractmethod
    def exist_all(self, ids: Set[str]) -> bool:
        ...


class FieldRepository(IFieldRepository):
    def get_filtered_by_id_and_name(self, search: str) -> QuerySet[Field]:
        filters = [Q(**{k: v}) for k, v in get_strip_filters(id__istartswith=search, name__istartswith=search).items()]

        queryset = Field.objects.prefetch_related("default_values")
        if filters:
            queryset = queryset.filter(reduce(operator.or_, filters))

        return queryset

    def try_get(self, field_id: str) -> Optional[Field]:
        return Field.objects.filter(id=field_id).prefetch_related("default_values").first()

    def exists(self, field_id: str) -> bool:
        return Field.objects.filter(id=field_id).exists()

    def exist_all(self, ids: Set[str]) -> bool:
        return len(ids) > 0 and len(ids) == Field.objects.filter(id__in=ids).count()

    def delete(self, field_id: str) -> bool:
        return Field.objects.filter(id=field_id).delete()[0] > 0

    def create(self, field_id: str, name: str, type: int, is_required: bool, is_visible: bool):
        return Field.objects.create(id=field_id, name=name, type=type, is_required=is_required, is_visible=is_visible)

    def update(self, field_id: str, name: str, type: int, is_required: bool, is_visible: bool) -> bool:
        return (
            Field.objects.filter(id=field_id)
            .select_for_update()
            .update(name=name, type=type, is_required=is_required, is_visible=is_visible)
            > 0
        )

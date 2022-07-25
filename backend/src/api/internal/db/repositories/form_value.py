from abc import ABC, abstractmethod
from typing import Iterable, Set

from django.db.models import QuerySet

from api.internal.db.models import FormValue


class FieldValue:
    def __init__(self, field_id: str, value: str):
        self.field_id = field_id
        self.value = value


class IFormValueRepository(ABC):
    @abstractmethod
    def create(self, participation_id: int, form_values: Iterable[FieldValue]) -> QuerySet[FormValue]:
        ...

    @abstractmethod
    def get_lasts_for(self, user_id: int, field_ids: Set[str]) -> QuerySet[FormValue]:
        ...


class FormValueRepository(IFormValueRepository):
    def create(self, participation_id: int, form_values: Iterable[FieldValue]) -> QuerySet[FormValue]:
        return FormValue.objects.bulk_create(
            FormValue(
                participation_id=participation_id,
                field_id=form_value.field_id,
                value=form_value.value,
            )
            for form_value in form_values
        )

    def get_lasts_for(self, user_id: int, field_ids: Set[str]) -> QuerySet[FormValue]:
        return (
            FormValue.objects.filter(participation__user_id=user_id, field_id__in=field_ids)
            .order_by("field", "-id")
            .distinct("field")
        )

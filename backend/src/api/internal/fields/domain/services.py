from typing import Iterable, List, Optional

from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
from django.db.transaction import atomic
from django.forms import model_to_dict

from api.internal.db.models import Field
from api.internal.db.repositories.default import IDefaultRepository
from api.internal.db.repositories.field import IFieldRepository
from api.internal.fields.domain.entities import FieldFilters, FieldSchema, FieldUpdatingIn


class FieldService:
    def __init__(self, field_repo: IFieldRepository, default_repo: IDefaultRepository):
        self._field_repo = field_repo
        self._default_repo = default_repo

    def get(self, field_id) -> Optional[Field]:
        return self._field_repo.get(field_id)

    def get_filtered(self, filters: FieldFilters) -> List[Field]:
        return list(self._field_repo.get_filtered(filters.search))

    def exists(self, field_id: str) -> bool:
        return self._field_repo.exists(field_id)

    def exist_all(self, ids: List[str]) -> bool:
        return self._field_repo.exist_all(ids)

    def try_delete(self, field_id: str) -> bool:
        try:
            self._field_repo.delete(field_id)

            return True
        except DatabaseError:
            return False

    @atomic
    def create(self, data: FieldSchema) -> None:
        self._field_repo.create(data.id, data.name, data.type, data.is_required, data.is_visible)
        self._default_repo.create(data.id, data.default_values)

    @atomic
    def update(self, field_id: str, data: FieldUpdatingIn) -> None:
        if not self._field_repo.update(field_id, data.name, data.type, data.is_required, data.is_visible):
            raise ObjectDoesNotExist()

        self._default_repo.delete_all(field_id)
        self._default_repo.create(field_id, data.default_values)

    def get_field_outs(self, fields: Iterable[Field]) -> List[FieldSchema]:
        return [self.get_field_out(field) for field in fields]

    def get_field_out(self, field: Field) -> FieldSchema:
        return FieldSchema(
            **model_to_dict(field), default_values=list(field.default_values.values_list("value", flat=True))
        )

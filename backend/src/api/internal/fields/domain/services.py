from enum import IntEnum, auto
from typing import Iterable, List, Optional

from django.db.transaction import atomic
from django.forms import model_to_dict

from api.internal.db.models import Field
from api.internal.db.repositories import default_repo, field_repo, form_value_repo
from api.internal.db.repositories.default import IDefaultRepository
from api.internal.db.repositories.field import IFieldRepository
from api.internal.db.repositories.form_value import IFormValueRepository
from api.internal.fields.domain.entities import FieldSchema, FieldUpdatingIn, Filters


class FieldService:
    def __init__(
        self, field_repo: IFieldRepository, default_repo: IDefaultRepository, form_value_repo: IFormValueRepository
    ):
        self._field_repo = field_repo
        self._default_repo = default_repo
        self._form_value_repo = form_value_repo

    def get(self, field_id) -> Optional[Field]:
        return self._field_repo.try_get(field_id)

    def get_filtered(self, filters: Filters) -> List[Field]:
        return list(self._field_repo.get_filtered_by_id_and_name(filters.search))

    def exists(self, field_id: str) -> bool:
        return self._field_repo.exists(field_id)

    def exist_all(self, ids: List[str]) -> bool:
        return self._field_repo.exist_all(set(ids))

    def exists_value(self, field_id: str) -> bool:
        return self._form_value_repo.exists_field_value(field_id)

    @atomic
    def create(self, data: FieldSchema) -> None:
        field = self._field_repo.create(data.id, data.name, data.type, data.is_required, data.is_visible)
        self._default_repo.create(field.id, data.default_values)

    @atomic
    def update(self, field: Field, data: FieldUpdatingIn) -> None:
        self._field_repo.update(field.id, data.name, data.type, data.is_required, data.is_visible)

        self._default_repo.delete_all(field.id)
        self._default_repo.create(field.id, data.default_values)

    def delete(self, field_id: str) -> bool:
        return self._field_repo.delete(field_id)

    def get_field_outs(self, fields: Iterable[Field]) -> List[FieldSchema]:
        return [self.get_field_out(field) for field in fields]

    def get_field_out(self, field: Field) -> FieldSchema:
        return FieldSchema(
            **model_to_dict(field), default_values=list(field.default_values.values_list("value", flat=True))
        )


field_service = FieldService(field_repo, default_repo, form_value_repo)

from typing import List, Optional

from django.db.transaction import atomic
from django.forms import model_to_dict

from api.internal.db.models import Field
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.default import IDefaultRepository
from api.internal.db.repositories.field import IFieldRepository
from api.internal.db.repositories.form_value import IFormValueRepository
from api.internal.fields.domain.entities import FieldSchema, FieldsFilters, FieldUpdatingIn


class FieldsService:
    def __init__(
        self,
        field_repo: IFieldRepository,
        default_repo: IDefaultRepository,
        form_value_repo: IFormValueRepository,
        competition_repo: ICompetitionRepository,
    ):
        self._field_repo = field_repo
        self._default_repo = default_repo
        self._form_value_repo = form_value_repo
        self._competition_repo = competition_repo

    def get_field(self, field_id) -> Optional[Field]:
        return self._field_repo.try_get(field_id)

    def get_fields_by_filters(self, filters: FieldsFilters) -> List[Field]:
        return list(self._field_repo.get_filtered_by_id_and_name(filters.search))

    def exists_field(self, field_id: str) -> bool:
        return self._field_repo.exists(field_id)

    def exist_all(self, ids: List[str]) -> bool:
        return self._field_repo.exist_all(set(ids))

    def exists_field_value(self, field_id: str) -> bool:
        return self._form_value_repo.exists_field_value(field_id)

    @atomic
    def create_field(self, data: FieldSchema) -> None:
        field = self._field_repo.create(data.id, data.name, data.type, data.is_required, data.is_visible)
        self._default_repo.create(field.id, data.default_values)

    @atomic
    def update_field(self, field: Field, data: FieldUpdatingIn) -> None:
        self._field_repo.update(field.id, data.name, data.type, data.is_required, data.is_visible)

        self._default_repo.delete_all(field.id)
        self._default_repo.create(field.id, data.default_values)

    def delete_field(self, field_id: str) -> bool:
        return self._field_repo.delete(field_id)

    def get_field_out(self, field: Field) -> FieldSchema:
        return FieldSchema(
            **model_to_dict(field), default_values=list(field.default_values.values_list("value", flat=True))
        )

    def uses_field_in_some_form(self, field_id: str) -> bool:
        return self._competition_repo.exists_field_in_form(field_id)

from typing import List

from django.forms import model_to_dict
from django.http import HttpRequest
from ninja import Query

from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.entities import FieldFilters, FieldIn, FieldSchema
from api.internal.fields.domain.services import FieldService
from api.internal.responses import SuccessResponse


class FieldHandlers:
    FIELD_ID_ALREADY_EXISTS_ERROR = "Field id already exists"
    FIELD_IS_ATTACHED_WITH_ANY_FORMS_ERROR = "Field is attached to the form"

    def __init__(self, field_service: FieldService):
        self._field_service = field_service

    def get_fields(self, request: HttpRequest, filters: FieldFilters = Query(...)) -> List[FieldSchema]:
        fields = self._field_service.get_filtered(filters)

        return [
            FieldSchema(
                **model_to_dict(field), default_values=list(field.default_values.values_list("value", flat=True))
            )
            for field in fields
        ]

    def get_field(self, request: HttpRequest, field_id: str) -> FieldSchema:
        if not (field := self._field_service.get(field_id)):
            raise NotFoundException("field")

        return FieldSchema(
            **model_to_dict(field), default_values=list(field.default_values.values_list("value", flat=True))
        )

    def create_field(self, request: HttpRequest, data: FieldSchema) -> SuccessResponse:
        if self._field_service.exists(data.id):
            raise UnprocessableEntityException(self.FIELD_ID_ALREADY_EXISTS_ERROR)

        self._field_service.create(data)

        return SuccessResponse()

    def update_field(self, request: HttpRequest, field_id: str, data: FieldIn) -> SuccessResponse:
        if not self._field_service.exists(field_id):
            raise NotFoundException("field")

        self._field_service.update(field_id, data)

        return SuccessResponse()

    def delete_field(self, request: HttpRequest, field_id: str) -> SuccessResponse:
        if not self._field_service.exists(field_id):
            raise NotFoundException("field")

        if not self._field_service.try_delete(field_id):
            raise UnprocessableEntityException(self.FIELD_IS_ATTACHED_WITH_ANY_FORMS_ERROR)

        return SuccessResponse()

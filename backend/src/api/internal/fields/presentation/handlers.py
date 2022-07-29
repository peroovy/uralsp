from typing import List

from django.http import HttpRequest
from ninja import Query

from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.entities import FieldFilters, FieldSchema, FieldUpdatingIn
from api.internal.fields.domain.services import FieldService
from api.internal.responses import SuccessResponse


class FieldHandlers:
    FIELD_ID_ALREADY_EXISTS_ERROR = "Field id already exists"
    FIELD_IS_ATTACHED_WITH_ANY_FORMS_ERROR = "Field is attached to the form"

    FIELD = "field"
    BAD_FIELD_ID = "bad field id"

    def __init__(self, field_service: FieldService):
        self._field_service = field_service

    def get_fields(self, request: HttpRequest, filters: FieldFilters = Query(...)) -> List[FieldSchema]:
        fields = self._field_service.get_filtered(filters)

        return self._field_service.get_field_outs(fields)

    def get_field(self, request: HttpRequest, field_id: str) -> FieldSchema:
        if not (field := self._field_service.get(field_id)):
            raise NotFoundException(self.FIELD)

        return self._field_service.get_field_out(field)

    def create_field(self, request: HttpRequest, field: FieldSchema) -> SuccessResponse:
        if self._field_service.exists(field.id):
            raise UnprocessableEntityException(self.FIELD_ID_ALREADY_EXISTS_ERROR, error=self.BAD_FIELD_ID)

        self._field_service.create(field)

        return SuccessResponse()

    def update_field(self, request: HttpRequest, field_id: str, field: FieldUpdatingIn) -> SuccessResponse:
        if not self._field_service.exists(field_id):
            raise NotFoundException(self.FIELD)

        self._field_service.update(field_id, field)

        return SuccessResponse()

    def delete_field(self, request: HttpRequest, field_id: str) -> SuccessResponse:
        if not self._field_service.exists(field_id):
            raise NotFoundException(self.FIELD)

        if not self._field_service.try_delete(field_id):
            raise UnprocessableEntityException(self.FIELD_IS_ATTACHED_WITH_ANY_FORMS_ERROR, error=self.BAD_FIELD_ID)

        return SuccessResponse()

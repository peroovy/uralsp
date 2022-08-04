from typing import List

from django.http import HttpRequest
from ninja import Body, Query

from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.entities import FieldSchema, FieldUpdatingIn, Filters
from api.internal.fields.domain.services import FieldService
from api.internal.responses import SuccessResponse


class FieldHandlers:
    FIELD_ALREADY_EXISTS = "Field already exists"
    FORM_VALUE_EXISTS = "Field value exists"

    FIELD = "field"
    FORM_VALUE = "form value"
    BAD_FIELD_ID = "bad field id"

    def __init__(self, field_service: FieldService):
        self._field_service = field_service

    def get_fields(self, request: HttpRequest, filters: Filters = Query(...)) -> List[FieldSchema]:
        fields = self._field_service.get_filtered(filters)

        return self._field_service.get_field_outs(fields)

    def get_field(self, request: HttpRequest, field_id: str) -> FieldSchema:
        if not (field := self._field_service.get(field_id)):
            raise NotFoundException(self.FIELD)

        return self._field_service.get_field_out(field)

    def create_field(self, request: HttpRequest, data: FieldSchema = Body(...)) -> SuccessResponse:
        if self._field_service.exists(data.id):
            raise UnprocessableEntityException(self.FIELD_ALREADY_EXISTS, error=self.BAD_FIELD_ID)

        self._field_service.create(data)

        return SuccessResponse()

    def update_field(self, request: HttpRequest, field_id: str, data: FieldUpdatingIn = Body(...)) -> SuccessResponse:
        if not (field := self._field_service.get(field_id)):
            raise NotFoundException(self.FIELD)

        self._field_service.update(field, data)

        return SuccessResponse()

    def delete_field(self, request: HttpRequest, field_id: str) -> SuccessResponse:
        if self._field_service.exists_value(field_id):
            raise UnprocessableEntityException(self.FORM_VALUE_EXISTS, error=self.FORM_VALUE)

        if not self._field_service.delete(field_id):
            raise NotFoundException(self.FIELD)

        return SuccessResponse()

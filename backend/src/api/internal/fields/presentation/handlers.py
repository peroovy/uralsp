from typing import List
from uuid import UUID

from django.http import HttpRequest
from ninja import Body, Query

from api.internal.base import HandlersMetaclass
from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.entities import FieldSchema, FieldUpdatingIn, Filters
from api.internal.fields.domain.services import FieldService
from api.internal.responses import SuccessResponse


class FieldHandlers(metaclass=HandlersMetaclass):
    FIELD_ALREADY_EXISTS = "Field id already exists"
    FORM_VALUE_EXISTS = "Form value exists"
    FIELD_IS_USED_IN_SOME_FORM = "The field is used in some form"

    FIELD = "field"
    VALUE = "value"
    UNIQUE_ID = "unique id"
    FORM = "form"

    def __init__(self, field_service: FieldService):
        self._field_service = field_service

    def get_fields(self, request: HttpRequest, _operation_id: UUID, filters: Filters = Query(...)) -> List[FieldSchema]:
        fields = self._field_service.get_filtered(filters)

        return self._field_service.get_field_outs(fields)

    def get_field(self, request: HttpRequest, _operation_id: UUID, field_id: str) -> FieldSchema:
        if not (field := self._field_service.get(field_id)):
            raise NotFoundException(self.FIELD)

        return self._field_service.get_field_out(field)

    def create_field(self, request: HttpRequest, _operation_id: UUID, data: FieldSchema = Body(...)) -> SuccessResponse:
        """
        422 error codes:\n
            "unique id" - id must be unique
        """

        if self._field_service.exists(data.id):
            raise UnprocessableEntityException(self.FIELD_ALREADY_EXISTS, error=self.UNIQUE_ID)

        self._field_service.create(data)

        return SuccessResponse()

    def update_field(
        self, request: HttpRequest, _operation_id: UUID, field_id: str, data: FieldUpdatingIn = Body(...)
    ) -> SuccessResponse:
        if not (field := self._field_service.get(field_id)):
            raise NotFoundException(self.FIELD)

        self._field_service.update(field, data)

        return SuccessResponse()

    def delete_field(self, request: HttpRequest, _operation_id: UUID, field_id: str) -> SuccessResponse:
        """
        422 error codes:\n
            "form" - the field is used in some form
            "value" - form value exists
        """

        if self._field_service.exists_in_form(field_id):
            raise UnprocessableEntityException(self.FIELD_IS_USED_IN_SOME_FORM, error=self.FORM)

        if self._field_service.exists_value(field_id):
            raise UnprocessableEntityException(self.FORM_VALUE_EXISTS, error=self.VALUE)

        if not self._field_service.delete(field_id):
            raise NotFoundException(self.FIELD)

        return SuccessResponse()

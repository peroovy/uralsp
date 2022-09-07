from typing import List
from uuid import UUID

from django.http import HttpRequest
from ninja import Body, Path, Query

from api.internal.base import HandlersMetaclass
from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.entities import FieldSchema, FieldUpdatingIn, Filters
from api.internal.fields.domain.services import FieldsService
from api.internal.responses import SuccessResponse


class FieldsHandlers(metaclass=HandlersMetaclass):
    FIELD_ALREADY_EXISTS = "Field id already exists"
    FORM_VALUE_EXISTS = "Form value exists"
    FIELD_IS_USED_IN_SOME_FORM = "The field is used in some form"

    FIELD = "field"
    VALUE = "value"
    UNIQUE_ID = "unique id"
    FORM = "form"

    def __init__(self, fields_service: FieldsService):
        self._fields_service = fields_service

    def get_fields(self, request: HttpRequest, _operation_id: UUID, filters: Filters = Query(...)) -> List[FieldSchema]:
        return [
            self._fields_service.get_field_out(field) for field in self._fields_service.get_fields_by_filters(filters)
        ]

    def get_field(self, request: HttpRequest, _operation_id: UUID, field_id: str = Path(...)) -> FieldSchema:
        if not (field := self._fields_service.get_field(field_id)):
            raise NotFoundException(self.FIELD)

        return self._fields_service.get_field_out(field)

    def create_field(self, request: HttpRequest, _operation_id: UUID, data: FieldSchema = Body(...)) -> SuccessResponse:
        """
        422 error codes:\n
            "unique id" - id must be unique
        """

        if self._fields_service.exists_field(data.id):
            raise UnprocessableEntityException(self.FIELD_ALREADY_EXISTS, error=self.UNIQUE_ID)

        self._fields_service.create_field(data)

        return SuccessResponse()

    def update_field(
        self, request: HttpRequest, _operation_id: UUID, field_id: str = Path(...), data: FieldUpdatingIn = Body(...)
    ) -> SuccessResponse:
        if not (field := self._fields_service.get_field(field_id)):
            raise NotFoundException(self.FIELD)

        self._fields_service.update_field(field, data)

        return SuccessResponse()

    def delete_field(self, request: HttpRequest, _operation_id: UUID, field_id: str = Path(...)) -> SuccessResponse:
        """
        422 error codes:\n
            "form" - the field is used in some form
            "value" - form value exists
        """

        if self._fields_service.uses_field_in_some_form(field_id):
            raise UnprocessableEntityException(self.FIELD_IS_USED_IN_SOME_FORM, error=self.FORM)

        if self._fields_service.exists_field_value(field_id):
            raise UnprocessableEntityException(self.FORM_VALUE_EXISTS, error=self.VALUE)

        if not self._fields_service.delete_field(field_id):
            raise NotFoundException(self.FIELD)

        return SuccessResponse()

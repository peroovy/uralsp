from typing import List

from django.http import HttpRequest
from ninja import Body, Query

from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.entities import FieldSchema, FieldUpdatingIn, Filters
from api.internal.fields.domain.services import FieldService, OperationStatus
from api.internal.responses import SuccessResponse


class FieldHandlers:
    FIELD_ID_ALREADY_EXISTS_ERROR = "Field id already exists"
    FORM_VALUE_EXISTS_ERROR = "Field value exists"

    FIELD = "field"
    FORM_VALUE = "form value"

    def __init__(self, field_service: FieldService):
        self._field_service = field_service

    def get_fields(self, request: HttpRequest, filters: Filters = Query(...)) -> List[FieldSchema]:
        fields = self._field_service.get_filtered(filters)

        return self._field_service.get_field_outs(fields)

    def get_field(self, request: HttpRequest, field_id: str) -> FieldSchema:
        if not (field := self._field_service.get(field_id)):
            raise NotFoundException(self.FIELD)

        return self._field_service.get_field_out(field)

    def create_field(self, request: HttpRequest, field: FieldSchema = Body(...)) -> SuccessResponse:
        status = self._field_service.create(field)

        if status == OperationStatus.BAD_FIELD_ID:
            raise UnprocessableEntityException(self.FIELD_ID_ALREADY_EXISTS_ERROR, error=self.FORM_VALUE)

        return SuccessResponse()

    def update_field(self, request: HttpRequest, field_id: str, field: FieldUpdatingIn = Body(...)) -> SuccessResponse:
        status = self._field_service.update(field_id, field)

        if status == OperationStatus.BAD_FIELD_ID:
            raise NotFoundException(self.FIELD)

        return SuccessResponse()

    def delete_field(self, request: HttpRequest, field_id: str) -> SuccessResponse:
        status = self._field_service.delete(field_id)

        match status:
            case OperationStatus.BAD_FIELD_ID:
                raise NotFoundException(self.FIELD)

            case OperationStatus.FORM_VALUE_EXISTS_ERROR:
                raise UnprocessableEntityException(self.FORM_VALUE_EXISTS_ERROR, error=self.FORM_VALUE)

        return SuccessResponse()

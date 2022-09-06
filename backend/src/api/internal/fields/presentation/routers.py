from typing import List

from ninja import Router

from api.internal.auth.presentation.authentications import OnlySuperAdmin
from api.internal.fields.domain.entities import FieldSchema
from api.internal.fields.presentation.handlers import FieldsHandlers
from api.internal.responses import ErrorResponse, SuccessResponse

FIELDS_TAG = "fields"


def get_fields_router(handlers: FieldsHandlers) -> Router:
    router = Router(tags=[FIELDS_TAG])

    router.add_api_operation(path="", methods=["GET"], view_func=handlers.get_fields, response={200: List[FieldSchema]})

    router.add_api_operation(
        path="",
        methods=["POST"],
        auth=[OnlySuperAdmin()],
        view_func=handlers.create_field,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 422: ErrorResponse},
    )

    router.add_router("/{str:field_id}", get_field_router(handlers))

    return router


def get_field_router(handlers: FieldsHandlers) -> Router:
    router = Router(tags=[FIELDS_TAG])

    router.add_api_operation(
        path="",
        methods=["GET"],
        view_func=handlers.get_field,
        response={200: FieldSchema, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["PUT"],
        auth=[OnlySuperAdmin()],
        view_func=handlers.update_field,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["DELETE"],
        auth=[OnlySuperAdmin()],
        view_func=handlers.delete_field,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    return router

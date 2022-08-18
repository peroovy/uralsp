from typing import List

from ninja import Router

from api.internal.auth.presentation.authentications import OnlySuperAdmin
from api.internal.fields.domain.entities import FieldSchema
from api.internal.fields.presentation.handlers import FieldHandlers
from api.internal.responses import ErrorResponse, SuccessResponse


def get_fields_router(field_handlers: FieldHandlers) -> Router:
    router = Router(tags=["fields"])

    router.add_api_operation(
        path="", methods=["GET"], view_func=field_handlers.get_fields, response={200: List[FieldSchema]}
    )

    router.add_api_operation(
        path="/{str:field_id}",
        methods=["GET"],
        view_func=field_handlers.get_field,
        response={200: FieldSchema, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["POST"],
        auth=[OnlySuperAdmin()],
        view_func=field_handlers.create_field,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/{str:field_id}",
        methods=["PUT"],
        auth=[OnlySuperAdmin()],
        view_func=field_handlers.update_field,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{str:field_id}",
        methods=["DELETE"],
        auth=[OnlySuperAdmin()],
        view_func=field_handlers.delete_field,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    return router

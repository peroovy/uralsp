from typing import List

from ninja import Router

from api.internal.auth.presentation.authentications import AnyAdmin, AnyUser
from api.internal.requests.domain.entities import RequestDetailsOut, RequestOut
from api.internal.requests.presentation.handlers import RequestHandlers
from api.internal.responses import ErrorResponse, SuccessResponse


def get_request_router(request_handlers: RequestHandlers) -> Router:
    router = Router(tags=["requests"], auth=[AnyUser()])

    router.add_api_operation(
        path="",
        methods=["GET"],
        view_func=request_handlers.get_requests,
        response={200: List[RequestOut], 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["POST"],
        view_func=request_handlers.create_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:request_id}",
        methods=["GET"],
        view_func=request_handlers.get_request,
        response={200: RequestDetailsOut, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:request_id}",
        methods=["PUT"],
        view_func=request_handlers.update_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:request_id}",
        methods=["DELETE"],
        auth=[AnyAdmin()],
        view_func=request_handlers.delete_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:request_id}/cancel",
        methods=["PATCH"],
        view_func=request_handlers.cancel_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:request_id}/process",
        methods=["PATCH"],
        auth=[AnyAdmin()],
        view_func=request_handlers.process_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    return router

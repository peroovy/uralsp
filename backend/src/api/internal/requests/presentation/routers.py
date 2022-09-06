from typing import List

from ninja import Router

from api.internal.auth.presentation.authentications import AnyAdmin, AnyUser, OnlySuperAdmin
from api.internal.requests.domain.entities import RequestDetailsOut, RequestOut
from api.internal.requests.presentation.handlers import RequestsHandlers
from api.internal.responses import ErrorResponse, SuccessResponse

REQUESTS_TAG = "requests"


def get_requests_router(handlers: RequestsHandlers) -> Router:
    router = Router(tags=[REQUESTS_TAG])

    router.add_api_operation(
        path="",
        methods=["GET"],
        auth=[OnlySuperAdmin()],
        view_func=handlers.get_all_requests,
        response={200: List[RequestOut], 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["POST"],
        auth=[AnyUser()],
        view_func=handlers.create_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_router("/{int:request_id}", get_request_router(handlers))

    return router


def get_request_router(handlers: RequestsHandlers) -> Router:
    router = Router(tags=[REQUESTS_TAG])

    router.add_api_operation(
        path="",
        methods=["GET"],
        auth=[OnlySuperAdmin()],
        view_func=handlers.get_request,
        response={200: RequestDetailsOut, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["PUT"],
        auth=[AnyUser()],
        view_func=handlers.update_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["DELETE"],
        auth=[OnlySuperAdmin()],
        view_func=handlers.delete_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/process",
        methods=["PATCH"],
        auth=[AnyAdmin()],
        view_func=handlers.process_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    return router

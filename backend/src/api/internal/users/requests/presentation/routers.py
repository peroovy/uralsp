from typing import List

from ninja import Router

from api.internal.auth.presentation.authentications import AnyUser
from api.internal.responses import ErrorResponse, SuccessResponse
from api.internal.users.requests.domain.entities import CurrentUserRequestOut
from api.internal.users.requests.presentation.handlers import CurrentUserRequestsHandlers

USER_REQUESTS_TAG = "user requests"


def get_user_requests_router(handlers: CurrentUserRequestsHandlers) -> Router:
    router = Router(tags=[USER_REQUESTS_TAG], auth=[AnyUser()])

    router.add_api_operation(
        path="",
        methods=["GET"],
        view_func=handlers.get_requests_from_user,
        response={200: List[CurrentUserRequestOut], 401: ErrorResponse},
    )

    router.add_router("/{int:request_id}", get_user_request_router(handlers))

    return router


def get_user_request_router(handlers: CurrentUserRequestsHandlers) -> Router:
    router = Router(tags=[USER_REQUESTS_TAG], auth=[AnyUser()])

    router.add_api_operation(
        path="/cancel",
        methods=["PATCH"],
        view_func=handlers.cancel_request_from_user,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    return router

from typing import List

from ninja import Router

from api.internal.middlewares import AllowDefaultUser
from api.internal.responses import ErrorResponse, SuccessResponse
from api.internal.user.domain.entities import DefaultProfileOut, RequestDetailsOut, RequestOut, SwitchOut
from api.internal.user.presentation.handlers import UserHandlers


def get_user_router(user_handlers: UserHandlers) -> Router:
    router = Router(tags=["user"], auth=[AllowDefaultUser()])

    router.add_api_operation(
        path="/profile",
        methods=["GET"],
        view_func=user_handlers.get_profile,
        response={200: DefaultProfileOut, 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_api_operation(
        path="/profile",
        methods=["PUT"],
        view_func=user_handlers.update_profile,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_api_operation(
        path="/requests",
        methods=["GET"],
        view_func=user_handlers.get_requests,
        response={200: List[RequestOut], 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_api_operation(
        path="/requests",
        methods=["POST"],
        view_func=user_handlers.create_request,
        response={200: RequestOut, 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_api_operation(
        path="/requests/{int:request_id}",
        methods=["GET"],
        view_func=user_handlers.get_request,
        response={200: RequestDetailsOut, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/requests/{int:request_id}",
        methods=["PUT"],
        view_func=user_handlers.update_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/requests/{int:request_id}/cancel",
        methods=["PATCH"],
        view_func=user_handlers.cancel_request,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    return router

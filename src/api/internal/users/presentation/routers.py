from ninja import Router

from api.internal.middlewares import JWTAuthentication
from api.internal.responses import ErrorResponse, SuccessResponse
from api.internal.users.domain.entities import DefaultProfileOut
from api.internal.users.presentation.handlers import UserHandlers


def get_users_router(user_handlers: UserHandlers) -> Router:
    router = Router(tags=["users"])

    router.add_api_operation(
        path="/current/profile",
        methods=["GET"],
        auth=[JWTAuthentication()],
        view_func=user_handlers.get_profile,
        response={200: DefaultProfileOut, 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_api_operation(
        path="/current/profile",
        methods=["PUT"],
        auth=[JWTAuthentication()],
        view_func=user_handlers.update_profile,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse},
    )

    return router

from typing import List

from ninja import Router

from api.internal.middlewares import JWTAuthentication, OnlyAdmin
from api.internal.responses import ErrorResponse, SuccessResponse
from api.internal.users.domain.entities import FullProfileOut, ProfileOut
from api.internal.users.presentation.handlers import CurrentUserHandlers, UsersHandlers


def get_users_router(users_handlers: UsersHandlers) -> Router:
    router = Router(tags=["users"])

    router.add_api_operation(
        path="", methods=["GET"], view_func=users_handlers.get_users, response={200: List[ProfileOut]}
    )

    router.add_api_operation(path="/xlsx", methods=["GET"], auth=[OnlyAdmin()], view_func=users_handlers.get_users_xlsx)
    router.add_api_operation(path="/csv", methods=["GET"], auth=[OnlyAdmin()], view_func=users_handlers.get_users_csv)

    return router


def get_current_user_router(current_user_handlers: CurrentUserHandlers) -> Router:
    router = Router(tags=["auth_user"])

    router.add_api_operation(
        path="/profile",
        methods=["GET"],
        auth=[JWTAuthentication()],
        view_func=current_user_handlers.get_profile,
        response={200: FullProfileOut, 401: ErrorResponse, 403: ErrorResponse},
    )

    router.add_api_operation(
        path="/profile",
        methods=["PUT"],
        auth=[JWTAuthentication()],
        view_func=current_user_handlers.update_profile,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse},
    )

    return router

from typing import List

from ninja import Router

from api.internal.auth.presentation.authentications import AnyAdmin, AnyUser
from api.internal.responses import ErrorResponse, SuccessResponse
from api.internal.users.domain.entities import FormValueOut, FullProfileOut, ProfileOut
from api.internal.users.presentation.handlers import CurrentUserHandlers, UsersHandlers
from api.internal.users.requests.presentation.routers import get_user_requests_router

USERS_TAG = "users"
CURRENT_USER_TAG = "current user"


def get_users_router(handlers: UsersHandlers) -> Router:
    router = Router(tags=[USERS_TAG])

    router.add_api_operation(
        path="", methods=["GET"], view_func=handlers.get_users, response={200: List[ProfileOut], 422: dict}
    )

    router.add_api_operation(path="/xlsx", methods=["GET"], auth=[AnyAdmin()], view_func=handlers.get_users_in_xlsx)
    router.add_api_operation(path="/csv", methods=["GET"], auth=[AnyAdmin()], view_func=handlers.get_users_in_csv)

    router.add_api_operation(
        path="/merge",
        methods=["POST"],
        auth=[AnyAdmin()],
        view_func=handlers.merge_users,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 422: ErrorResponse},
    )

    router.add_router("/{int:user_id}", get_user_router(handlers))

    return router


def get_user_router(handlers: UsersHandlers) -> Router:
    router = Router(tags=[USERS_TAG])

    router.add_api_operation(
        path="",
        methods=["GET"],
        auth=[AnyAdmin()],
        view_func=handlers.get_user,
        response={200: FullProfileOut, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["PUT"],
        auth=[AnyAdmin()],
        view_func=handlers.update_user,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    return router


def get_current_user_router(handlers: CurrentUserHandlers) -> Router:
    router = Router(tags=["current user"], auth=[AnyUser()])

    router.add_api_operation(
        path="/profile",
        methods=["GET"],
        view_func=handlers.get_profile,
        response={200: FullProfileOut, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/profile",
        methods=["PUT"],
        view_func=handlers.update_profile,
        response={200: SuccessResponse, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/form-values",
        methods=["GET"],
        view_func=handlers.get_form_values,
        response={200: List[FormValueOut], 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/link-vkontakte",
        methods=["PATCH"],
        view_func=handlers.link_vkontakte,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/link-google",
        methods=["PATCH"],
        view_func=handlers.link_google,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/link-telegram",
        methods=["PATCH"],
        view_func=handlers.link_telegram,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/unlink-vkontakte",
        methods=["PATCH"],
        view_func=handlers.unlink_vkontakte,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/unlink-google",
        methods=["PATCH"],
        view_func=handlers.unlink_google,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/unlink-telegram",
        methods=["PATCH"],
        view_func=handlers.unlink_telegram,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    router.add_router("/requests", get_user_requests_router(handlers.requests))

    return router

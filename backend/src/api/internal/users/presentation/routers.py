from typing import List

from ninja import Router

from api.internal.middlewares import AnyAdmin, AnyUser
from api.internal.responses import ErrorResponse, SuccessResponse
from api.internal.users.domain.entities import FormValueOut, FullProfileOut, ProfileOut
from api.internal.users.presentation.handlers import CurrentUserHandlers, UserHandlers


def get_users_router(users_handlers: UserHandlers) -> Router:
    router = Router(tags=["users"])

    router.add_api_operation(
        path="", methods=["GET"], view_func=users_handlers.get_users, response={200: List[ProfileOut]}
    )

    router.add_api_operation(
        path="/{int:user_id}",
        methods=["GET"],
        auth=[AnyAdmin()],
        view_func=users_handlers.get_user,
        response={200: FullProfileOut, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:user_id}",
        methods=["PUT"],
        auth=[AnyAdmin()],
        view_func=users_handlers.update_user,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(path="/xlsx", methods=["GET"], auth=[AnyAdmin()], view_func=users_handlers.get_users_xlsx)
    router.add_api_operation(path="/csv", methods=["GET"], auth=[AnyAdmin()], view_func=users_handlers.get_users_csv)

    router.add_api_operation(
        path="/merge",
        methods=["POST"],
        auth=[AnyAdmin()],
        view_func=users_handlers.merge_users,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 422: ErrorResponse},
    )

    return router


def get_current_user_router(current_user_handlers: CurrentUserHandlers) -> Router:
    router = Router(tags=["auth_user"], auth=[AnyUser()])

    router.add_api_operation(
        path="/profile",
        methods=["GET"],
        view_func=current_user_handlers.get_profile,
        response={200: FullProfileOut, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/profile",
        methods=["PUT"],
        view_func=current_user_handlers.update_profile,
        response={200: SuccessResponse, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/form-values",
        methods=["GET"],
        view_func=current_user_handlers.get_form_values,
        response={200: List[FormValueOut], 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/link-vkontakte",
        methods=["PATCH"],
        view_func=current_user_handlers.link_vkontakte,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/link-google",
        methods=["PATCH"],
        view_func=current_user_handlers.link_google,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/unlink-vkontakte",
        methods=["PATCH"],
        view_func=current_user_handlers.unlink_vkontakte,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/unlink-google",
        methods=["PATCH"],
        view_func=current_user_handlers.unlink_google,
        response={200: SuccessResponse, 401: ErrorResponse, 422: ErrorResponse},
    )

    return router

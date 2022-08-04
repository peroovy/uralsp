from ninja import Router

from api.internal.auth.domain.entities import TokenDetailsOut
from api.internal.auth.presentation.handlers import AuthHandlers
from api.internal.responses import ErrorResponse


def get_auth_router(auth_handlers: AuthHandlers) -> Router:
    router = Router(tags=["auth"])

    router.add_api_operation(
        path="/signin-vkontakte",
        methods=["POST"],
        view_func=auth_handlers.signin_vkontakte,
        response={200: TokenDetailsOut, 400: ErrorResponse, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/signin-google",
        methods=["POST"],
        view_func=auth_handlers.signin_google,
        response={200: TokenDetailsOut, 400: ErrorResponse, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/signin-telegram",
        methods=["POST"],
        view_func=auth_handlers.signin_telegram,
        response={200: TokenDetailsOut, 400: ErrorResponse, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/refresh",
        methods=["POST"],
        view_func=auth_handlers.refresh,
        response={200: TokenDetailsOut, 400: ErrorResponse, 422: ErrorResponse},
    )

    return router

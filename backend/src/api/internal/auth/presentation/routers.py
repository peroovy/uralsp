from ninja import Router

from api.internal.auth.domain.entities import TokenDetailsOut
from api.internal.auth.presentation.handlers import AuthHandlers
from api.internal.responses import ErrorResponse

AUTH_TAG = "auth"


def get_auth_router(handlers: AuthHandlers) -> Router:
    router = Router(tags=[AUTH_TAG])

    router.add_api_operation(
        path="/signin-vkontakte",
        methods=["POST"],
        view_func=handlers.signin_vkontakte,
        response={200: TokenDetailsOut, 400: ErrorResponse, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/signin-google",
        methods=["POST"],
        view_func=handlers.signin_google,
        response={200: TokenDetailsOut, 400: ErrorResponse, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/signin-telegram",
        methods=["POST"],
        view_func=handlers.signin_telegram,
        response={200: TokenDetailsOut, 400: ErrorResponse, 401: ErrorResponse},
    )

    router.add_api_operation(
        path="/refresh",
        methods=["POST"],
        view_func=handlers.refresh,
        response={200: TokenDetailsOut, 400: ErrorResponse, 422: ErrorResponse},
    )

    return router

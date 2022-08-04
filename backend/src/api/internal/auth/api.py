from ninja import NinjaAPI

from api.internal.auth.domain.services import jwt_service
from api.internal.auth.presentation.handlers import AuthHandlers
from api.internal.auth.presentation.routers import get_auth_router


def register_auth_api(api: NinjaAPI) -> None:
    auth_handlers = AuthHandlers(jwt_service)

    api.add_router("/auth", get_auth_router(auth_handlers))

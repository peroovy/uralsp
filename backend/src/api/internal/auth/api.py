from ninja import NinjaAPI

from api.internal.auth.domain.services import JWTService
from api.internal.auth.presentation.handlers import AuthHandlers
from api.internal.auth.presentation.routers import get_auth_router
from api.internal.db.repositories import refresh_repo, user_repo


def register_auth_api(api: NinjaAPI) -> None:
    service = JWTService(user_repo, refresh_repo)

    auth_handlers = AuthHandlers(service)

    api.add_router("/auth", get_auth_router(auth_handlers))

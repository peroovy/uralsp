from ninja import NinjaAPI

from api.internal.auth.domain.services import AuthService
from api.internal.auth.presentation.handlers import AuthHandlers
from api.internal.auth.presentation.routers import get_auth_router
from api.internal.db.repositories import refresh_repo, user_repo


def register_auth_api(api: NinjaAPI) -> None:
    auth_service = AuthService(user_repo, refresh_repo)

    auth_handlers = AuthHandlers(auth_service)

    api.add_router("/auth", get_auth_router(auth_handlers))

from ninja import NinjaAPI

from api.internal.auth.domain.services import AuthService, SocialService
from api.internal.auth.presentation.handlers import AuthHandlers
from api.internal.auth.presentation.routers import get_auth_router
from api.internal.db.repositories import google_repo, refresh_repo, user_repo, vkontakte_repo


def register_auth_api(api: NinjaAPI) -> None:
    auth_service = AuthService(user_repo, refresh_repo)
    social_service = SocialService(vkontakte_repo, google_repo)

    auth_handlers = AuthHandlers(auth_service, social_service)

    api.add_router("/auth", get_auth_router(auth_handlers))

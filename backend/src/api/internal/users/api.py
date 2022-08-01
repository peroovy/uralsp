from ninja import NinjaAPI

from api.internal.auth.domain.services import SocialService
from api.internal.db.repositories import (
    form_value_repo,
    google_repo,
    participation_repo,
    request_repo,
    user_repo,
    vkontakte_repo,
)
from api.internal.users.domain.services import DocumentService, UserService
from api.internal.users.presentation.handlers import CurrentUserHandlers, UserHandlers
from api.internal.users.presentation.routers import get_current_user_router, get_users_router


def register_users_api(api: NinjaAPI) -> None:
    user_service = UserService(user_repo, form_value_repo, request_repo, participation_repo)
    document_service = DocumentService()
    social_service = SocialService(vkontakte_repo, google_repo)

    users_handlers = UserHandlers(user_service, document_service)
    current_user_handlers = CurrentUserHandlers(user_service, social_service)

    api.add_router("/users", get_users_router(users_handlers))
    api.add_router("/users/current", get_current_user_router(current_user_handlers))

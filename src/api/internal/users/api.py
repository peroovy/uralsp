from ninja import NinjaAPI

from api.internal.db.repositories import user_repo
from api.internal.users.domain.services import DocumentService, UserService
from api.internal.users.presentation.handlers import CurrentUserHandlers, UsersHandlers
from api.internal.users.presentation.routers import get_current_user_router, get_users_router


def register_users_api(api: NinjaAPI) -> None:
    user_service = UserService(user_repo)
    document_service = DocumentService()

    users_handlers = UsersHandlers(user_service, document_service)
    current_user_handlers = CurrentUserHandlers(user_service)

    api.add_router("/users", get_users_router(users_handlers))
    api.add_router("/users/current", get_current_user_router(current_user_handlers))

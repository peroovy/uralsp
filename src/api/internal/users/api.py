from ninja import NinjaAPI

from api.internal.db.repositories import user_repo
from api.internal.users.domain.services import UserService
from api.internal.users.presentation.handlers import UserHandlers
from api.internal.users.presentation.routers import get_users_router


def register_users_api(api: NinjaAPI) -> None:
    user_service = UserService(user_repo)

    user_handlers = UserHandlers(user_service)

    api.add_router("/users", get_users_router(user_handlers))

from ninja import NinjaAPI

from api.internal.users.domain.services import merging_service, user_serializer, user_service
from api.internal.users.presentation.handlers import CurrentUserHandlers, UserHandlers
from api.internal.users.presentation.routers import get_current_user_router, get_users_router


def register_users_api(api: NinjaAPI) -> None:
    users_handlers = UserHandlers(user_service, merging_service, user_serializer)
    current_user_handlers = CurrentUserHandlers(user_service)

    api.add_router("/users", get_users_router(users_handlers))
    api.add_router("/users/current", get_current_user_router(current_user_handlers))

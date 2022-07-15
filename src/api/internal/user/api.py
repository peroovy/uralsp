from ninja import NinjaAPI

from api.internal.db.repositories import competition_repo, form_value_repo, participation_repo, request_repo, user_repo
from api.internal.user.domain.services import RequestService, UserService
from api.internal.user.presentation.handlers import UserHandlers
from api.internal.user.presentation.routers import get_user_router


def register_user_api(api: NinjaAPI) -> None:
    user_service = UserService(user_repo)
    request_service = RequestService(request_repo, competition_repo, user_repo, participation_repo, form_value_repo)

    user_handlers = UserHandlers(user_service, request_service)

    api.add_router("/user", get_user_router(user_handlers))

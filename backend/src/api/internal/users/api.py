from ninja import NinjaAPI

from api.internal.competitions.domain.services import CompetitionsService
from api.internal.db.repositories import (
    competition_repo,
    field_repo,
    form_value_repo,
    participation_repo,
    request_repo,
    user_repo,
)
from api.internal.requests.domain.services import RequestCompetitionService
from api.internal.users.domain.services import MergingService, UserSerializer, UserService
from api.internal.users.presentation.handlers import CurrentUserHandlers, UsersHandlers
from api.internal.users.presentation.routers import get_current_user_router, get_users_router
from api.internal.users.requests.domain.services import CurrentUserRequestsService
from api.internal.users.requests.presentation.handlers import CurrentUserRequestsHandlers


def register_users_api(api: NinjaAPI) -> None:
    user_service = UserService(user_repo, form_value_repo, competition_repo)

    users_handlers = UsersHandlers(
        user_service=user_service,
        merging_service=MergingService(user_repo, request_repo, participation_repo),
        user_serializer=UserSerializer(),
    )

    current_requests_handlers = CurrentUserRequestsHandlers(
        requests_service=CurrentUserRequestsService(
            request_repo, competition_repo, user_repo, participation_repo, form_value_repo
        ),
        competition_service=RequestCompetitionService(competition_repo, user_repo, field_repo),
    )

    current_user_handlers = CurrentUserHandlers(user_service=user_service, requests_handlers=current_requests_handlers)

    api.add_router("/users", get_users_router(users_handlers))
    api.add_router("/users/current", get_current_user_router(current_user_handlers))

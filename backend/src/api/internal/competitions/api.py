from ninja import NinjaAPI

from api.internal.competitions.domain.services import CompetitionService
from api.internal.competitions.presentation.handlers import CompetitionHandlers
from api.internal.competitions.presentation.routers import get_competitions_router
from api.internal.db.repositories import (
    competition_repo,
    default_repo,
    field_repo,
    form_value_repo,
    participation_repo,
    request_repo,
    user_repo,
)
from api.internal.fields.domain.services import FieldService
from api.internal.requests.domain.services import RequestService
from api.internal.users.domain.services import UserService


def register_competitions_api(api: NinjaAPI) -> None:
    competition_service = CompetitionService(competition_repo, user_repo, field_repo)
    request_service = RequestService(request_repo, competition_repo, user_repo, participation_repo, form_value_repo)
    field_service = FieldService(field_repo, default_repo, form_value_repo)
    user_service = UserService(user_repo, form_value_repo, request_repo, participation_repo)

    competition_handlers = CompetitionHandlers(competition_service, request_service, field_service, user_service)

    api.add_router("/competitions", get_competitions_router(competition_handlers))

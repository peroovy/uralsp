from ninja import NinjaAPI

from api.internal.competitions.domain.services import CompetitionService
from api.internal.competitions.presentation.handlers import CompetitionHandlers
from api.internal.competitions.presentation.routers import get_competitions_router
from api.internal.db.repositories import competition_repo, field_repo, request_repo, user_repo


def register_competitions_api(api: NinjaAPI) -> None:
    competition_service = CompetitionService(competition_repo, field_repo, user_repo, request_repo)

    competition_handlers = CompetitionHandlers(competition_service)

    api.add_router("/competitions", get_competitions_router(competition_handlers))

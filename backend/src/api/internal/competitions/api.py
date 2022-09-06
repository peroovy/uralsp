from ninja import NinjaAPI

from api.internal.competitions.domain.services import CompetitionsService
from api.internal.competitions.presentation.handlers import CompetitionsHandlers
from api.internal.competitions.presentation.routers import get_competitions_router
from api.internal.competitions.requests.domain.services import CompetitionRequestsSerializer, CompetitionRequestsService
from api.internal.competitions.requests.presentation.handlers import CompetitionRequestsHandlers
from api.internal.db.repositories import competition_repo, field_repo, user_repo


def register_competitions_api(api: NinjaAPI) -> None:
    competition_requests_handlers = CompetitionRequestsHandlers(
        competition_service=CompetitionRequestsService(competition_repo, user_repo, field_repo),
        requests_serializer=CompetitionRequestsSerializer(),
    )

    competition_handlers = CompetitionsHandlers(
        competitions_service=CompetitionsService(competition_repo, user_repo, field_repo),
        requests_handlers=competition_requests_handlers,
    )

    api.add_router("/competitions", get_competitions_router(competition_handlers))

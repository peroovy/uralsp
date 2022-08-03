from ninja import NinjaAPI

from api.internal.competitions.domain.services import competition_service
from api.internal.competitions.presentation.handlers import CompetitionHandlers
from api.internal.competitions.presentation.routers import get_competitions_router
from api.internal.fields.domain.services import field_service
from api.internal.requests.domain.services import request_service
from api.internal.users.domain.services import user_service


def register_competitions_api(api: NinjaAPI) -> None:
    competition_handlers = CompetitionHandlers(competition_service, request_service, field_service, user_service)

    api.add_router("/competitions", get_competitions_router(competition_handlers))

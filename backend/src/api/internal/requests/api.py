from ninja import NinjaAPI

from api.internal.db.repositories import (
    competition_repo,
    field_repo,
    form_value_repo,
    participation_repo,
    request_repo,
    user_repo,
)
from api.internal.requests.domain.services import RequestCompetitionService, RequestsService
from api.internal.requests.presentation.handlers import RequestsHandlers
from api.internal.requests.presentation.routers import get_requests_router


def register_requests_api(api: NinjaAPI) -> None:
    request_handlers = RequestsHandlers(
        requests_service=RequestsService(
            request_repo, competition_repo, user_repo, participation_repo, form_value_repo
        ),
        competition_service=RequestCompetitionService(competition_repo, user_repo, field_repo),
    )

    api.add_router("/requests", get_requests_router(request_handlers))

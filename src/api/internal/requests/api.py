from ninja import NinjaAPI

from api.internal.db.repositories import competition_repo, form_value_repo, participation_repo, request_repo, user_repo
from api.internal.requests.domain.services import RequestService
from api.internal.requests.presentation.handlers import RequestHandlers
from api.internal.requests.presentation.routers import get_request_router


def register_requests_api(api: NinjaAPI) -> None:
    request_service = RequestService(request_repo, competition_repo, user_repo, participation_repo, form_value_repo)

    request_handlers = RequestHandlers(request_service)

    api.add_router("/requests", get_request_router(request_handlers))

from ninja import NinjaAPI

from api.internal.competitions.domain.services import competition_service
from api.internal.requests.domain.services import request_service
from api.internal.requests.presentation.handlers import RequestHandlers
from api.internal.requests.presentation.routers import get_request_router


def register_requests_api(api: NinjaAPI) -> None:
    request_handlers = RequestHandlers(request_service, competition_service)

    api.add_router("/requests", get_request_router(request_handlers))

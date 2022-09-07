from typing import List

from ninja import Router

from api.internal.auth.presentation.authentications import AnyAdmin
from api.internal.competitions.requests.domain.entities import CompetitionRequestOut
from api.internal.competitions.requests.presentation.handlers import CompetitionRequestsHandlers
from api.internal.responses import ErrorResponse

COMPETITION_REQUESTS = "competition requests"


def get_competition_requests_router(handlers: CompetitionRequestsHandlers) -> Router:
    router = Router(tags=[COMPETITION_REQUESTS], auth=[AnyAdmin()])

    router.add_api_operation(
        path="",
        methods=["GET"],
        view_func=handlers.get_requests_for_competition,
        response={200: List[CompetitionRequestOut], 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/xlsx",
        methods=["GET"],
        view_func=handlers.get_requests_for_competition_in_xlsx,
    )

    router.add_api_operation(
        path="/csv",
        methods=["GET"],
        view_func=handlers.get_requests_for_competition_in_csv,
    )

    return router

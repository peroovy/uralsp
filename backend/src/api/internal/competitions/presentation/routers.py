from typing import List

from ninja import Router

from api.internal.auth.presentation.authentications import AnyAdmin, OnlySuperAdmin
from api.internal.competitions.domain.entities import CompetitionDetailsOut, CompetitionOut, FieldDetailsOut
from api.internal.competitions.presentation.handlers import CompetitionsHandlers
from api.internal.competitions.requests.presentation.routers import get_competition_requests_router
from api.internal.responses import ErrorResponse, SuccessResponse

COMPETITIONS_TAG = "competitions"


def get_competitions_router(handlers: CompetitionsHandlers) -> Router:
    router = Router(tags=[COMPETITIONS_TAG])

    router.add_api_operation(
        path="",
        methods=["GET"],
        view_func=handlers.get_competitions,
        response={200: List[CompetitionOut], 401: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["POST"],
        auth=[OnlySuperAdmin()],
        view_func=handlers.create_competition,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 422: ErrorResponse},
    )

    router.add_router("/{int:competition_id}", get_competition_router(handlers))

    return router


def get_competition_router(handlers: CompetitionsHandlers) -> Router:
    router = Router(tags=[COMPETITIONS_TAG])

    router.add_api_operation(
        path="",
        methods=["GET"],
        view_func=handlers.get_competition,
        response={200: CompetitionDetailsOut, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["PUT"],
        auth=[AnyAdmin()],
        view_func=handlers.update_competition,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["DELETE"],
        auth=[OnlySuperAdmin()],
        view_func=handlers.delete_competition,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/request-template",
        methods=["PATCH"],
        auth=[AnyAdmin()],
        view_func=handlers.update_request_template,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/admins",
        methods=["PUT"],
        auth=[OnlySuperAdmin()],
        view_func=handlers.update_admins,
        response={200: SuccessResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/form",
        methods=["GET"],
        view_func=handlers.get_form,
        response={200: List[FieldDetailsOut], 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/form",
        methods=["PUT"],
        auth=[AnyAdmin()],
        view_func=handlers.update_form,
        response={200: SuccessResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    router.add_router("/requests", get_competition_requests_router(handlers.requests))

    return router

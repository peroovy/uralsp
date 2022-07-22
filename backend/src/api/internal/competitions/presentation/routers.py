from typing import List

from ninja import Router

from api.internal.competitions.domain.entities import (
    CompetitionDetailsOut,
    CompetitionFieldDetailsOut,
    CompetitionOut,
    CompetitionRequestOut,
)
from api.internal.competitions.presentation.handlers import CompetitionHandlers
from api.internal.middlewares import OnlyAdminOrSuperAdmin, OnlySuperAdmin
from api.internal.responses import ErrorResponse, SuccessResponse


def get_competitions_router(competition_handlers: CompetitionHandlers) -> Router:
    router = Router(tags=["competitions"])

    router.add_api_operation(
        path="",
        methods=["GET"],
        view_func=competition_handlers.get_competitions,
        response={200: List[CompetitionOut], 401: ErrorResponse},
    )

    router.add_api_operation(
        path="",
        methods=["POST"],
        auth=[OnlySuperAdmin()],
        view_func=competition_handlers.create_competition,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}",
        methods=["GET"],
        view_func=competition_handlers.get_competition,
        response={200: CompetitionDetailsOut, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}",
        methods=["PUT"],
        auth=[OnlyAdminOrSuperAdmin()],
        view_func=competition_handlers.update_competition,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}",
        methods=["PATCH"],
        auth=[OnlyAdminOrSuperAdmin()],
        view_func=competition_handlers.update_request_template,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}",
        methods=["DELETE"],
        auth=[OnlySuperAdmin()],
        view_func=competition_handlers.delete_competition,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/admins",
        methods=["PUT"],
        auth=[OnlySuperAdmin()],
        view_func=competition_handlers.update_admins,
        response={200: SuccessResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/form",
        methods=["GET"],
        view_func=competition_handlers.get_form,
        response={200: List[CompetitionFieldDetailsOut], 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/form",
        methods=["PUT"],
        auth=[OnlyAdminOrSuperAdmin()],
        view_func=competition_handlers.update_form,
        response={200: SuccessResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/requests",
        methods=["GET"],
        auth=[OnlyAdminOrSuperAdmin()],
        view_func=competition_handlers.get_requests_on_competition,
        response={200: List[CompetitionRequestOut], 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    return router

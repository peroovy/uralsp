from typing import List

from ninja import Router

from api.internal.competitions.domain.entities import CompetitionDetailsOut, CompetitionOut, FieldDetailsOut, RequestOut
from api.internal.competitions.presentation.handlers import CompetitionHandlers
from api.internal.middlewares import AnyAdmin, OnlySuperAdmin
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
        auth=[AnyAdmin()],
        view_func=competition_handlers.update_competition,
        response={200: SuccessResponse, 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/request-template",
        methods=["PATCH"],
        auth=[AnyAdmin()],
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
        response={200: SuccessResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/form",
        methods=["GET"],
        view_func=competition_handlers.get_form,
        response={200: List[FieldDetailsOut], 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/form",
        methods=["PUT"],
        auth=[AnyAdmin()],
        view_func=competition_handlers.update_form,
        response={200: SuccessResponse, 404: ErrorResponse, 422: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/requests",
        methods=["GET"],
        auth=[AnyAdmin()],
        view_func=competition_handlers.get_requests_on_competition,
        response={200: List[RequestOut], 401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/requests/xlsx",
        methods=["GET"],
        auth=[AnyAdmin()],
        view_func=competition_handlers.get_requests_on_competition_in_xlsx,
        response={401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    router.add_api_operation(
        path="/{int:competition_id}/requests/csv",
        methods=["GET"],
        auth=[AnyAdmin()],
        view_func=competition_handlers.get_requests_on_competition_in_csv,
        response={401: ErrorResponse, 403: ErrorResponse, 404: ErrorResponse},
    )

    return router

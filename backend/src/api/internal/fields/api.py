from ninja import NinjaAPI

from api.internal.db.repositories import competition_repo, default_repo, field_repo, form_value_repo
from api.internal.fields.domain.services import FieldsService
from api.internal.fields.presentation.handlers import FieldsHandlers
from api.internal.fields.presentation.routers import get_fields_router


def register_fields_api(api: NinjaAPI) -> None:
    fields_handlers = FieldsHandlers(
        fields_service=FieldsService(field_repo, default_repo, form_value_repo, competition_repo)
    )

    api.add_router("/fields", get_fields_router(fields_handlers))

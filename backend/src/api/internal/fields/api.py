from ninja import NinjaAPI

from api.internal.db.repositories import default_repo, field_repo, form_value_repo
from api.internal.fields.domain.services import FieldService
from api.internal.fields.presentation.handlers import FieldHandlers
from api.internal.fields.presentation.routers import get_fields_router


def register_fields_api(api: NinjaAPI) -> None:
    field_service = FieldService(field_repo, default_repo, form_value_repo)

    fields_handlers = FieldHandlers(field_service)

    api.add_router("/fields", get_fields_router(fields_handlers))

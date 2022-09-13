from typing import Callable, Type

from django.conf import settings
from django.http import HttpRequest, HttpResponse
from ninja import NinjaAPI
from ninja.errors import AuthenticationError

from api.internal.auth.api import register_auth_api
from api.internal.competitions.api import register_competitions_api
from api.internal.exceptions import API_EXCEPTIONS, APIException, UnauthorizedException
from api.internal.fields.api import register_fields_api
from api.internal.requests.api import register_requests_api
from api.internal.users.api import register_users_api

BAD_ACCESS_TOKEN = "bad access token"

DOCS_URL = "/docs"


def get_api() -> NinjaAPI:
    api = NinjaAPI(docs_url=DOCS_URL if settings.DEBUG else None)

    subscribe_exception_handlers(api)

    register_auth_api(api)
    register_users_api(api)
    register_requests_api(api)
    register_fields_api(api)
    register_competitions_api(api)

    return api


def subscribe_exception_handlers(api: NinjaAPI) -> None:
    for exception in API_EXCEPTIONS:
        api.add_exception_handler(exception, get_exception_handler(exception))

    api.add_exception_handler(
        AuthenticationError,
        lambda r, exc: UnauthorizedException.get_response(UnauthorizedException()),
    )


def get_exception_handler(exception: Type[APIException]) -> Callable[[HttpRequest, Exception], HttpResponse]:
    return lambda request, exc: exception.get_response(exc)

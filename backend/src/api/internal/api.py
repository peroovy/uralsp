from typing import Callable, Type

from django.http import HttpRequest, HttpResponse
from ninja import NinjaAPI
from ninja.errors import AuthenticationError

from api.internal.auth.api import register_auth_api
from api.internal.competitions.api import register_competitions_api
from api.internal.exceptions import (
    APIException,
    BadRequestException,
    ExpiredTokenException,
    ForbiddenException,
    InvalidPayloadException,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
)
from api.internal.fields.api import register_fields_api
from api.internal.requests.api import register_requests_api
from api.internal.users.api import register_users_api

BAD_ACCESS_TOKEN = "bad access token"


def get_api() -> NinjaAPI:
    api = NinjaAPI()

    subscribe_exception_handlers(api)

    register_auth_api(api)
    register_users_api(api)
    register_requests_api(api)
    register_fields_api(api)
    register_competitions_api(api)

    return api


def subscribe_exception_handlers(api: NinjaAPI) -> None:
    outer_exceptions = [
        UnauthorizedException,
        UnprocessableEntityException,
        InvalidPayloadException,
        ExpiredTokenException,
        BadRequestException,
        NotFoundException,
        ForbiddenException,
    ]

    for exception in outer_exceptions:
        api.add_exception_handler(exception, get_exception_handler(exception))

    api.add_exception_handler(
        AuthenticationError,
        lambda r, exc: UnauthorizedException.get_response(UnauthorizedException(error=BAD_ACCESS_TOKEN)),
    )


def get_exception_handler(exception: Type[APIException]) -> Callable[[HttpRequest, Exception], HttpResponse]:
    return lambda request, exc: exception.get_response(exc)

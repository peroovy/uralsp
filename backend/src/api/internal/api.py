from typing import Callable, Type

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
from django.http import HttpRequest, HttpResponse
from ninja import NinjaAPI
from ninja.responses import Response

from api.internal.auth.api import register_auth_api
from api.internal.exceptions import (
    APIException,
    BadRequestException,
    ExpiredTokenException,
    ForbiddenException,
    InvalidPayloadException,
    NotFoundException,
    NotFoundRefreshTokenException,
    RevokedRefreshTokenException,
    UnauthorizedException,
    UnknownRefreshTokenException,
    UnprocessableEntityException,
)
from api.internal.fields.api import register_fields_api
from api.internal.requests.api import register_requests_api
from api.internal.responses import ErrorResponse
from api.internal.users.api import register_users_api


def get_api() -> NinjaAPI:
    api = NinjaAPI()

    subscribe_exception_handlers(api)

    register_auth_api(api)
    register_users_api(api)
    register_requests_api(api)
    register_fields_api(api)

    return api


def subscribe_exception_handlers(api: NinjaAPI) -> None:
    outer_exceptions = [
        UnauthorizedException,
        NotFoundRefreshTokenException,
        UnprocessableEntityException,
        InvalidPayloadException,
        ExpiredTokenException,
        UnknownRefreshTokenException,
        BadRequestException,
        NotFoundException,
        RevokedRefreshTokenException,
        ForbiddenException,
    ]

    inner_exceptions = [DatabaseError, ObjectDoesNotExist]

    for exception in outer_exceptions:
        api.add_exception_handler(exception, get_exception_handler(exception))

    if not settings.DEBUG:
        for exception in inner_exceptions:
            api.add_exception_handler(exception, handle_500_error)


def get_exception_handler(exception: Type[APIException]) -> Callable[[HttpRequest, Exception], HttpResponse]:
    return lambda request, exc: exception.get_response(exc)


def handle_500_error(request: HttpRequest, exc) -> Response:
    return Response(ErrorResponse(error="Server error").dict(), status=500)

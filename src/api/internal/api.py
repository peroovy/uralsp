from typing import Callable, Type

from django.http import HttpRequest, HttpResponse
from ninja import NinjaAPI

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
from api.internal.user.api import register_user_api


def get_api() -> NinjaAPI:
    api = NinjaAPI()

    subscribe_exception_handlers(api)

    register_auth_api(api)
    register_user_api(api)

    return api


def subscribe_exception_handlers(api: NinjaAPI) -> None:
    exceptions = [
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

    for exception in exceptions:
        api.add_exception_handler(exception, get_exception_handler(exception))


def get_exception_handler(exception: Type[APIException]) -> Callable[[HttpRequest, Exception], HttpResponse]:
    return lambda request, exc: exception.get_response(exc)

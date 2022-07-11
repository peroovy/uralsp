from abc import abstractmethod

from django.http import HttpRequest, HttpResponse
from ninja import NinjaAPI


class APIException(Exception):
    @classmethod
    @abstractmethod
    def get_response(cls, request: HttpRequest, exc, api: NinjaAPI) -> HttpResponse:
        pass


class BadRequestException(APIException):
    def __init__(self, message: str = "Check entered values"):
        self.message = message

    @classmethod
    def get_response(cls, request: HttpRequest, exc, api: NinjaAPI) -> HttpResponse:
        return api.create_response(request, data={"error": exc.message}, status=400)


class NotFoundException(APIException):
    def __init__(self, what: str = "resource"):
        self.what = what

    @classmethod
    def get_response(cls, request: HttpRequest, exc, api: NinjaAPI) -> HttpResponse:
        return api.create_response(request, data={"error": f"Not found: {exc.what}"}, status=404)


class UnprocessableEntityException(APIException):
    def __init__(self, message: str):
        self.message = message

    @classmethod
    def get_response(cls, request: HttpRequest, exc, api: NinjaAPI) -> HttpResponse:
        return api.create_response(request, data={"error": exc.message}, status=422)


class ServerException(APIException):
    def __init__(self, message: str = "Server error"):
        self.message = message

    @classmethod
    def get_response(cls, request: HttpRequest, exc, api: NinjaAPI) -> HttpResponse:
        return api.create_response(request, data={"error": exc.message}, status=500)


class UnauthorizedException(APIException):
    @classmethod
    def get_response(cls, request: HttpRequest, exc, api: NinjaAPI) -> HttpResponse:
        return api.create_response(request, data={"error": "Unauthorized"}, status=401)


class NotFoundRefreshTokenException(UnprocessableEntityException):
    def __init__(self):
        super().__init__("Refresh token was not found in cookies")


class InvalidPayloadException(UnprocessableEntityException):
    def __init__(self):
        super().__init__("Access token's payload is invalid")


class ExpiredTokenException(UnprocessableEntityException):
    def __init__(self):
        super().__init__("Token is expired")


class UnknownRefreshTokenException(NotFoundException):
    def __init__(self):
        super().__init__("refresh token")


class RevokedRefreshTokenException(UnprocessableEntityException):
    def __init__(self):
        super().__init__("Refresh token was be revoked")

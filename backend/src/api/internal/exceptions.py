from abc import abstractmethod

from ninja.responses import Response

from api.internal.auth.domain.services import TokenTypes
from api.internal.responses import ErrorResponse


class APIException(Exception):
    @classmethod
    @abstractmethod
    def get_response(cls, exc) -> Response:
        ...


class BadRequestException(APIException):
    def __init__(self, message: str = "Check entered values"):
        self.message = message

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(details=exc.message), status=400)


class NotFoundException(APIException):
    def __init__(self, what: str = "resource"):
        self.what = what

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(details=f"Not found {exc.what}"), status=404)


class UnprocessableEntityException(APIException):
    def __init__(self, message: str, error: str):
        self.message = message
        self.error = error

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(details=exc.message, error=exc.error), status=422)


class ServerException(APIException):
    def __init__(self, message: str = "Server error"):
        self.message = message

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(details=exc.message), status=500)


class UnauthorizedException(APIException):
    def __init__(self, message: str = "Unauthorized"):
        self.message = message

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(details=exc.message), status=401)


class ForbiddenException(APIException):
    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(details="Forbidden"), status=403)


class InvalidPayloadException(UnprocessableEntityException):
    def __init__(self, token_type: TokenTypes):
        super().__init__(message=f"Invalid payload of {token_type.value} token", error="bad payload")


class ExpiredTokenException(UnprocessableEntityException):
    def __init__(self, token_type: TokenTypes):
        super().__init__(message=f"{token_type.value.title()} token is expired", error="expired token")

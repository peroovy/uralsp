from abc import abstractmethod

from ninja.responses import Response

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
        return Response(ErrorResponse(error="bad request", detail=exc.message), status=400)


class NotFoundException(APIException):
    def __init__(self, what: str = "resource"):
        self.what = what

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(error="not found", detail=f"Not found {exc.what}"), status=404)


class UnprocessableEntityException(APIException):
    def __init__(self, message: str, error: str):
        self.message = message
        self.error = error

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(detail=exc.message, error=exc.error), status=422)


class ServerException(APIException):
    def __init__(self, message: str = "Server error"):
        self.message = message

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(detail=exc.message), status=500)


class UnauthorizedException(APIException):
    def __init__(self, error: str = "bad token", message: str = "Unauthorized"):
        self.message = message
        self.error = error

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(error=exc.error, detail=exc.message), status=401)


class ForbiddenException(APIException):
    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(ErrorResponse(error="forbidden", detail="Permission denied"), status=403)


API_EXCEPTIONS = (
    UnauthorizedException,
    UnprocessableEntityException,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
)

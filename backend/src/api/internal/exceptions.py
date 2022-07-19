from abc import abstractmethod

from ninja.responses import Response

from api.internal.auth.domain.services import TokenTypes


class APIException(Exception):
    @classmethod
    @abstractmethod
    def get_response(cls, exc) -> Response:
        pass


class BadRequestException(APIException):
    def __init__(self, message: str = "Check entered values"):
        self.message = message

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(data={"error": exc.message}, status=400)


class NotFoundException(APIException):
    def __init__(self, what: str = "resource"):
        self.what = what

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(data={"error": f"Not found {exc.what}"}, status=404)


class UnprocessableEntityException(APIException):
    def __init__(self, message: str):
        self.message = message

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(data={"error": exc.message}, status=422)


class ServerException(APIException):
    def __init__(self, message: str = "Server error"):
        self.message = message

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(data={"error": exc.message}, status=500)


class UnauthorizedException(APIException):
    def __init__(self, message: str = "Unauthorized"):
        self.message = message

    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(data={"error": exc.message}, status=401)


class NotFoundRefreshTokenException(UnprocessableEntityException):
    def __init__(self):
        super().__init__(message="Refresh token was not found in cookies")


class ForbiddenException(APIException):
    @classmethod
    def get_response(cls, exc) -> Response:
        return Response(data={"error": "Forbidden"}, status=403)


class InvalidPayloadException(UnprocessableEntityException):
    def __init__(self, token_type: TokenTypes):
        super().__init__(message=f"Payload of {token_type.value} token is broken")


class ExpiredTokenException(UnprocessableEntityException):
    def __init__(self, token_type: TokenTypes):
        super().__init__(message=f"{token_type.value.title()} token is expired")


class UnknownRefreshTokenException(NotFoundException):
    def __init__(self):
        super().__init__(what="refresh token")


class RevokedRefreshTokenException(UnprocessableEntityException):
    def __init__(self):
        super().__init__(message="Refresh token was revoked")

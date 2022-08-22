from typing import Callable

from django.conf import settings
from django.http import Http404, HttpRequest, HttpResponse
from loguru import logger
from ninja.responses import Response

from api.internal.logging import telegram_logging
from api.internal.responses import ErrorResponse


class ProcessInternalErrorMiddleware:
    INTERNAL = "internal"
    BAD_URI = "bad uri"

    INTERNAL_SERVER_ERROR = "Internal server error"
    NOT_FOUND_RESOURCE = "Not found resource"

    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]):
        self._get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        return self._get_response(request)

    def process_exception(self, request: HttpRequest, exception: Exception) -> Response:
        if settings.DEBUG:
            raise exception

        if type(exception) is Http404:
            return self.handle_404(request, exception)

        return self.handle_500(request, exception)

    def handle_404(self, request: HttpRequest, exception: Exception) -> Response:
        return Response(ErrorResponse(details=self.NOT_FOUND_RESOURCE, error=self.BAD_URI), status=404)

    def handle_500(self, request: HttpRequest, exception: Exception) -> Response:
        telegram_logging(exception)

        return Response(ErrorResponse(details=self.INTERNAL_SERVER_ERROR, error=self.INTERNAL), status=500)

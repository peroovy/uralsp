from unittest.mock import Mock, patch

import pytest
from django.http import HttpRequest

from api.internal.db.models import User


@pytest.fixture(scope="function")
def empty_request() -> HttpRequest:
    request = Mock()
    request.COOKIES = {}

    return request


@pytest.fixture(scope="function")
def http_request(empty_request: HttpRequest, user: User) -> HttpRequest:
    empty_request.user = user

    return empty_request

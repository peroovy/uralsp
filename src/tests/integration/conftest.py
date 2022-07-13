from unittest.mock import Mock, patch

import pytest
from django.http import HttpRequest
from google.oauth2 import id_token
from vk import API


@pytest.fixture(scope="function")
def http_request() -> HttpRequest:
    request = Mock()
    request.COOKIES = {}

    return request


@pytest.fixture(scope="function")
def vk_api() -> API:
    patcher = patch("api.internal.auth.presentation.handlers.API")
    API = patcher.start()

    api = Mock()
    API.return_value = api

    return api


@pytest.fixture(scope="function")
def google_api() -> id_token:
    patcher = patch("api.internal.auth.presentation.handlers.id_token")
    api = patcher.start()

    api.verify_oauth2_token = Mock()

    return api

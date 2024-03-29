import unittest
from datetime import timedelta
from enum import IntEnum, auto
from hmac import HMAC
from typing import Callable, Iterable, Optional
from unittest.mock import Mock

import jwt
import pytest
from django.conf import settings
from django.test import Client
from django.utils.timezone import now
from google.oauth2 import id_token
from ninja.responses import Response

from api.internal.db.models import User

EMAIL__IS_CORRECT = [
    [None, True],
    ["", False],
    ["asd", False],
    ["asd@", False],
    ["asd@asd", False],
    ["asd@asd.", False],
    ["asd@asd.a", True],
]


PHONE__IS_CORRECT = [
    *[[f"+{dig}" + "1" * 10, True] for dig in range(10)],
    *[[f"   +{dig}" + "1" * 10, False] for dig in range(1, 10)],
    *[[f"+{dig}" + "1" * 10 + "  ", False] for dig in range(1, 10)],
    *[[str(dig) + "1" * 10, False] for dig in range(10)],
    ["+7" + "a" * 10, False],
    ["+" + "a" * 11, False],
    ["a" * 11, False],
]


INSTITUTION__IS_CORRECT = [
    [None, True],
    ["null", False],
    ["", False],
    ["  ", False],
    ["unknown", False],
    ["school", True],
    ["college", True],
    ["university", True],
]


@pytest.fixture(scope="function")
def user_token(user: User) -> str:
    return get_token(user)


@pytest.fixture(scope="function")
def admin_token(admin: User) -> str:
    return get_token(admin)


@pytest.fixture(scope="function")
def super_admin_token(super_admin: User) -> str:
    return get_token(super_admin)


@pytest.fixture(scope="function")
def google_api() -> id_token:
    return unittest.mock.patch("api.internal.auth.domain.socials.services.google_id_token").start()


@pytest.fixture(scope="function")
def hmac() -> HMAC:
    hmac_instance = Mock()
    unittest.mock.patch("api.internal.auth.domain.socials.services.hmac").start().new.return_value = hmac_instance

    return hmac_instance


def get_token(user: User) -> str:
    payload = {
        "type": "access",
        "user_id": user.id,
        "expires_in": int((now() + timedelta(days=10)).timestamp()),
        "permission": user.permission,
    }

    return jwt.encode(payload, settings.SECRET_KEY)


def get_headers(token: Optional[str]) -> dict:
    return {"HTTP_AUTHORIZATION": f"bearer {token}"} if token is not None else {}


def assert_401(response, error: str = "bad token") -> None:
    assert response.status_code == 401 and response.json() == {"error": error, "message": "Unauthorized"}


def assert_403(response) -> None:
    assert response.status_code == 403 and response.json() == {"error": "forbidden", "message": "Permission denied"}


def assert_400(response, message: str = "Check entered values") -> None:
    assert response.status_code == 400 and response.json() == {"error": "bad request", "message": message}


def assert_404(response, what: str) -> None:
    assert response.status_code == 404 and response.json() == {"error": "not found", "message": f"Not found {what}"}


def assert_validation_error(response) -> None:
    assert response.status_code == 422


def assert_422(response, error: str, message: str) -> None:
    assert response.status_code == 422 and response.json() == {"error": error, "message": message}


def assert_not_422_body(response, error: str, message: str) -> None:
    assert response.json() != {"error": error, "message": message}


def assert_success_response(response) -> None:
    assert response.status_code == 200 and response.json() == {"message": "Success"}


def assert_not_200(response) -> None:
    assert response.status_code != 200 and response.json() != {"message": "Success"}


def assert_access(
    method: Callable[[str], Response], tokens_access: Iterable[Optional[str]], token_not_access: Iterable[Optional[str]]
) -> None:
    bad_statuses = [401, 403]

    for token in tokens_access:
        response = method(token)
        assert response.status_code not in bad_statuses

    for token in token_not_access:
        response = method(token)
        assert response.status_code in bad_statuses


def get(client: Client, uri: str, token: str = None) -> Response:
    return client.get(uri, content_type="application/json", **get_headers(token))


def post(client: Client, uri: str, token: str = None, body: dict = None) -> Response:
    return client.post(uri, body, content_type="application/json", **get_headers(token))


def put(client: Client, uri: str, token: str = None, body: dict = None) -> Response:
    return client.put(uri, body, content_type="application/json", **get_headers(token))


def patch(client: Client, uri: str, token: str = None, body: dict = None) -> Response:
    return client.patch(uri, body, content_type="application/json", **get_headers(token))


def delete(client: Client, uri: str, token: str = None) -> Response:
    return client.delete(uri, content_type="application/json", **get_headers(token))

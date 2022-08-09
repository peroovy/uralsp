from datetime import timedelta
from enum import IntEnum, auto

import jwt
import pytest
from django.conf import settings
from django.test import Client
from django.utils.timezone import now
from ninja.responses import Response

from api.internal.db.models import User


class TokenOwner(IntEnum):
    TEACHER = auto()
    DEFAULT = auto()
    ADMIN = auto()
    SUPER_ADMIN = auto()


@pytest.fixture(scope="function")
def user_token(user: User) -> str:
    return get_token(user)


@pytest.fixture(scope="function")
def admin_token(admin: User) -> str:
    return get_token(admin)


@pytest.fixture(scope="function")
def super_admin_token(super_admin: User) -> str:
    return get_token(super_admin)


def get_token(user: User) -> str:
    payload = {
        "type": "access",
        "user_id": user.id,
        "expires_in": int((now() + timedelta(days=10)).timestamp()),
        "permission": user.permission,
    }

    return jwt.encode(payload, settings.SECRET_KEY)


def get_headers(token: str) -> dict:
    return {"HTTP_AUTHORIZATION": f"bearer {token}"}


def assert_403(response) -> None:
    assert response.status_code == 403
    assert response.json() == {"error": "forbidden", "details": "Permission denied"}


def assert_404(response, what: str) -> None:
    assert response.status_code == 404
    assert response.json() == {"error": "not found", "details": f"Not found {what}"}


def assert_validation_error(response) -> None:
    assert response.status_code == 422


def assert_422(response, error: str, details: str) -> None:
    assert response.status_code == 422
    assert response.json() == {"error": error, "details": details}


def assert_200(response) -> None:
    assert response.status_code == 200
    assert response.json() == {"details": "Success"}


def get(client: Client, uri: str, token: str = None) -> Response:
    return client.get(uri, content_type="application/json", **get_headers(token))


def post(client: Client, uri: str, token: str = None, body: dict = None) -> Response:
    return client.post(uri, body, content_type="application/json", **get_headers(token))


def put(client: Client, uri: str, token: str = None, body: dict = None) -> Response:
    return client.put(uri, body, content_type="application/json", **get_headers(token))


def patch(client: Client, uri: str, token: str = None, body: dict = None) -> Response:
    return client.patch(uri, body, content_type="application/json", **get_headers(token))

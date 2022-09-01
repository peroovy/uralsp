from datetime import timedelta
from hmac import HMAC

import freezegun
import jwt
import pytest
from django.conf import settings
from django.http import SimpleCookie
from django.test import Client
from django.utils.timezone import now
from google.oauth2 import id_token
from ninja.responses import Response

from api.internal.auth.domain.services import TokenTypes
from api.internal.db.models import RefreshToken, User
from api.internal.db.models.user import Permissions
from tests.conftest import AFTER_NOW, BEFORE_NOW
from tests.integration.conftest import assert_401, assert_422, get, post
from tests.integration.test_current_user_api import PROFILE

AUTH = "/auth"
REFRESH = AUTH + "/refresh"
SIGNIN = AUTH + "/signin-"
VK = SIGNIN + "vkontakte"
GOOGLE = SIGNIN + "google"
TELEGRAM = SIGNIN + "telegram"

BAD_CREDENTIALS = "bad credentials"

VK_APP_ID, VK_APP_SECRET, VK_USER_ID, VK_HASH = (
    51395235,
    "vjBSB3pmpMsA0jTEdnC0",
    742624294,
    "b3c36cf9fbcf3cf8356852eccb4b537c",
)


def handler_with_jwt_auth(client: Client, access: str) -> Response:
    return get(client, PROFILE, access)


def payload(user_id: int, expires_in: int, type: str, permission: str) -> dict:
    return {"user_id": user_id, "permission": permission, "type": type, "expires_in": expires_in}


def token(user_id: int, expires_in: int, type: str, permission: str, secret: str = None) -> str:
    return jwt.encode(payload(user_id, expires_in, type, permission), secret or settings.SECRET_KEY, "HS256")


def bad_tokens(type: TokenTypes) -> list:
    expires_in = int((now() + timedelta(days=10)).timestamp())

    correct = token(0, expires_in, type.value, Permissions.DEFAULT.value)

    bad_permission = token(0, expires_in, type.value, "unknown")
    bad_payload = jwt.encode({}, settings.SECRET_KEY)
    bad_secret = jwt.encode(payload(0, expires_in, type.value, Permissions.DEFAULT.value), key="bad")

    another_type = TokenTypes.ACCESS if type == TokenTypes.REFRESH else TokenTypes.REFRESH
    bad_types = [token(0, expires_in, value, type.value) for value in ["", " ", "abs", None, another_type.value]]

    return ["", " ", "asdf", None, correct[1:], correct[:1], bad_payload, bad_secret, bad_permission, *bad_types]


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize(["uid", "hash_"], [[-1, VK_HASH], [VK_USER_ID, "wrong_hash"], [-1, "wrong_hash"]])
def test_vk_auth__bad_credentials(client: Client, uid: int, hash_: str) -> None:
    settings.VKONTAKTE_APP_ID = VK_APP_ID
    settings.VKONTAKTE_APP_SECRET_KEY = VK_APP_SECRET

    body = {"uid": uid, "first_name": "Pety", "last_name": "Petrov", "hash": hash_}

    assert_401(post(client, VK, body=body), BAD_CREDENTIALS)
    assert not User.objects.filter(vkontakte_id=uid, name=body["first_name"], surname=body["last_name"]).exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_vk_auth(client: Client) -> None:
    settings.VKONTAKTE_APP_ID = VK_APP_ID
    settings.VKONTAKTE_APP_SECRET_KEY = VK_APP_SECRET

    body = {"uid": VK_USER_ID, "first_name": "Pety", "last_name": "Petrov", "hash": VK_HASH}

    with freezegun.freeze_time(now()):
        response = post(client, VK, body=body)
        assert response.status_code == 200

        actual = User.objects.get(vkontakte_id=body["uid"], name=body["first_name"], surname=body["last_name"])

        assert_token_pair_response(response, actual)

    with freezegun.freeze_time(now() + timedelta(days=1)):
        new_body = body.copy()
        new_body["last_name"], new_body["first_name"] = "Sidorov", "Ivan"
        response = post(client, VK, body=new_body)
        assert response.status_code == 200

        actual = User.objects.get(vkontakte_id=new_body["uid"])
        assert actual.name == body["first_name"]
        assert actual.surname == body["last_name"]
        assert_token_pair_response(response, actual)


@pytest.mark.integration
@pytest.mark.django_db
def test_google_auth__bad_credentials(client: Client, google_api: id_token) -> None:
    body = {"id_token": "bad"}
    google_api.verify_oauth2_token.side_effect = ValueError()

    assert_401(post(client, GOOGLE, body=body), BAD_CREDENTIALS)


@pytest.mark.integration
@pytest.mark.django_db
def test_google_auth(client: Client, google_api: id_token) -> None:
    body = {"id_token": "token"}

    surname, name = "Petrov", "Pety"
    google_data = {"sub": 1337, "family_name": surname, "given_name": name}

    google_api.verify_oauth2_token.return_value = google_data

    with freezegun.freeze_time(now()):
        response = post(client, GOOGLE, body=body)
        assert response.status_code == 200

        actual = User.objects.get(
            google_id=google_data["sub"], name=google_data["given_name"], surname=google_data["family_name"]
        )

        assert_token_pair_response(response, actual)

    with freezegun.freeze_time(now() + timedelta(days=1)):
        google_data["family_name"], google_data["given_name"] = "Sidorov", "Ivan"

        response = post(client, GOOGLE, body=body)
        assert response.status_code == 200

        actual = User.objects.get(google_id=google_data["sub"])

        assert actual.name == name
        assert actual.surname == surname
        assert_token_pair_response(response, actual)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize(
    "body",
    [
        {
            "id": 3,
            "first_name": "Pety",
            "last_name": "Petrov",
            "username": "tankist",
            "photo_url": "/url",
            "auth_date": 1,
        },
        {"id": 3, "first_name": "Pety", "last_name": None, "username": None, "photo_url": None, "auth_date": 1},
        {"id": 3, "first_name": "Pety", "auth_date": 1},
    ],
)
def test_telegram_auth__bad_credentials(client: Client, hmac: HMAC, body: dict) -> None:
    body["hash"] = "qwerty123"
    hmac.hexdigest.return_value = "bad"

    assert_401(post(client, TELEGRAM, body=body), BAD_CREDENTIALS)
    assert not User.objects.filter(telegram_id=body["id"]).exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_telegram_auth(client: Client, hmac: HMAC) -> None:
    name = "Pety"
    hmac.hexdigest.return_value = body_hash = "hash"
    body = {"id": 3, "first_name": name, "auth_date": 1, "hash": body_hash}

    with freezegun.freeze_time(now()):
        response = post(client, TELEGRAM, body=body)
        assert response.status_code == 200

        actual = User.objects.get(telegram_id=body["id"], name=body["first_name"])
        assert actual.surname is None

        assert_token_pair_response(response, actual)

    with freezegun.freeze_time(now() + timedelta(days=1)):
        body["first_name"] = "Ivan"

        response = post(client, TELEGRAM, body=body)
        assert response.status_code == 200

        actual = User.objects.get(telegram_id=body["id"])

        assert actual.name == name
        assert actual.surname is None
        assert_token_pair_response(response, actual)

    with freezegun.freeze_time(now()):
        new_body = {"id": 44, "first_name": "Ivan", "last_name": "Ivanov", "auth_date": 1, "hash": body_hash}

        response = post(client, TELEGRAM, body=new_body)
        assert response.status_code == 200

        actual = User.objects.get(
            telegram_id=new_body["id"], name=new_body["first_name"], surname=new_body["last_name"]
        )
        assert_token_pair_response(response, actual)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("cookies", [{}, {"bad_key": "value"}])
def test_refreshing__bad_cookies(client: Client, cookies: dict) -> None:
    error, details = "bad cookies", "Not found refresh token in cookies"
    client.cookies = SimpleCookie(cookies)

    assert_422(post(client, REFRESH), error, details)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("value", bad_tokens(TokenTypes.REFRESH))
def test_refreshing__invalid_payload(client: Client, value: str) -> None:
    assert_refresh_exception(client, value, "bad token", "Invalid payload")


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW + [timedelta(0)])
@freezegun.freeze_time(now())
def test_refreshing__expired_token(client: Client, delta: timedelta) -> None:
    expires_in = int((now() + delta).timestamp())
    value = token(0, expires_in, TokenTypes.REFRESH.value, Permissions.DEFAULT.value)

    assert_refresh_exception(client, value, "expired token", "Refresh token is expired")


@pytest.mark.integration
@pytest.mark.django_db
def test_refreshing__unknown_token(client: Client) -> None:
    value = token(0, (now() + timedelta(days=2)).timestamp(), TokenTypes.REFRESH.value, Permissions.DEFAULT.value)

    assert_refresh_exception(client, value, "unknown token", "Not found refresh token details in database")


@pytest.mark.integration
@pytest.mark.django_db
def test_refreshing__revoked_token(client: Client, user: User) -> None:
    RefreshToken.objects.bulk_create(RefreshToken(user=user, value=i, revoked=False) for i in range(3))

    value = token(user.id, (now() + timedelta(days=2)).timestamp(), TokenTypes.REFRESH.value, user.permission)
    RefreshToken.objects.create(user=user, value=value, revoked=True)

    assert_refresh_exception(client, value, "revoked token", "Refresh token is revoked")
    assert not RefreshToken.objects.filter(user=user, revoked=False).exists()


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", AFTER_NOW)
@freezegun.freeze_time(now())
def test_refreshing(client: Client, user: User, delta: timedelta) -> None:
    revoked_expected = RefreshToken.objects.bulk_create(
        RefreshToken(user=user, value=str(i), revoked=False) for i in range(3)
    )

    value = token(user.id, int((now() + delta).timestamp()), TokenTypes.REFRESH.value, user.permission)
    revoked_expected.append(RefreshToken.objects.create(user=user, value=value, revoked=False))

    client.cookies = SimpleCookie({settings.REFRESH_TOKEN_COOKIE: value})
    assert_token_pair_response(post(client, REFRESH), user)
    assert sorted(RefreshToken.objects.filter(user=user, revoked=True), key=lambda t: t.pk) == sorted(
        revoked_expected, key=lambda t: t.pk
    )
    assert RefreshToken.objects.filter(user=user, revoked=False).count() == 1


def assert_refresh_exception(client: Client, value: str, error: str, details: str) -> None:
    client.cookies = SimpleCookie({settings.REFRESH_TOKEN_COOKIE: value})

    assert_422(post(client, REFRESH), error, details)


def assert_token_pair_response(response: Response, user: User) -> None:
    assert response.status_code == 200

    body = response.json()
    access_payload, expires_in, token_type = (
        get_payload_from_token(body["access_token"]),
        body["expires_in"],
        body["token_type"],
    )
    refresh_payload = get_payload_from_token(response.cookies[settings.REFRESH_TOKEN_COOKIE].value)

    expected_access_expires = int((now() + settings.ACCESS_TOKEN_TTL).timestamp())
    expected_refresh_expires = int((now() + settings.REFRESH_TOKEN_TTL).timestamp())

    assert expires_in == expected_access_expires
    assert token_type == "bearer"
    assert_payload(access_payload, user.id, expected_access_expires, "access", user.permission)

    assert_payload(refresh_payload, user.id, expected_refresh_expires, "refresh", user.permission)


def assert_payload(actual_payload: dict, user_id: int, expires_in: int, type: str, permission: str) -> None:
    assert actual_payload == payload(user_id, expires_in, type, permission)


def get_payload_from_token(value: str) -> dict:
    return jwt.decode(value, settings.SECRET_KEY, "HS256")


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("value", bad_tokens(TokenTypes.ACCESS))
def test_jwt_auth__bad_token(client: Client, value: str) -> None:
    assert_access_exception(client, value, "bad token")


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW + [timedelta(0)])
def test_jwt_auth__expired_token(client: Client, delta: timedelta) -> None:
    expires_in = int((now() + delta).timestamp())
    value = token(0, expires_in, TokenTypes.ACCESS.value, Permissions.DEFAULT.value)

    assert_access_exception(client, value, "expired token")


@pytest.mark.integration
@pytest.mark.django_db
def test_jwt_auth__unknown_user(client: Client) -> None:
    expires_in = int((now() + timedelta(days=10)).timestamp())
    value = token(0, expires_in, TokenTypes.ACCESS.value, Permissions.DEFAULT.value)

    assert_access_exception(client, value, "unknown user")


def assert_access_exception(client: Client, value: str, error: str) -> None:
    assert_401(handler_with_jwt_auth(client, value), error)

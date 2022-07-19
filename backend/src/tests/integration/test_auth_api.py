import json
from datetime import timedelta
from typing import Any

import freezegun
import pytest
from django.conf import settings
from django.db.models import Q
from django.http import HttpRequest
from django.utils.timezone import now
from google.oauth2 import id_token
from jwt import decode, encode
from ninja.responses import Response
from vk import API
from vk.exceptions import VkException

from api.internal.auth.domain.entities import GoogleLoginIn, VKLoginIn
from api.internal.auth.domain.services import AuthService, Payload, SocialService, TokenTypes
from api.internal.auth.presentation.handlers import AuthHandlers
from api.internal.db.models import RefreshToken, User
from api.internal.db.repositories import google_repo, refresh_repo, user_repo, vkontakte_repo
from api.internal.exceptions import (
    ExpiredTokenException,
    InvalidPayloadException,
    NotFoundRefreshTokenException,
    RevokedRefreshTokenException,
    UnauthorizedException,
    UnknownRefreshTokenException,
)

handlers = AuthHandlers(AuthService(user_repo, refresh_repo), SocialService(vkontakte_repo, google_repo))


@pytest.mark.integration
def test_signin_vkontakte__getting_error(empty_request: HttpRequest, vk_api: API) -> None:
    vk_api.account.getProfileInfo.side_effect = VkException()

    with pytest.raises(UnauthorizedException):
        handlers.signin_vkontakte(empty_request, VKLoginIn(access_token=""))


@pytest.mark.django_db
@pytest.mark.integration
@freezegun.freeze_time(now())
def test_signin_vkontakte__social_id_exists(empty_request: HttpRequest, user: User, vk_api: API) -> None:
    vk_data = {"id": user.vkontakte_id, "first_name": "111111", "last_name": "22222222"}
    vk_api.account.getProfileInfo.return_value = vk_data

    response = handlers.signin_vkontakte(empty_request, VKLoginIn(access_token=""))

    assert_social__id_exists(response, user, vkontakte_id=vk_data["id"])


@pytest.mark.django_db
@pytest.mark.integration
@freezegun.freeze_time(now())
def test_signin_vkontakte__social_id_not_exists(empty_request: HttpRequest, user: User, vk_api: API) -> None:
    data = {"id": 9999999999999999999999999999999, "first_name": user.name, "last_name": user.surname}
    vk_api.account.getProfileInfo.return_value = data

    response = handlers.signin_vkontakte(empty_request, VKLoginIn(access_token=""))

    assert_social__id_doesnt_exist(response, user, data["first_name"], data["last_name"], vkontakte_id=data["id"])


@pytest.mark.integration
def test_signin_google__getting_error(empty_request: HttpRequest, google_api: id_token) -> None:
    google_api.verify_oauth2_token.side_effect = ValueError()

    with pytest.raises(UnauthorizedException):
        handlers.signin_google(empty_request, GoogleLoginIn(client_id=0, id_token=""))


@pytest.mark.django_db
@pytest.mark.integration
@freezegun.freeze_time(now())
def test_signin_google__social_id_exists(empty_request: HttpRequest, user: User, google_api: id_token) -> None:
    google_data = {"sub": user.google_id, "given_name": "111111", "family_name": "22222222"}
    google_api.verify_oauth2_token.return_value = google_data

    response = handlers.signin_google(empty_request, GoogleLoginIn(client_id=0, id_token=""))

    assert_social__id_exists(response, user, google_id=google_data["sub"])


@pytest.mark.django_db
@pytest.mark.integration
@freezegun.freeze_time(now())
def test_signin_google__social_id_not_exists(empty_request: HttpRequest, user: User, google_api: id_token) -> None:
    data = {"sub": 9999999999999999999999999999999, "given_name": user.name, "family_name": user.surname}
    google_api.verify_oauth2_token.return_value = data

    response = handlers.signin_google(empty_request, GoogleLoginIn(client_id=0, id_token=""))

    assert_social__id_doesnt_exist(response, user, data["given_name"], data["family_name"], google_id=data["sub"])


@pytest.mark.integration
def test_refreshing__token_was_not_set(empty_request: HttpRequest) -> None:
    with pytest.raises(NotFoundRefreshTokenException):
        empty_request.COOKIES = {}
        handlers.refresh(empty_request)

        empty_request.COOKIES = {settings.REFRESH_TOKEN_COOKIE: ""}
        handlers.refresh(empty_request)


@pytest.mark.integration
def test_refreshing__invalid_token(empty_request: HttpRequest) -> None:
    token_with_wrong_secret_key = (
        r"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        r".eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
        r".SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    )
    token = encode({"payload": "normal"}, settings.SECRET_KEY)
    payload, signature = token[1:], token[:-1]

    for bad_token in ["-1", payload, signature, token_with_wrong_secret_key]:
        with pytest.raises(InvalidPayloadException):
            empty_request.COOKIES[settings.REFRESH_TOKEN_COOKIE] = bad_token
            handlers.refresh(empty_request)


@pytest.mark.integration
@pytest.mark.parametrize("typeof", [-1, "-1", TokenTypes.ACCESS.value, None, [], {}])
def test_refreshing__invalid_token_type(empty_request: HttpRequest, typeof: Any) -> None:
    payload = {
        Payload.USER_ID: 0,
        Payload.PERMISSION: 0,
        Payload.TOKEN_TYPE: typeof,
        Payload.EXPIRES_IN: 0,
    }

    with pytest.raises(InvalidPayloadException):
        empty_request.COOKIES[settings.REFRESH_TOKEN_COOKIE] = encode(
            payload, settings.SECRET_KEY, AuthService.ALGORITHM
        )
        handlers.refresh(empty_request)


@pytest.mark.integration
@freezegun.freeze_time(now())
@pytest.mark.parametrize(
    "delta",
    [
        timedelta(microseconds=0),
        -timedelta(seconds=1),
        -settings.ACCESS_TOKEN_TTL,
        -settings.ACCESS_TOKEN_TTL // 2,
        -2 * settings.ACCESS_TOKEN_TTL,
    ],
)
def test_refreshing__token_is_expired(empty_request: HttpRequest, delta: timedelta) -> None:
    payload = {
        Payload.USER_ID: 0,
        Payload.PERMISSION: 0,
        Payload.TOKEN_TYPE: TokenTypes.REFRESH.value,
        Payload.EXPIRES_IN: int((now() + delta).timestamp()),
    }

    with pytest.raises(ExpiredTokenException):
        empty_request.COOKIES[settings.REFRESH_TOKEN_COOKIE] = encode(
            payload, settings.SECRET_KEY, AuthService.ALGORITHM
        )
        handlers.refresh(empty_request)


@pytest.mark.django_db
@pytest.mark.integration
def test_refreshing__unknown_token_value(empty_request: HttpRequest) -> None:
    payload = {
        Payload.USER_ID: 0,
        Payload.PERMISSION: 0,
        Payload.TOKEN_TYPE: TokenTypes.REFRESH.value,
        Payload.EXPIRES_IN: 2 * int(now().timestamp()),
    }

    with pytest.raises(UnknownRefreshTokenException):
        empty_request.COOKIES[settings.REFRESH_TOKEN_COOKIE] = encode(
            payload, settings.SECRET_KEY, AuthService.ALGORITHM
        )
        handlers.refresh(empty_request)


@pytest.mark.django_db
@pytest.mark.integration
def test_refreshing__if_token_was_revoked(empty_request: HttpRequest, user: User) -> None:
    payload = {
        Payload.USER_ID: 0,
        Payload.PERMISSION: 0,
        Payload.TOKEN_TYPE: TokenTypes.REFRESH.value,
        Payload.EXPIRES_IN: 2 * int(now().timestamp()),
    }
    token = encode(payload, settings.SECRET_KEY, AuthService.ALGORITHM)

    RefreshToken.objects.create(value=token, user=user, revoked=True)
    RefreshToken.objects.bulk_create(RefreshToken(value=i, user=user, revoked=False) for i in range(5))

    empty_request.COOKIES[settings.REFRESH_TOKEN_COOKIE] = token

    with pytest.raises(RevokedRefreshTokenException):
        handlers.refresh(empty_request)

    assert not RefreshToken.objects.filter(user=user, revoked=False).exists()


@pytest.mark.django_db
@pytest.mark.integration
def test_refreshing(empty_request: HttpRequest, user: User) -> None:
    RefreshToken.objects.bulk_create(RefreshToken(value=i, user=user, revoked=False) for i in range(5))

    payload = {
        Payload.USER_ID: 0,
        Payload.PERMISSION: 0,
        Payload.TOKEN_TYPE: TokenTypes.REFRESH.value,
        Payload.EXPIRES_IN: 2 * int(now().timestamp()),
    }

    token = encode(payload, settings.SECRET_KEY, AuthService.ALGORITHM)
    empty_request.COOKIES[settings.REFRESH_TOKEN_COOKIE] = token
    RefreshToken.objects.create(user=user, value=token, revoked=False)

    response = handlers.refresh(empty_request)

    assert_tokens_response(response, user)

    refresh_in_cookie = response.cookies["refresh_token"].value

    assert RefreshToken.objects.filter(user=user, value=refresh_in_cookie, revoked=False).exists()
    assert not RefreshToken.objects.filter(~Q(value=refresh_in_cookie) & Q(revoked=False)).exists()


def assert_social__id_exists(response: Response, user: User, **social_id) -> None:
    if len(social_id) != 1:
        raise ValueError("Wrong social_id kwarg")

    assert_tokens_response(response, user)
    assert User.objects.filter(**social_id).count() == 1

    actual = User.objects.get(**social_id)
    assert actual == user


def assert_social__id_doesnt_exist(
    response: Response, user: User, social_name: str, social_surname: str, **social_id
) -> None:
    if len(social_id) != 1:
        raise ValueError("Wrong social_id kwarg")

    assert User.objects.filter(**social_id).count() == 1

    assert User.objects.filter(name=social_name, surname=social_surname).count() == 2
    actual = User.objects.get(**social_id)
    assert actual.id != user.id

    assert_tokens_response(response, actual)


def assert_tokens_response(response: Response, user: User) -> None:
    data: dict = json.loads(response.content)

    assert "refresh_token" in response.cookies
    assert sorted(["token_type", "access_token", "expires_in"]) == sorted(data.keys())

    access_payload = decode(data["access_token"], settings.SECRET_KEY, AuthService.ALGORITHM)
    refresh_payload = decode(response.cookies["refresh_token"].value, settings.SECRET_KEY, AuthService.ALGORITHM)

    for payload, ttl, type_name in [
        [access_payload, settings.ACCESS_TOKEN_TTL, "access"],
        [refresh_payload, settings.REFRESH_TOKEN_TTL, "refresh"],
    ]:
        assert payload["user_id"] == user.id
        assert payload["permission"] == user.permission
        assert payload["type"] == type_name
        assert type(payload["expires_in"]) is int
        assert payload["expires_in"] == int((now() + ttl).timestamp())

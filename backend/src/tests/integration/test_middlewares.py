from datetime import timedelta
from typing import Iterable

import freezegun
import pytest
from django.conf import settings
from django.http import HttpRequest
from django.utils.timezone import now
from jwt import encode

from api.internal.auth.domain.services import Payload, TokenTypes
from api.internal.db.models import User
from api.internal.db.models.user import Permissions
from api.internal.exceptions import ForbiddenException, UnauthorizedException
from api.internal.middlewares import AnyAdmin, AnyUser, JWTAuthentication, OnlySuperAdmin


@pytest.mark.integration
@pytest.mark.django_db
def test_any_users(http_request: HttpRequest, user: User) -> None:
    auth = AnyUser()

    assert_authentication(http_request, auth)
    assert_authorization(http_request, auth, user, Permissions, [])


@pytest.mark.integration
@pytest.mark.django_db
def test_any_admins(http_request: HttpRequest, user: User) -> None:
    auth = AnyAdmin()

    assert_authentication(http_request, auth)
    assert_authorization(
        http_request,
        auth,
        user,
        [Permissions.ADMIN, Permissions.SUPER_ADMIN],
        [Permissions.DEFAULT, Permissions.TEACHER],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_only_super_admins(http_request: HttpRequest, user: User) -> None:
    auth = OnlySuperAdmin()

    assert_authentication(http_request, auth)
    assert_authorization(
        http_request,
        auth,
        user,
        [Permissions.SUPER_ADMIN],
        [Permissions.DEFAULT, Permissions.TEACHER, Permissions.ADMIN],
    )


def assert_authentication(http_request: HttpRequest, auth: JWTAuthentication) -> None:
    assert_bad_payload_error(http_request, auth)
    assert_bad_token_type(http_request, auth)
    assert_expired_token(http_request, auth)
    assert_unknown_user(http_request, auth)


def assert_bad_payload_error(http_request: HttpRequest, auth: JWTAuthentication) -> None:
    wrong_secret_token = (
        r"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        r".eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
        r".SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    )
    token_with_correct_key = encode({"payload": "normal"}, settings.SECRET_KEY)
    token_with_bad_key = encode({"payload": "normal"}, "Pety")
    payload, signature = token_with_correct_key[1:], token_with_correct_key[:-1]

    for bad_token in ["", "-1", payload, signature, wrong_secret_token, token_with_correct_key, token_with_bad_key]:
        with pytest.raises(UnauthorizedException):
            auth.authenticate(http_request, bad_token)


def assert_bad_token_type(http_request: HttpRequest, auth: JWTAuthentication) -> None:
    token = encode(
        Payload(
            TokenTypes.REFRESH.value, (now() + timedelta(days=10)).timestamp(), -1, Permissions.DEFAULT.value
        ).to_dictionary(),
        settings.SECRET_KEY,
        JWTAuthentication._service.ALGORITHM,
    )

    with pytest.raises(UnauthorizedException):
        auth.authenticate(http_request, token)


def assert_expired_token(http_request: HttpRequest, auth: JWTAuthentication) -> None:
    deltas = [
        timedelta(microseconds=0),
        timedelta(seconds=1),
        settings.ACCESS_TOKEN_TTL,
        settings.ACCESS_TOKEN_TTL // 2,
        2 * settings.ACCESS_TOKEN_TTL,
    ]

    with freezegun.freeze_time(now()):
        for delta in deltas:
            token = encode(
                Payload(
                    TokenTypes.ACCESS.value, (now() - delta).timestamp(), -1, Permissions.DEFAULT.value
                ).to_dictionary(),
                settings.SECRET_KEY,
                JWTAuthentication._service.ALGORITHM,
            )

            with pytest.raises(UnauthorizedException):
                auth.authenticate(http_request, token)


def assert_unknown_user(http_request: HttpRequest, auth: JWTAuthentication) -> None:
    token = encode(
        Payload(
            TokenTypes.ACCESS.value, (now() + timedelta(days=10)).timestamp(), -1, Permissions.DEFAULT.value
        ).to_dictionary(),
        settings.SECRET_KEY,
        JWTAuthentication._service.ALGORITHM,
    )

    with pytest.raises(UnauthorizedException):
        auth.authenticate(http_request, token)


def assert_authorization(
    http_request: HttpRequest,
    auth: JWTAuthentication,
    user: User,
    accessible: Iterable[Permissions],
    inaccessible: Iterable[Permissions],
) -> None:
    with freezegun.freeze_time(now()):
        token = encode(
            Payload(
                TokenTypes.ACCESS.value, (now() + timedelta(days=10)).timestamp(), user.id, user.permission
            ).to_dictionary(),
            settings.SECRET_KEY,
            JWTAuthentication._service.ALGORITHM,
        )

        for permission in accessible:
            user.permission = permission
            user.save(update_fields=["permission"])

            assert auth.authenticate(http_request, token) == token

        for permission in inaccessible:
            user.permission = permission
            user.save(update_fields=["permission"])

            with pytest.raises(ForbiddenException):
                auth.authenticate(http_request, token)

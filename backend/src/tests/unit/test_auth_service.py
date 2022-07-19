from datetime import timedelta

import freezegun
import pytest
from django.conf import settings
from django.utils.timezone import now
from jwt import decode, encode

from api.internal.auth.domain.services import AuthService, Payload, TokenTypes
from api.internal.db.models import RefreshToken, User
from api.internal.db.repositories import refresh_repo, user_repo

service = AuthService(user_repo, refresh_repo)


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_user_from_payload(user: User) -> None:
    assert user == service.get_user(Payload(user_id=user.id, token_type=None, expires_in=None, permission=None))
    assert service.get_user(Payload(user_id=-1, token_type=None, expires_in=None, permission=None)) is None


@pytest.mark.unit
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_creating_tokens(user: User, admin: User, super_admin: User) -> None:
    for account in [user, admin, super_admin]:
        token_details = service.try_create_access_and_refresh_tokens(account)
        assert_jwt_token(token_details.access, account, TokenTypes.ACCESS)
        assert_jwt_token(token_details.refresh, account, TokenTypes.REFRESH)


@pytest.mark.unit
@pytest.mark.django_db
def test_updating_tokens__refresh_is_expired(user: User) -> None:
    RefreshToken.objects.bulk_create(RefreshToken(value=i, user=user, revoked=False) for i in range(3))
    refresh = RefreshToken.objects.create(value="123", user=user, revoked=True)

    details = service.try_update_access_and_refresh_tokens(refresh)

    assert details.access is None
    assert details.refresh is None
    assert details.expires_in is None
    assert not RefreshToken.objects.filter(user=user, revoked=False).exists()


@pytest.mark.unit
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_updating_tokens(user: User) -> None:
    refresh = RefreshToken.objects.create(value="123", user=user, revoked=False)

    details = service.try_update_access_and_refresh_tokens(refresh)
    refresh.refresh_from_db(fields=["revoked"])

    assert refresh.revoked is True
    assert_jwt_token(details.access, user, TokenTypes.ACCESS)
    assert_jwt_token(details.refresh, user, TokenTypes.REFRESH)


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["typeof", "ttl"],
    [
        [TokenTypes.ACCESS, settings.ACCESS_TOKEN_TTL],
        [TokenTypes.REFRESH, settings.REFRESH_TOKEN_TTL],
    ],
)
def test_generating_token(user: User, typeof: TokenTypes, ttl: timedelta) -> None:
    with freezegun.freeze_time(now()) as frozen_datetime:
        token, expires_in = service.generate_token(user, typeof)

        payload = assert_jwt_token(token, user, typeof)
        assert payload.expires_in == expires_in

        frozen_datetime.tick(delta=ttl + timedelta(seconds=1))
        assert int(now().timestamp()) == expires_in + 1


@pytest.mark.unit
def test_getting_payload__invalid_token() -> None:
    wrong_secret_token = (
        r"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        r".eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
        r".SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    )
    token = encode({"payload": "normal"}, settings.SECRET_KEY)
    payload, signature = token[1:], token[:-1]

    for bad_token in ["", "-1", payload, signature, wrong_secret_token]:
        assert service.try_get_payload(bad_token) is None


@pytest.mark.unit
def test_checking_token_type_in_payload() -> None:
    payload = Payload(TokenTypes.ACCESS.value, None, None, None)

    assert service.is_token_type(payload, TokenTypes.ACCESS) is True
    assert service.is_token_type(payload, TokenTypes.REFRESH) is False


@pytest.mark.unit
@freezegun.freeze_time(service._now())
@pytest.mark.parametrize(
    ["delta", "is_expired"],
    [
        [settings.ACCESS_TOKEN_TTL, False],
        [settings.ACCESS_TOKEN_TTL // 2, False],
        [settings.ACCESS_TOKEN_TTL + timedelta(seconds=1), False],
        [2 * settings.ACCESS_TOKEN_TTL, False],
        [timedelta(microseconds=0), True],
        [-timedelta(seconds=1), True],
        [-settings.ACCESS_TOKEN_TTL, True],
        [-settings.ACCESS_TOKEN_TTL // 2, True],
        [-2 * settings.ACCESS_TOKEN_TTL, True],
    ],
)
def test_checking_token_expired(delta: timedelta, is_expired: bool) -> None:
    payload = Payload(
        expires_in=int((service._now() + delta).timestamp()), token_type=None, user_id=None, permission=None
    )

    assert service.is_token_expired(payload) == is_expired


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_refresh_details(user: User) -> None:
    token = RefreshToken.objects.create(value="123", user=user)

    assert service.get_refresh_token_details(token.value) == token


def assert_jwt_token(token: str, user: User, typeof: TokenTypes) -> Payload:
    payload = Payload.create(decode(token, settings.SECRET_KEY, service.ALGORITHM))
    ttl = settings.REFRESH_TOKEN_TTL if typeof == TokenTypes.REFRESH else settings.ACCESS_TOKEN_TTL

    assert payload.user_id == user.id
    assert payload.permission == user.permission
    assert payload.token_type == typeof.value
    assert payload.expires_in == int((now() + ttl).timestamp())

    return payload

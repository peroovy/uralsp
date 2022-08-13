import logging
from datetime import datetime, timedelta
from unittest.mock import Mock, patch

import pytest
from google.oauth2 import id_token

from api.internal.db.models import Competition, DefaultValue, Field, Participation, Request, User
from api.internal.db.models.user import Permissions


def pytest_configure(config):
    logging.disable()


AFTER_NOW = [
    timedelta(microseconds=1),
    timedelta(milliseconds=1),
    timedelta(seconds=1),
    timedelta(minutes=1),
    timedelta(hours=1),
    timedelta(days=1),
    timedelta(days=32),
    timedelta(days=365),
]

BEFORE_NOW = [-delta for delta in AFTER_NOW]

BAD_CREATING_DATE_DELTAS = [
    [timedelta(microseconds=2), timedelta(microseconds=2), timedelta(microseconds=3)],
    [timedelta(microseconds=1), timedelta(microseconds=2), timedelta(microseconds=2)],
    [timedelta(microseconds=2), timedelta(microseconds=2), timedelta(microseconds=2)],
    [timedelta(microseconds=0), timedelta(microseconds=2), timedelta(microseconds=3)],
    [timedelta(microseconds=0), timedelta(microseconds=0), timedelta(microseconds=3)],
    [timedelta(microseconds=0), timedelta(microseconds=0), timedelta(microseconds=0)],
    [timedelta(microseconds=10), timedelta(microseconds=0), timedelta(microseconds=0)],
    [timedelta(microseconds=10), timedelta(microseconds=0), timedelta(microseconds=20)],
    [timedelta(microseconds=10), timedelta(microseconds=0), timedelta(microseconds=5)],
    [timedelta(microseconds=-10), timedelta(microseconds=1), timedelta(microseconds=2)],
    [timedelta(microseconds=-10), timedelta(microseconds=-20), timedelta(microseconds=2)],
    [timedelta(microseconds=-10), timedelta(microseconds=-20), timedelta(microseconds=-30)],
    [timedelta(microseconds=-10), timedelta(microseconds=-5), timedelta(microseconds=-1)],
    [timedelta(microseconds=-10), timedelta(microseconds=-5), timedelta(microseconds=-6)],
    [timedelta(microseconds=-1), timedelta(microseconds=-1), timedelta(microseconds=-1)],
]

VALID_CREATING_DATE_DELTAS = [
    [timedelta(microseconds=1), timedelta(microseconds=2), timedelta(microseconds=3)],
    [timedelta(hours=1), timedelta(hours=2), timedelta(hours=3)],
    [timedelta(days=1), timedelta(days=2), timedelta(days=3)],
]


@pytest.fixture(scope="function")
def user() -> User:
    return User.objects.create(
        name="Pachka",
        surname="Pupkin",
        permission=Permissions.DEFAULT,
    )


@pytest.fixture(scope="function")
def another() -> User:
    return User.objects.create(
        name="Polka",
        surname="Popolka",
        patronymic="Tankist",
        permission=Permissions.DEFAULT,
    )


@pytest.fixture(scope="function")
def admin() -> User:
    return User.objects.create(
        name="Ksusha",
        surname="Grechka",
        patronymic="What",
        permission=Permissions.ADMIN,
    )


@pytest.fixture(scope="function")
def another_admin() -> User:
    return User.objects.create(
        name="OPA",
        surname="OPA-OPA",
        patronymic="asdf",
        permission=Permissions.ADMIN,
    )


@pytest.fixture(scope="function")
def super_admin() -> User:
    return User.objects.create(
        name="Qwerty",
        surname="Ytrewq",
        patronymic="Qawa",
        permission=Permissions.SUPER_ADMIN,
    )


@pytest.fixture(scope="function")
def another_super_admin() -> User:
    return User.objects.create(
        name="Qwertyasfasdfsa",
        surname="Ytrewqzxvcxvz",
        patronymic="Qawaasfqwerqe",
        permission=Permissions.SUPER_ADMIN,
    )


@pytest.fixture(scope="function")
def competition() -> Competition:
    return Competition.objects.create(
        name="babies",
        registration_start=datetime(1600, 3, 28),
        registration_end=datetime(3021, 12, 12),
        started_at=datetime(3022, 2, 28),
        persons_amount=1,
    )


@pytest.fixture(scope="function")
def another_competition() -> Competition:
    return Competition.objects.create(
        name="OPA",
        registration_start=datetime(1337, 3, 30),
        registration_end=datetime(2022, 12, 27),
        started_at=datetime(3022, 2, 13),
        persons_amount=2,
    )


@pytest.fixture(scope="function")
def user_request(user: User, competition: Competition) -> Request:
    return Request.objects.create(owner=user, competition=competition)


@pytest.fixture(scope="function")
def another_user_request(user: User, another_competition: Competition) -> Request:
    return Request.objects.create(owner=user, competition=another_competition)


@pytest.fixture(scope="function")
def participation(user: User, user_request: Request) -> Participation:
    return Participation.objects.create(request=user_request, user=user)


@pytest.fixture(scope="function")
def field() -> Field:
    return Field.objects.create(id="text_field", name="TextField", type=0)


@pytest.fixture(scope="function")
def another_field() -> Field:
    return Field.objects.create(id="checkbox", name="Checkbox", type=1)


def datetime_to_string(time: datetime) -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3]


def get_bad_admin_ids(user: User, admin: User, super_admin: User) -> list:
    return [[], [-1], [user.id], [super_admin.id], [user.id, admin.id], [admin.id, admin.id], [user.id, user.id]]


def get_bad_field_ids(field: Field) -> list:
    return [[], ["unknown"], ["unknown", field.id], ["unknown", "unknwon"], [field.id, field.id]]


def get_competition_filters_by_name(competition: Competition) -> list:
    return get_filters_by_string(competition.name)


def get_bad_competition_filters_by_name(competition: Competition) -> list:
    return get_bad_filters_by_string(competition.name)


def get_field_filters(field: Field) -> list:
    return get_filters_by_string(field.id) + get_filters_by_string(field.name)


def get_bad_field_filters(field: Field) -> list:
    return get_bad_filters_by_string(field.id) + get_bad_filters_by_string(field.name)


def get_filters_by_string(value: str) -> list:
    return [
        "",
        " ",
        value[0],
        value[0].upper(),
        value[:-1],
        value,
        value.lower(),
        value.upper(),
        value.swapcase(),
        value + " " * 3,
        " " * 3 + value,
        " " * 3 + value + " " * 3,
    ]


def get_bad_filters_by_string(value: str) -> list:
    return ["-1-1", value + "-1", "-1" + value, 2 * value, value[1:]]

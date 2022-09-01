import logging
from datetime import datetime, timedelta

import loguru
import pytest

from api.internal.db.models import Competition, Field, Participation, Request, User
from api.internal.db.models.user import Permissions


def pytest_configure(config):
    loguru.logger.disable("")


AFTER_NOW = [
    timedelta(seconds=1),
    timedelta(minutes=1),
    timedelta(hours=1),
    timedelta(days=1),
    timedelta(days=32),
    timedelta(days=365),
]

BEFORE_NOW = [-delta for delta in AFTER_NOW]


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
def teacher() -> User:
    return User.objects.create(
        name="Lexa",
        surname="Pro",
        permission=Permissions.TEACHER,
    )


@pytest.fixture(scope="function")
def another_teacher() -> User:
    return User.objects.create(
        name="Igor",
        surname="Qwerty",
        permission=Permissions.TEACHER,
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
    string = time.strftime("%Y-%m-%dT%H:%M:%S")

    if time.microsecond > 0:
        string += f".{str(time.microsecond // 1000).zfill(3)}Z"
    else:
        string += "Z"

    return string

import logging
from datetime import datetime, timedelta
from unittest.mock import Mock, patch

import pytest
from google.oauth2 import id_token
from vk import API

from api.internal.db.models import Competition, DefaultValue, Field, Request, User
from api.internal.db.models.field import FieldTypes
from api.internal.db.models.user import Permissions


def pytest_configure(config):
    logging.disable()


AFTER_NOW = (
    timedelta(microseconds=1),
    timedelta(milliseconds=1),
    timedelta(seconds=1),
    timedelta(minutes=1),
    timedelta(hours=1),
    timedelta(days=1),
    timedelta(days=32),
    timedelta(days=365),
)

BEFORE_NOW = tuple(-delta for delta in AFTER_NOW)

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


@pytest.fixture(scope="function")
def user() -> User:
    return User.objects.create(
        name="Pachka",
        surname="Pupkin",
        patronymic="Pro",
        permission=Permissions.DEFAULT,
        email="123@123",
        phone="+78005553535",
        city="Rezh",
        region="Topchik reg",
        school="First",
        school_class="10 Z",
        vkontakte_id="1337",
        google_id="228",
        telegram_id="1337228",
    )


@pytest.fixture(scope="function")
def another() -> User:
    return User.objects.create(
        name="Polka",
        surname="Popolka",
        patronymic="Tankist",
        permission=Permissions.DEFAULT,
        email="222222222222222@mail.com",
        phone="+79321295838",
        city="Moscow",
        region="Mo",
        school="Xz",
        school_class="228 Z",
        vkontakte_id="1",
        google_id="1",
        telegram_id="1",
    )


@pytest.fixture(scope="function")
def admin() -> User:
    return User.objects.create(
        name="Ksusha",
        surname="Grechka",
        patronymic="What",
        permission=Permissions.ADMIN,
        email="aaaaaaa@aaaaa",
        phone="+79999999999",
        region="a",
        city="a",
        school="Second",
        school_class="1 I",
        vkontakte_id="9999",
        google_id="999",
        telegram_id="999999999",
    )


@pytest.fixture(scope="function")
def another_admin() -> User:
    return User.objects.create(
        name="OPA",
        surname="OPA-OPA",
        patronymic="asdf",
        permission=Permissions.ADMIN,
        email="bbbbbbbb@aaaaa",
        phone="+78888888888",
        region="ab",
        city="ab",
        school="asdfasdcx",
        school_class="1 aaa",
        vkontakte_id="8888888888",
        google_id="888888888",
        telegram_id="888888888",
    )


@pytest.fixture(scope="function")
def super_admin() -> User:
    return User.objects.create(
        name="Qwerty",
        surname="Ytrewq",
        patronymic="Qawa",
        permission=Permissions.SUPER_ADMIN,
        email="qwwerty@qwerty",
        phone="+70707070707",
        city="q",
        region="Opa",
        school="Unknown",
        school_class="10000 Z",
        vkontakte_id="111111",
        google_id="111",
        telegram_id="11111111111111",
    )


@pytest.fixture(scope="function")
def competition() -> Competition:
    return Competition.objects.create(
        name="babies",
        started_at=datetime(1337, 2, 28),
        registration_before=datetime(1337, 3, 28),
        end_at=datetime(2022, 12, 12),
        persons_amount=1,
    )


@pytest.fixture(scope="function")
def another_competition() -> Competition:
    return Competition.objects.create(
        name="OPA",
        started_at=datetime(2002, 2, 28),
        registration_before=datetime(2001, 3, 28),
        end_at=datetime(2013, 12, 12),
        persons_amount=1,
    )


@pytest.fixture(scope="function")
def user_request(user: User, competition: Competition) -> Request:
    return Request.objects.create(owner=user, competition=competition)


@pytest.fixture(scope="function")
def field() -> Field:
    field = Field.objects.create(id="text_field", name="TextField", type=0)

    DefaultValue.objects.create(field=field, value="ABOBA")

    return field


@pytest.fixture(scope="function")
def another_field() -> Field:
    return Field.objects.create(id="checkbox", name="Checkbox", type=1)


@pytest.fixture(scope="function")
def vk_api() -> API:
    api = patch("api.internal.auth.domain.services.API").start()

    instance = Mock()
    instance.account.getProfileInfo.return_value = Mock()

    api.return_value = instance

    return instance


@pytest.fixture(scope="function")
def google_api() -> id_token:
    api = patch("api.internal.auth.domain.services.google_id_token").start()

    api.verify_oauth2_token = Mock()

    return api


def get_bad_admin_ids(user: User, admin: User, super_admin: User) -> list:
    return [[], [-1], [user.id], [super_admin.id], [user.id, admin.id], [admin.id, admin.id], [user.id, user.id]]


def get_bad_field_ids(field: Field) -> list:
    return [[], ["unknown"], ["unknown", field.id], ["unknown", "unknwon"], [field.id, field.id]]


def get_filters_by_name(competition: Competition) -> list:
    return ["", competition.name[0], competition.name[:2], competition.name[:-1], competition.name, None]


def get_bad_filters_by_name(competition: Competition) -> list:
    return [" ", "-1", competition.name + " ", competition.name + "a", " " + competition.name]

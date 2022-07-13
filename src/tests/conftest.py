import logging

import pytest

from api.internal.db.models import User
from api.internal.db.models.user import Permissions


def pytest_configure(config):
    logging.disable()


@pytest.fixture(scope="function")
def user() -> User:
    return User.objects.create(
        name="Pachka",
        surname="Pupkin",
        patronymic="Pro",
        permission=Permissions.DEFAULT,
        email="123@123",
        phone="+78005553535",
        region="Topchik reg",
        school="First",
        school_class="10 Z",
        vkontakte_id="1337",
        google_id="228",
        telegram_id="1337228",
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
        region="Moscow",
        school="Second",
        school_class="1 I",
        vkontakte_id="9999",
        google_id="999",
        telegram_id="999999999",
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
        region="Opa",
        school="Unknown",
        school_class="10000 Z",
        vkontakte_id="111111",
        google_id="111",
        telegram_id="11111111111111",
    )

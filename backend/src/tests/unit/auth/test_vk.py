from unittest.mock import Mock

import pytest
from vk import API
from vk.exceptions import VkException

from api.internal.db.models import User
from api.internal.db.repositories import vk_repo
from api.internal.socials.services import VKAuth


@pytest.mark.unit
@pytest.mark.django_db
def test_signin(vk_api: API) -> None:
    vk_data = {"id": 228, "first_name": "Top", "last_name": "Strelok"}
    vk_api.account.getProfileInfo.return_value = vk_data

    actual = VKAuth(Mock(), vk_repo).signin()

    assert actual is not None
    assert actual.vkontakte_id == vk_data["id"]
    assert actual.name == vk_data["first_name"]
    assert actual.surname == vk_data["last_name"]
    assert User.objects.count() == 1

    vk_api.account.getProfileInfo.side_effect = VkException()
    assert VKAuth(Mock(), vk_repo).signin() is None
    assert User.objects.count() == 1


@pytest.mark.unit
@pytest.mark.django_db
def test_linking(vk_api: API, user: User) -> None:
    auth = VKAuth(Mock(), vk_repo)

    vk_api.account.getProfileInfo.side_effect = VkException()
    assert auth.link(user.id) is None
    assert User.objects.get(pk=user.pk).vkontakte_id == user.vkontakte_id

    vk_data = {"id": "228", "first_name": "Top", "last_name": "Strelok"}
    vk_api.account.getProfileInfo.return_value = vk_data
    vk_api.account.getProfileInfo.side_effect = None

    assert auth.link(-1) is False

    assert auth.link(user.id) is True
    assert User.objects.get(pk=user.pk).vkontakte_id == vk_data["id"]


@pytest.mark.unit
@pytest.mark.django_db
def test_unlinking(user: User) -> None:
    auth = VKAuth(Mock(), vk_repo)

    assert auth.unlink(-1) is False
    user.refresh_from_db()
    assert user.vkontakte_id is not None

    assert auth.unlink(user.id) is True
    user.refresh_from_db()
    assert user.vkontakte_id is None

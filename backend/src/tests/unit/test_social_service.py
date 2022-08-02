import pytest
from google.oauth2 import id_token
from vk import API
from vk.exceptions import VkException

from api.internal.auth.domain.services import SocialService
from api.internal.db.models import User
from api.internal.db.repositories import google_repo, vkontakte_repo

service = SocialService(vkontakte_repo, google_repo)


# VKONTAKTE


@pytest.mark.unit
@pytest.mark.django_db
def test_creating_user_from_vkontakte(vk_api: API) -> None:
    vk_data = {"id": 228, "first_name": "Top", "last_name": "Strelok"}
    vk_api.account.getProfileInfo.return_value = vk_data

    actual = service.try_get_or_create_user_from_vkontakte("")

    assert actual is not None
    assert actual.vkontakte_id == vk_data["id"]
    assert actual.name == vk_data["first_name"]
    assert actual.surname == vk_data["last_name"]
    assert User.objects.count() == 1


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_existed_user_from_vkontakte(vk_api: API, user: User) -> None:
    vk_data = {"id": user.vkontakte_id, "first_name": user.name.swapcase(), "last_name": user.surname.swapcase()}
    vk_api.account.getProfileInfo.return_value = vk_data

    actual = service.try_get_or_create_user_from_vkontakte("")

    assert actual is not None
    assert actual == user
    assert User.objects.count() == 1


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_none_from_vkontakte(vk_api: API) -> None:
    vk_api.account.getProfileInfo.side_effect = VkException()

    actual = service.try_get_or_create_user_from_vkontakte("")

    assert actual is None
    assert User.objects.count() == 0


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_vkontakte_id__unknown_user(vk_api: API, user: User) -> None:
    vk_api.account.getProfileInfo.side_effect = VkException()

    actual = service.try_get_vkontakte_id("")

    assert actual is None


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_vkontakte_id(vk_api: API, user: User) -> None:
    vk_data = {"id": user.vkontakte_id}
    vk_api.account.getProfileInfo.return_value = vk_data

    actual = service.try_get_vkontakte_id("")

    assert actual == vk_data["id"]


# GOOGLE


@pytest.mark.unit
@pytest.mark.django_db
def test_creating_user_from_google(google_api: id_token) -> None:
    google_data = {"sub": 228, "given_name": "Top", "family_name": "Strelok"}
    google_api.verify_oauth2_token.return_value = google_data

    actual = service.try_get_or_create_user_from_google("", "")

    assert actual is not None
    assert actual.name == google_data["given_name"]
    assert actual.surname == google_data["family_name"]
    assert User.objects.count() == 1


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_user_from_google(google_api: id_token, user: User) -> None:
    google_data = {"sub": user.google_id, "given_name": user.name.swapcase(), "family_name": user.surname.swapcase()}
    google_api.verify_oauth2_token.return_value = google_data

    actual = service.try_get_or_create_user_from_google("", "")

    assert actual is not None
    assert actual == user


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_none_from_google(google_api: id_token) -> None:
    google_api.verify_oauth2_token.side_effect = ValueError()

    actual = service.try_get_or_create_user_from_google("", "")

    assert actual is None
    assert User.objects.count() == 0


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_google_id__unknown_user(google_api: id_token, user: User) -> None:
    google_api.verify_oauth2_token.side_effect = ValueError()

    actual = service.try_get_google_id("", "")

    assert actual is None


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_google_id(google_api: id_token, user: User) -> None:
    google_data = {"sub": user.google_id, "given_name": user.name.swapcase(), "family_name": user.surname.swapcase()}
    google_api.verify_oauth2_token.return_value = google_data

    actual = service.try_get_google_id("", "")

    assert actual == google_data["sub"]

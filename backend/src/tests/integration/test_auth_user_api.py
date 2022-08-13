import hashlib
import hmac
from datetime import timedelta
from typing import Optional
from unittest.mock import Mock, patch as mock_patch

import pytest
from django.conf import settings
from django.forms import model_to_dict
from django.test import Client
from django.utils.timezone import now

from api.internal.db.models import Competition, Field, FormValue, Participation, Request, User
from tests.integration.conftest import (
    EMAIL__IS_CORRECT,
    INSTITUTION__IS_CORRECT,
    PHONE__IS_CORRECT,
    assert_200,
    assert_401,
    assert_422,
    assert_access,
    assert_validation_error,
    get,
    patch,
    put,
)


CURRENT = "/users/current"
PROFILE = CURRENT + "/profile"
FORM_VALUES = CURRENT + "/form-values"
LINK_SOCIAL = CURRENT + "/link-{social}"
UNLINK_SOCIAL = CURRENT + "/unlink-{social}"


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_profile(
    client: Client,
    user: User,
    user_token: str,
) -> None:
    response = get(client, PROFILE, user_token)

    expected = {
        "id": user.id,
        "name": user.name,
        "surname": user.surname,
        "patronymic": user.patronymic,
        "permission": user.permission,
        "email": user.email,
        "phone": user.phone,
        "city": user.city,
        "region": user.region,
        "institution_type": user.institution_type,
        "institution_name": user.institution_name,
        "institution_faculty": user.institution_faculty,
        "institution_course": user.institution_course,
        "vkontakte_id": user.vkontakte_id,
        "google_id": user.google_id,
        "telegram_id": user.telegram_id,
    }
    assert response.status_code == 200
    assert response.json() == expected


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting_profile(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(
        lambda token: get(client, PROFILE, token), [user_token, admin_token, super_admin_token], []
    )


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating_profile(
    client: Client,
    user: User,
    user_token: str,
) -> None:
    body = get_body_for_updating()
    body["email"] = None

    response = put(client, PROFILE, user_token, body)
    assert_200(response)
    assert_updating(user, body)

    for key in list(body.keys()):
        del body[key]

        response = put(client, PROFILE, user_token, body)
        assert_validation_error(response)
        assert_not_updating(user)


@pytest.mark.integration
@pytest.mark.django_db
def test_access_updating_profile(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(
        lambda token: put(client, PROFILE, token), [user_token, admin_token, super_admin_token], []
    )


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(["value", "is_correct"], EMAIL__IS_CORRECT)
def test_updating_email(client: Client, user: User, user_token: str, value: Optional[str], is_correct: bool) -> None:
    body = get_body_for_updating()
    body["email"] = value

    response = put(client, PROFILE, user_token, body)

    if is_correct:
        assert_200(response)
        assert_updating(user, body)
    else:
        assert_validation_error(response)
        assert_not_updating(user)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_email__already_exists(
    client: Client, user: User, admin: User, user_token: str, admin_token: str
) -> None:
    body = get_body_for_updating()

    admin.email = body["email"] = "theexgamer@mail.ru"
    admin.save(update_fields=["email"])

    assert_422(
        put(client, PROFILE, user_token, body),
        error="bad email",
        details="The email already exists",
    )
    assert_not_updating(user)

    assert_200(put(client, PROFILE, admin_token, body))
    assert_updating(admin, body)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(
    ["value", "is_correct"],
    PHONE__IS_CORRECT,
)
def test_updating_phone(client: Client, user: User, user_token: str, value: Optional[str], is_correct: bool) -> None:
    body = get_body_for_updating()
    body["phone"] = value

    response = put(client, PROFILE, user_token, body)

    if is_correct:
        assert_200(response)

        actual = User.objects.get(pk=user.pk).phone
        assert len(actual) == 12
        assert actual[0] == "+"
        assert all(map(str.isdigit, actual[1:])) is True
    else:
        assert_validation_error(response)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(
    ["value", "is_correct"],
    INSTITUTION__IS_CORRECT,
)
def test_updating_institution_type(
    client: Client, user: User, user_token: str, value: Optional[str], is_correct: bool
) -> None:
    body = get_body_for_updating()
    body["institution_type"] = value

    response = put(client, PROFILE, user_token, body)

    if is_correct:
        assert_200(response)
        assert_updating(user, body)
    else:
        assert_validation_error(response)
        assert_not_updating(user)


def assert_updating(user: User, body: dict) -> None:
    not_updated = ["id", "permission", "vkontakte_id", "google_id", "telegram_id"]
    actual = User.objects.get(pk=user.pk)

    assert model_to_dict(actual, exclude=not_updated) == body
    assert model_to_dict(actual, fields=not_updated) == model_to_dict(user, fields=not_updated)


def assert_not_updating(user: User) -> None:
    assert User.objects.get(pk=user.pk) == user


def get_body_for_updating() -> dict:
    return {
        "name": "Pety",
        "surname": "Petrov",
        "patronymic": "Petrovich",
        "email": "pochta123@gmail.com",
        "phone": "+79221297838",
        "city": "Yekaterinburg",
        "region": "Sverdlovsk region",
        "institution_type": "school",
        "institution_name": "First school",
        "institution_faculty": None,
        "institution_course": "1 class",
    }


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_last_form_values(
    client: Client,
    user: User,
    user_token: str,
    field: Field,
    another_field: Field,
    competition: Competition,
    another_competition: Competition,
) -> None:
    competition.fields.add(field)
    another_competition.fields.add(field, another_field)

    part_1 = Participation.objects.create(
        request=Request.objects.create(owner=user, competition=competition), user=user
    )
    part_2 = Participation.objects.create(
        request=Request.objects.create(owner=user, competition=another_competition), user=user
    )
    FormValue.objects.create(participation=part_1, field=field, value="123")
    expected_1 = FormValue.objects.create(participation=part_1, field=another_field, value="678")
    expected_2 = FormValue.objects.create(participation=part_2, field=field, value="456")

    response = get(
        client,
        FORM_VALUES + f"?field_id={field.id}&field_id={another_field.id}&field_id=unknown",
        user_token,
    )

    assert response.status_code == 200
    assert sorted(response.json(), key=lambda x: x["id"]) == sorted(
        map(lambda x: {"id": x.field.id, "value": x.value}, [expected_1, expected_2]), key=lambda x: x["id"]
    )

    FormValue.objects.filter(field=field).delete()
    for field_id in ["", "unknown", field.id]:
        response = get(client, FORM_VALUES + f"?field_id={field_id}", user_token)
        assert response.status_code == 200
        assert response.json() == []

    assert get(client, FORM_VALUES, user_token).status_code == 422


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting_last_form_values(
    client: Client, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    assert_access(
        lambda token: get(client, FORM_VALUES, token), [user_token, admin_token, super_admin_token], []
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_linking_vkontakte(client: Client, user: User, user_token: str, admin_token: str) -> None:
    app_id = settings.VKONTAKTE_APP_ID = "1337"
    app_secret = settings.VKONTAKTE_APP_SECRET_KEY = "very_secret"
    social_id = 1337228

    body = {
        "uid": social_id,
        "first_name": "Petr",
        "last_name": "Ivanov",
        "hash": hashlib.md5((app_id + str(social_id) + app_secret).encode()).hexdigest(),
    }
    uri = LINK_SOCIAL.format(social="vkontakte")

    assert_linking_social(client, uri, body, social_id, "vkontakte_id", user, user_token, admin_token)

    for uid, hash_ in [[228, body["hash"]], [social_id, "invalid"], [228, "invalid"]]:
        body["uid"] = uid
        body["hash"] = hash_
        assert_422(patch(client, uri, user_token, body), error="bad credentials", details="Invalid credentials")


@pytest.mark.integration
@pytest.mark.django_db
def test_linking_google(client: Client, user: User, user_token: str, admin_token: str) -> None:
    google_data = {"sub": 228, "given_name": "Top", "family_name": "Strelok"}

    api = mock_patch("api.internal.socials.services.google_id_token").start()
    api.verify_oauth2_token = Mock(return_value=google_data)

    body, uri = {"id_token": "value"}, LINK_SOCIAL.format(social="google")

    assert_linking_social(client, uri, body, google_data["sub"], "google_id", user, user_token, admin_token)

    api.verify_oauth2_token = Mock(side_effect=ValueError())
    assert_422(patch(client, uri, user_token, body), error="bad credentials", details="Invalid credentials")


@pytest.mark.integration
@pytest.mark.django_db
def test_linking_telegram(client: Client, user: User, user_token: str, admin_token: str) -> None:
    uri = LINK_SOCIAL.format(social="telegram")
    hmac = mock_patch("api.internal.socials.services.hmac").start()

    body = {
        "id": 1337228,
        "first_name": "Pety",
        "last_name": "Ivanov",
        "username": "tankist",
        "photo_url": "https://worldofnoobs.com/pety_tankist.jpg",
        "auth_date": str(int((now() + timedelta(days=10)).timestamp())),
        "hash": "super_hash",
    }
    instance = Mock()
    instance.hexdigest.return_value = body["hash"]
    hmac.new.return_value = instance

    assert_linking_social(client, uri, body, body["id"], "telegram_id", user, user_token, admin_token)

    without_body = body.copy()
    for key in ["last_name", "username", "photo_url"]:
        del without_body[key]
        assert_linking_social(client, uri, body, body["id"], "telegram_id", user, user_token, admin_token)

    for key in ["id", "first_name", "auth_date", "hash"]:
        without_body = body.copy()
        del without_body[key]
        assert_validation_error(patch(client, uri, user_token, without_body))
        assert User.objects.get(pk=user.pk) == user

    instance.hexdigest.return_value = body["hash"][::-1]
    assert_422(patch(client, uri, user_token, body), error="bad credentials", details="Invalid credentials")
    assert User.objects.get(pk=user.pk) == user


def assert_linking_social(
    client: Client,
    uri: str,
    body: dict,
    social_id: int,
    social_field: str,
    user: User,
    user_token: str,
    admin_token: str,
) -> None:
    assert_validation_error(patch(client, uri, user_token, {}))

    for _ in range(2):
        assert_200(patch(client, uri, user_token, body))
        actual = User.objects.get(pk=user.pk)
        assert model_to_dict(actual, exclude=[social_field]) == model_to_dict(user, exclude=[social_field])
        assert model_to_dict(actual, fields=[social_field])[social_field] == str(social_id)

    response = patch(client, uri, admin_token, body)
    assert_422(response, error="bad social id", details="Social id already exists")


@pytest.mark.integration
@pytest.mark.django_db
def test_unlinking_vkontakte(client: Client, user: User, user_token: str) -> None:
    assert_unlinking_social(client, UNLINK_SOCIAL.format(social="vkontakte"), "vkontakte_id", user, user_token)


@pytest.mark.integration
@pytest.mark.django_db
def test_unlinking_google(client: Client, user: User, user_token: str) -> None:
    assert_unlinking_social(client, UNLINK_SOCIAL.format(social="google"), "google_id", user, user_token)


@pytest.mark.integration
@pytest.mark.django_db
def test_unlinking_telegram(client: Client, user: User, user_token: str) -> None:
    assert_unlinking_social(client, UNLINK_SOCIAL.format(social="telegram"), "telegram_id", user, user_token)


def assert_unlinking_social(client: Client, uri: str, social_field: str, user: User, user_token: str) -> None:
    error, details = "socials_amount", "Min amount of socials is 1"

    assert_422(patch(client, uri, user_token), error=error, details=details)

    User.objects.filter(pk=user.pk).update(**{social_field: "228"})
    assert_422(patch(client, uri, user_token), error=error, details=details)
    assert model_to_dict(User.objects.get(pk=user.pk), fields=[social_field])[social_field] == "228"

    user.vkontakte_id = "228"
    user.google_id = "338"
    user.telegram_id = "448"
    user.save(update_fields=["vkontakte_id", "google_id", "telegram_id"])
    for _ in range(2):
        assert_200(patch(client, uri, user_token))

        actual = User.objects.get(pk=user.pk)
        assert model_to_dict(actual, exclude=[social_field]) == model_to_dict(user, exclude=[social_field])
        assert model_to_dict(actual, fields=[social_field])[social_field] is None


@pytest.mark.integration
@pytest.mark.django_db
def test_access_linking_and_unlinking_social(
    client: Client, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    token_access = [user_token, admin_token, super_admin_token]

    for social in ["vkontakte", "google", "telegram"]:
        assert_access(lambda token: patch(client, LINK_SOCIAL.format(social=social), token), token_access, [])
        assert_access(lambda token: patch(client, UNLINK_SOCIAL.format(social=social), token), token_access, [])

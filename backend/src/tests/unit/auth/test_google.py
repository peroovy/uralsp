from unittest.mock import Mock

import pytest
from google.oauth2 import id_token

from api.internal.auth.domain.social import GoogleAuth
from api.internal.db.models import User
from api.internal.db.repositories import google_repo


@pytest.mark.unit
@pytest.mark.django_db
def test_signin(google_api: id_token) -> None:
    google_data = {"sub": "228", "given_name": "Top", "family_name": "Strelok"}
    google_api.verify_oauth2_token.return_value = google_data

    auth = GoogleAuth(Mock(), google_repo)
    actual = auth.signin()

    assert actual is not None
    assert actual.google_id == google_data["sub"]
    assert actual.name == google_data["given_name"]
    assert actual.surname == google_data["family_name"]
    assert User.objects.count() == 1

    google_api.verify_oauth2_token.side_effect = ValueError()
    assert auth.signin() is None
    assert User.objects.count() == 1


@pytest.mark.unit
@pytest.mark.django_db
def test_linking(google_api: id_token, user: User) -> None:
    auth = GoogleAuth(Mock(), google_repo)

    google_api.verify_oauth2_token.side_effect = ValueError()
    assert auth.link(user.id) is None
    assert User.objects.get(pk=user.pk).google_id == user.google_id

    google_data = {"sub": "228", "given_name": "Top", "family_name": "Strelok"}
    google_api.verify_oauth2_token.return_value = google_data
    google_api.verify_oauth2_token.side_effect = None

    assert auth.link(-1) is False

    assert auth.link(user.id) is True
    assert User.objects.get(pk=user.pk).google_id == google_data["sub"]


@pytest.mark.unit
@pytest.mark.django_db
def test_unlinking(user: User) -> None:
    auth = GoogleAuth(Mock(), google_repo)

    assert auth.unlink(-1) is False
    user.refresh_from_db()
    assert user.google_id is not None

    assert auth.unlink(user.id) is True
    user.refresh_from_db()
    assert user.google_id is None

from typing import Optional

import pytest
from django.forms import model_to_dict
from django.test import Client

from api.internal.db.models import Competition, DefaultValue, Field, FormValue, Participation
from tests.integration.conftest import assert_200, assert_404, assert_422, assert_access, delete, get, post, put

FIELDS = "/fields"
FIELD = "/fields/{id}"


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting_fields(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(lambda token: get(client, FIELDS, token), [None, user_token, admin_token, super_admin_token], [])


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_fields(client: Client, field: Field, another_field: Field) -> None:
    response = get(client, FIELDS)
    assert response.status_code == 200
    actual = sorted(response.json(), key=lambda x: x["id"])
    expected = sorted([get_expected(f) for f in [field, another_field]], key=lambda x: x["id"])
    assert actual == expected

    Field.objects.all().delete()
    response = get(client, FIELDS)
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["search", "is_found"],
    [
        ["P", True],
        ["p", True],
        ["  pas  ", True],
        ["  pas or  ", False],
        ["  passport or  ", True],
        ["  pass port or  ", False],
        ["  passport" + 2 * " " + "or  ", False],
        [" PASSPORT OR LISENSE ", True],
        ["D", True],
        ["d", True],
        ["doc", True],
        ["doc id", False],
        [" doc_id  ", True],
        [" DOC_ID  ", True],
        ["unknown", False],
        [" unknown ", False],
        [None, True],
    ],
)
def test_filtering(client: Client, search: Optional[str], is_found: bool) -> None:
    field = Field.objects.create(id="doc_id", name="Passport or lisense", type=100)

    response = get(client, FIELDS + f"?search={search or ''}")
    assert response.status_code == 200
    assert response.json() == ([get_expected(field)] if is_found else [])


@pytest.mark.integration
@pytest.mark.django_db
def test_access_creating(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(lambda token: post(client, FIELDS, token), [super_admin_token], [user_token, admin_token])


@pytest.mark.integration
@pytest.mark.django_db
def test_creating(client: Client, super_admin_token: str) -> None:
    body = {
        "id": "unique_id",
        "name": "NAME",
        "type": 10,
        "is_required": True,
        "is_visible": False,
        "default_values": ["1", "2", "3"],
    }

    assert_200(post(client, FIELDS, super_admin_token, body))
    assert Field.objects.filter(
        id=body["id"],
        name=body["name"],
        type=body["type"],
        is_required=body["is_required"],
        is_visible=body["is_visible"],
    ).exists()
    for value in body["default_values"]:
        assert DefaultValue.objects.filter(field__id=body["id"], value=value).exists()

    body["name"] = "another_name"
    assert_422(post(client, FIELDS, super_admin_token, body), error="unique id", details="Field id already exists")
    assert not Field.objects.filter(id=body["id"], name=body["name"]).exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting_field(
    client: Client, field: Field, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    assert_access(
        lambda token: get(client, FIELD.format(id=field.id), token),
        [None, user_token, admin_token, super_admin_token],
        [],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_field(client: Client, field: Field) -> None:
    assert_404(get(client, FIELD.format(id=0)), what="field")

    response = get(client, FIELD.format(id=field.id))
    assert response.status_code == 200
    assert response.json() == get_expected(field)


def get_expected(field: Field) -> dict:
    return {
        "id": field.id,
        "name": field.name,
        "type": field.type,
        "is_required": field.is_required,
        "is_visible": field.is_visible,
        "default_values": list(field.default_values.values_list("value", flat=True)),
    }


@pytest.mark.integration
@pytest.mark.django_db
def test_access_updating(
    client: Client, field: Field, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    assert_access(
        lambda token: put(client, FIELD.format(id=field.id), token), [super_admin_token], [user_token, admin_token]
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_updating(client: Client, field: Field, super_admin_token: str) -> None:
    value = DefaultValue.objects.create(field=field, value="333")

    body = {"name": "new name", "type": 1e3, "is_required": False, "is_visible": False, "default_values": []}
    assert_404(put(client, FIELD.format(id=0), super_admin_token, body), what="field")

    for _ in range(2):
        body["default_values"] = ["1", "2"]
        assert_200(put(client, FIELD.format(id=field.id), super_admin_token, body))
        field.refresh_from_db()

        assert not DefaultValue.objects.filter(pk=value.pk).exists()
        for val in body["default_values"]:
            assert DefaultValue.objects.filter(field=field, value=val).exists()

        del body["default_values"]
        assert model_to_dict(field, exclude=["id", "default_values"]) == body

    body["default_values"] = []
    assert_200(put(client, FIELD.format(id=field.id), super_admin_token, body))
    assert not DefaultValue.objects.filter(field=field).exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_access_deleting(
    client: Client, field: Field, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    assert_access(
        lambda token: delete(client, FIELD.format(id=field.id), token), [super_admin_token], [user_token, admin_token]
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_deleting(
    client: Client, field: Field, competition: Competition, participation: Participation, super_admin_token: str
) -> None:
    DefaultValue.objects.create(field=field, value="123")

    assert_404(delete(client, FIELD.format(id=0), super_admin_token), what="field")

    competition.fields.add(field)
    assert_422(
        delete(client, FIELD.format(id=field.id), super_admin_token), error="form", details="The field exists in form"
    )

    competition.fields.clear()
    FormValue.objects.create(participation=participation, field=field, value="123")
    assert_422(
        delete(client, FIELD.format(id=field.id), super_admin_token), error="field value", details="Field value exists"
    )

    FormValue.objects.all().delete()
    assert_200(delete(client, FIELD.format(id=field.id), super_admin_token))
    assert not Field.objects.filter(pk=field.pk).exists()
    assert not DefaultValue.objects.filter(field=field).exists()

    assert_404(delete(client, FIELD.format(id=field.id), super_admin_token), what="field")

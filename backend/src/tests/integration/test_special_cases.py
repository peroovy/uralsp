import pytest
from django.test import Client
from ninja.responses import Response

from api.internal.db.models import Competition, Field, FormValue, Participation
from tests.integration.conftest import get, put

COMPETITION_FIELDS = "/competitions/{id}/form"
REQUEST = "/requests/{id}"


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_competition_field_where_form_value_exists(
    client: Client,
    competition: Competition,
    participation: Participation,
    field: Field,
    another_field: Field,
    super_admin_token: str,
) -> None:
    field.is_required = True
    another_field.is_required = True
    field.save(update_fields=["is_required"])
    another_field.save(update_fields=["is_required"])

    participation.request.competition = competition
    participation.request.save(update_fields=["competition"])

    competition.fields.add(another_field)
    form_value = FormValue.objects.create(participation=participation, field=another_field, value="123")

    for fields in [[field], [another_field], [field, another_field]]:
        response = update_competition_fields(client, competition, super_admin_token, *fields)
        assert response.status_code == 200
        assert sorted(competition.fields.all(), key=lambda f: f.id) == sorted(fields, key=lambda f: f.id)
        assert FormValue.objects.filter(pk=form_value.pk).exists()
        assert not FormValue.objects.filter(participation=participation, field=field).exists()

        response = get_competition_fields(client, competition)
        assert response.status_code == 200
        assert sorted(map(lambda x: x["id"], response.json())) == sorted(map(lambda f: f.id, fields))

        response = get_request(client, participation, super_admin_token)
        assert response.status_code == 200
        form = response.json()["participants"][0]["form"]
        assert form == [{"field_id": form_value.field_id, "value": form_value.value}]

    competition.fields.add(field, another_field)
    assert update_request(client, participation, super_admin_token, another_field).status_code == 422
    assert FormValue.objects.filter(participation__user=participation.user, field=another_field).exists()
    assert not FormValue.objects.filter(participation__user=participation.user, field=field).exists()
    assert update_request(client, participation, super_admin_token, field, another_field).status_code == 200
    assert FormValue.objects.filter(participation__user=participation.user, field=another_field).exists()
    assert FormValue.objects.filter(participation__user=participation.user, field=field).exists()


def update_competition_fields(
    client: Client, competition: Competition, super_admin_token: str, *fields: Field
) -> Response:
    body = {"fields": list(map(lambda f: f.id, fields))}

    return put(client, COMPETITION_FIELDS.format(id=competition.id), super_admin_token, body)


def get_competition_fields(client: Client, competition: Competition) -> Response:
    return get(client, COMPETITION_FIELDS.format(id=competition.id))


def get_request(client: Client, participation: Participation, super_admin_token: str) -> Response:
    return get(client, REQUEST.format(id=participation.request_id), super_admin_token)


def update_request(client: Client, participation: Participation, super_admin_token: str, *fields: Field) -> Response:
    body = {
        "team_name": "a",
        "team": [
            {"user_id": participation.user_id, "form": [{"field_id": field.id, "value": "123"} for field in fields]}
        ],
    }

    return put(client, REQUEST.format(id=participation.request_id), super_admin_token, body)

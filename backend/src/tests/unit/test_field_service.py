from unittest.mock import Mock

import pytest

from api.internal.db.models import DefaultValue, Field, FormValue, Participation, Request, User
from api.internal.fields.domain.entities import FieldSchema, Filters
from api.internal.fields.domain.services import field_service
from tests.conftest import get_bad_field_filters, get_field_filters


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_field(field: Field) -> None:
    assert field_service.get(field.id) == field
    assert field_service.get(-1) is None


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_filtered__without_filters(field: Field, another_field: Field) -> None:
    actual = sorted(field_service.get_filtered(Filters()), key=lambda f: f.id)
    assert actual == sorted([field, another_field], key=lambda f: f.id)


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_filtered(field: Field) -> None:
    filters = Mock()

    for correct_search in get_field_filters(field):
        filters.search = correct_search
        assert field_service.get_filtered(filters) == [field]

    for bad_search in get_bad_field_filters(field):
        filters.search = str(bad_search)
        assert field_service.get_filtered(filters) == []


@pytest.mark.unit
@pytest.mark.django_db
def test_existing(field: Field) -> None:
    assert field_service.exists(field.id) is True
    assert field_service.exists("unknown") is False


@pytest.mark.unit
@pytest.mark.django_db
def test_existing_all(field: Field, another_field: Field) -> None:
    unknown = "unknown"

    assert field_service.exist_all([field.id, another_field.id]) is True

    for bad_fields in [[], [unknown], [field.id, unknown], [unknown, field.id], [unknown, unknown]]:
        assert field_service.exist_all(bad_fields) is False


@pytest.mark.unit
@pytest.mark.django_db
def test_existing_value(field: Field, another_field: Field, participation: Participation) -> None:
    FormValue.objects.create(participation=participation, field=field, value="123")

    assert field_service.exists_value(field.id) is True
    assert field_service.exists_value(another_field.id) is False
    assert field_service.exists_value("-1") is False


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_creating() -> None:
    data = get_field_mock()

    field_service.create(data)

    actual = Field.objects.get(
        id=data.id, name=data.name, type=data.type, is_required=data.is_required, is_visible=data.is_visible
    )
    assert sorted(actual.default_values.values_list("value", flat=True)) == sorted(data.default_values)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating(field: Field) -> None:
    DefaultValue.objects.create(field=field, value="-1")
    data = get_field_mock()

    field_service.update(field, data)

    actual = Field.objects.get(id=field.id)
    assert actual.name == data.name
    assert actual.type == data.type
    assert actual.is_required == data.is_required
    assert actual.is_visible == data.is_visible
    assert sorted(actual.default_values.values_list("value", flat=True)) == sorted(data.default_values)

    data.default_values = []
    field_service.update(field, data)

    assert field.default_values.count() == 0


@pytest.mark.unit
@pytest.mark.django_db
def test_deleting(field: Field, another_field: Field, user: User, user_request: Request) -> None:
    field_service.delete("-1")
    assert Field.objects.count() == 2

    for _ in range(2):
        field_service.delete(field.id)
        assert not Field.objects.filter(pk=field.pk).exists()


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_field_out(field: Field) -> None:
    expected = {
        "id": field.id,
        "name": field.name,
        "type": field.type,
        "is_required": field.is_required,
        "is_visible": field.is_visible,
        "default_values": list(field.default_values.values_list("value", flat=True)),
    }

    assert field_service.get_field_out(field) == FieldSchema(**expected)


def get_field_mock() -> Mock:
    data = Mock()
    data.id = "passport or licence"
    data.name = "ID's"
    data.type = 1337
    data.is_required = False
    data.is_visible = True
    data.default_values = ["aaaa", "ab", "cd"]

    return data

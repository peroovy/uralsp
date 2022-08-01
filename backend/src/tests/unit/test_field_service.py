from unittest.mock import Mock

import pytest

from api.internal.db.models import DefaultValue, Field, FormValue, Participation, Request, User
from api.internal.db.repositories import default_repo, field_repo, form_value_repo
from api.internal.fields.domain.entities import FieldSchema
from api.internal.fields.domain.services import FieldService, OperationStatus
from tests.conftest import get_bad_field_filters, get_field_filters

service = FieldService(field_repo, default_repo, form_value_repo)


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_field(field: Field) -> None:
    assert service.get(field.id) == field
    assert service.get(-1) is None


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_filtered(field: Field) -> None:
    filters = Mock()

    for correct_search in get_field_filters(field):
        filters.search = correct_search
        assert service.get_filtered(filters) == [field]

    for bad_search in get_bad_field_filters(field):
        filters.search = str(bad_search)
        assert service.get_filtered(filters) == []


@pytest.mark.unit
@pytest.mark.django_db
def test_check_existing(field: Field) -> None:
    assert service.exists(field.id) is True
    assert service.exists("unknown") is False


@pytest.mark.unit
@pytest.mark.django_db
def test_check_existing_all(field: Field, another_field: Field) -> None:
    unknown = "unknown"

    assert service.exist_all([field.id, another_field.id]) is True

    for bad_fields in [[], [unknown], [field.id, unknown], [unknown, field.id], [unknown, unknown]]:
        assert service.exist_all(bad_fields) is False


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_creating__id_already_exists(field: Field) -> None:
    data = Mock()
    data.id = field.id

    assert service.create(data) == OperationStatus.BAD_FIELD_ID
    assert Field.objects.filter(id=field.id).count() == 1


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_creating() -> None:
    data = get_field_mock()

    assert service.create(data) == OperationStatus.OK
    actual = Field.objects.get(
        id=data.id, name=data.name, type=data.type, is_required=data.is_required, is_visible=data.is_visible
    )
    assert sorted(actual.default_values.values_list("value", flat=True)) == sorted(data.default_values)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating__unknown_id(field: Field) -> None:
    data = get_field_mock()

    assert service.update("unknown", data) == OperationStatus.BAD_FIELD_ID
    assert Field.objects.get(pk=field.pk) == field


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating(field: Field) -> None:
    DefaultValue.objects.create(field=field, value="-1")
    data = get_field_mock()

    assert service.update(field.id, data) == OperationStatus.OK

    actual = Field.objects.get(id=field.id)
    assert actual.name == data.name
    assert actual.type == data.type
    assert actual.is_required == data.is_required
    assert actual.is_visible == data.is_visible
    assert sorted(actual.default_values.values_list("value", flat=True)) == sorted(data.default_values)

    data.default_values = []
    assert service.update(field.id, data) == OperationStatus.OK
    assert field.default_values.count() == 0


@pytest.mark.unit
@pytest.mark.django_db
def test_deleting(field: Field, another_field: Field, user: User, user_request: Request) -> None:
    FormValue.objects.create(
        participation=Participation.objects.create(request=user_request, user=user),
        field=another_field,
        value="abcdefg",
    )
    assert service.delete(another_field.id) == OperationStatus.FORM_VALUE_EXISTS_ERROR
    assert Field.objects.filter(pk=another_field.pk).exists()

    assert service.delete("unknown") == OperationStatus.BAD_FIELD_ID
    assert Field.objects.count() == 2

    assert service.delete(field.id) == OperationStatus.OK
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

    assert service.get_field_out(field) == FieldSchema(**expected)


def get_field_mock() -> Mock:
    data = Mock()
    data.id = "passport or licence"
    data.name = "ID's"
    data.type = 1337
    data.is_required = False
    data.is_visible = True
    data.default_values = ["aaaa", "ab", "cd"]

    return data

import pytest
from django.http import HttpRequest

from api.internal.db.models import Field, FormValue, Participation, Request, User
from api.internal.db.repositories import default_repo, field_repo, form_value_repo
from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.entities import FieldFilters, FieldSchema, FieldUpdatingIn
from api.internal.fields.domain.services import FieldService
from api.internal.fields.presentation.handlers import FieldHandlers
from api.internal.responses import SuccessResponse
from tests.conftest import get_bad_field_filters, get_field_filters

service = FieldService(field_repo, default_repo, form_value_repo)
handlers = FieldHandlers(service)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_fields(http_request: HttpRequest, field: Field) -> None:
    query = {"search": None}

    for correct in get_field_filters(field):
        query["search"] = correct
        response = handlers.get_fields(http_request, FieldFilters(**query))
        assert len(response) == 1
        assert response[0].dict() == get_expected_dict(field)

    for bad in get_bad_field_filters(field):
        query["search"] = bad
        assert handlers.get_fields(http_request, FieldFilters(**query)) == []


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_field(http_request: HttpRequest, field: Field) -> None:
    with pytest.raises(NotFoundException):
        handlers.get_field(http_request, "unknown")

    assert handlers.get_field(http_request, field.id).dict() == get_expected_dict(field)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_creating(http_request: HttpRequest, field: Field) -> None:
    data = get_expected_dict(field)

    with pytest.raises(UnprocessableEntityException, match=handlers.FIELD_ID_ALREADY_EXISTS_ERROR):
        handlers.create_field(http_request, FieldSchema(**data))
    assert Field.objects.count() == 1

    data["id"] = "new id"
    assert type(handlers.create_field(http_request, FieldSchema(**data))) is SuccessResponse
    assert Field.objects.count() == 2
    assert_updating_field(data)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating(http_request: HttpRequest, field: Field) -> None:
    data = get_expected_dict(field)

    with pytest.raises(NotFoundException):
        handlers.update_field(http_request, "unknown", FieldUpdatingIn(**data))
    assert Field.objects.get(pk=field.pk) == field

    response = handlers.update_field(http_request, field.id, FieldUpdatingIn(**data))
    assert type(response) is SuccessResponse
    assert_updating_field(data)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_deleting(
    http_request: HttpRequest, field: Field, another_field: Field, user_request: Request, user: User
) -> None:
    with pytest.raises(NotFoundException):
        handlers.delete_field(http_request, "unknown")

    FormValue.objects.create(
        participation=Participation.objects.create(request=user_request, user=user),
        field=another_field,
        value="abcdefg",
    )
    with pytest.raises(UnprocessableEntityException, match=handlers.FORM_VALUE_EXISTS_ERROR):
        handlers.delete_field(http_request, another_field.id)
    assert Field.objects.filter(pk=another_field.pk).exists()

    response = handlers.delete_field(http_request, field.id)
    assert type(response) is SuccessResponse
    assert not Field.objects.filter(pk=field.pk).exists()

    with pytest.raises(NotFoundException):
        handlers.delete_field(http_request, field.id)


def assert_updating_field(data: dict) -> None:
    actual = Field.objects.get(id=data["id"])
    assert actual.name == data["name"]
    assert actual.type == data["type"]
    assert actual.is_required == data["is_required"]
    assert actual.is_visible == data["is_visible"]


def get_expected_dict(field: Field) -> dict:
    return {
        "id": field.id,
        "name": field.name,
        "type": field.type,
        "is_required": field.is_required,
        "is_visible": field.is_visible,
        "default_values": list(field.default_values.values_list("value", flat=True)),
    }

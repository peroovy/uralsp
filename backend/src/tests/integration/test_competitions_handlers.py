from datetime import timedelta
from typing import Callable

import freezegun
import pytest
from django.http import HttpRequest
from django.utils.timezone import now, utc
from pydantic import ValidationError

from api.internal.competitions.domain import MIN_PERSONS_AMOUNT
from api.internal.competitions.domain.entities import (
    AdminsIn,
    CompetitionFilters,
    CompetitionIn,
    FormIn,
    RequestTemplateIn,
)
from api.internal.competitions.domain.services import CompetitionService
from api.internal.competitions.presentation.handlers import CompetitionHandlers
from api.internal.db.models import Competition, Field, Request, User
from api.internal.db.repositories import (
    competition_repo,
    default_repo,
    field_repo,
    form_value_repo,
    participation_repo,
    request_repo,
    user_repo,
)
from api.internal.exceptions import ForbiddenException, NotFoundException, UnprocessableEntityException
from api.internal.fields.domain.services import FieldService
from api.internal.requests.domain.services import RequestService
from api.internal.responses import SuccessResponse
from api.internal.users.domain.services import UserService
from tests.conftest import (
    AFTER_NOW,
    BAD_CREATING_DATE_DELTAS,
    BEFORE_NOW,
    get_bad_admin_ids,
    get_bad_field_ids,
    get_bad_filters_by_name,
    get_filters_by_name,
)

competition_service = CompetitionService(competition_repo, user_repo, field_repo)
request_service = RequestService(request_repo, competition_repo, user_repo, participation_repo, form_value_repo)
field_service = FieldService(field_repo, default_repo)
user_service = UserService(user_repo, form_value_repo, request_repo, participation_repo)

handlers = CompetitionHandlers(competition_service, request_service, field_service, user_service)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_all__filtering_by_name(http_request: HttpRequest, competition: Competition) -> None:
    query = {"name": None}

    for search in get_filters_by_name(competition):
        query["name"] = search
        assert_getting_filtered(http_request, query, competition)

    for search in get_bad_filters_by_name(competition):
        query["name"] = search
        assert_not_getting_filtered(http_request, query)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_all__filtering_by_admin(http_request: HttpRequest, competition: Competition, admin: User) -> None:
    query = {"admin": None}
    competition.admins.add(admin)

    query["admin"] = -1
    assert_not_getting_filtered(http_request, query)

    query["admin"] = admin.id
    assert_getting_filtered(http_request, query, competition)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["delta", "opened"],
    [
        [timedelta(0), False],
        *[[delta, True] for delta in AFTER_NOW],
        *[[delta, False] for delta in BEFORE_NOW],
    ],
)
@freezegun.freeze_time(now())
def test_getting_all__filtering_opened(
    http_request: HttpRequest, competition: Competition, delta: timedelta, opened: bool
) -> None:
    competition.registration_before = now() + delta
    competition.save(update_fields=["registration_before"])

    query = {"opened": None}

    query["opened"] = opened
    assert_getting_filtered(http_request, query, competition)

    query["opened"] = not opened
    assert_not_getting_filtered(http_request, query)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["delta", "started"],
    [
        [timedelta(0), True],
        *[[delta, False] for delta in AFTER_NOW],
        *[[delta, True] for delta in BEFORE_NOW],
    ],
)
@freezegun.freeze_time(now())
def test_getting_all__filtering_started(
    http_request: HttpRequest, competition: Competition, delta: timedelta, started: bool
) -> None:
    competition.started_at = now() + delta
    competition.save(update_fields=["started_at"])

    query = {"started": None}

    query["started"] = started
    assert_getting_filtered(http_request, query, competition)

    query["started"] = not started
    assert_not_getting_filtered(http_request, query)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_competition(http_request: HttpRequest, competition: Competition, field: Field) -> None:
    competition.fields.add(field)

    expected = {
        "id": competition.id,
        "name": competition.name,
        "registration_before": competition.registration_before.astimezone(tz=utc),
        "started_at": competition.started_at.astimezone(tz=utc),
        "end_at": competition.end_at.astimezone(tz=utc),
        "persons_amount": competition.persons_amount,
        "request_template": competition.request_template,
        "fields": [
            {
                "id": field.id,
                "name": field.name,
                "type": field.type,
                "is_required": field.is_required,
                "is_visible": field.is_visible,
            }
        ],
    }

    assert handlers.get_competition(http_request, competition.id).dict() == expected


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_competition__unknown_id(http_request: HttpRequest) -> None:
    with pytest.raises(NotFoundException):
        handlers.get_competition(http_request, -1)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_form(http_request: HttpRequest, competition: Competition, field: Field) -> None:
    competition.fields.add(field)

    expected = [
        {
            "id": field.id,
            "name": field.name,
            "type": field.type,
            "is_required": field.is_required,
            "is_visible": field.is_visible,
            "default_values": field.default_values.values_list("value", flat=True),
        }
    ]

    response = handlers.get_form(http_request, competition.id)
    assert len(response) == len(expected) == 1

    response[0].default_values = sorted(response[0].default_values)
    expected[0]["default_values"] = sorted(expected[0]["default_values"])

    assert response == expected


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_form__unknown_competition_id(http_request: HttpRequest) -> None:
    with pytest.raises(NotFoundException):
        handlers.get_form(http_request, -1)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize("amount", range(MIN_PERSONS_AMOUNT))
def test_creating__invalid_persons_amount(http_request: HttpRequest, admin: User, field: Field, amount: int) -> None:
    data = get_creating_data(admin, field)
    data["persons_amount"] = amount

    with pytest.raises(ValidationError):
        handlers.create_competition(http_request, CompetitionIn(**data))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(["registration_before", "started_at", "end_at"], BAD_CREATING_DATE_DELTAS)
@freezegun.freeze_time(now())
def test_creating__invalid_dates(
    http_request: HttpRequest,
    admin: User,
    field: Field,
    registration_before: timedelta,
    started_at: timedelta,
    end_at: timedelta,
) -> None:
    data = get_creating_data(admin, field)
    data["registration_before"] = now() + registration_before
    data["started_at"] = now() + started_at
    data["end_at"] = now() + end_at

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_DATES_ERROR):
        handlers.create_competition(http_request, CompetitionIn(**data))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_creating__invalid_fields(http_request: HttpRequest, admin: User, field: Field) -> None:
    data = get_creating_data(admin, field)

    for fields in get_bad_field_ids(field):
        data["fields"] = fields
        with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_FIELDS_ERROR):
            handlers.create_competition(http_request, CompetitionIn(**data))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_creating__invalid_admins(
    http_request: HttpRequest, user: User, admin: User, super_admin: User, field: Field
) -> None:
    data = get_creating_data(admin, field)

    for admins in get_bad_admin_ids(user, admin, super_admin):
        data["admins"] = admins
        with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_ADMINS_ERROR):
            handlers.create_competition(http_request, CompetitionIn(**data))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_creating(http_request: HttpRequest, admin: User, field: Field) -> None:
    data = get_creating_data(admin, field)

    response = handlers.create_competition(http_request, CompetitionIn(**data))

    assert type(response) is SuccessResponse
    assert_competition(Competition.objects.get(name=data["name"]), data)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating__not_found(http_request: HttpRequest) -> None:
    with pytest.raises(NotFoundException):
        handlers.update_competition(http_request, -1, None)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating__permission_denied(
    http_request: HttpRequest, competition: Competition, user: User, admin: User, another_admin: User, field: Field
) -> None:
    handler = lambda: handlers.update_competition(http_request, competition.id, None)
    assert_permission_denied(handler, http_request, competition, user, admin, another_admin)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize("amount", range(MIN_PERSONS_AMOUNT))
def test_updating__invalid_persons_amount(
    http_request: HttpRequest, competition: Competition, admin: User, field: Field, amount: int
) -> None:
    data = get_creating_data(admin, field)
    data["persons_amount"] = amount

    with pytest.raises(ValidationError):
        handlers.update_competition(http_request, competition.id, CompetitionIn(**data))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(["registration_before", "started_at", "end_at"], BAD_CREATING_DATE_DELTAS)
@freezegun.freeze_time(now())
def test_updating__invalid_dates(
    http_request: HttpRequest,
    competition: Competition,
    admin: User,
    super_admin: User,
    field: Field,
    registration_before: timedelta,
    started_at: timedelta,
    end_at: timedelta,
) -> None:
    http_request.user = super_admin
    data = get_creating_data(admin, field)
    data["registration_before"] = now() + registration_before
    data["started_at"] = now() + started_at
    data["end_at"] = now() + end_at

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_DATES_ERROR):
        handlers.update_competition(http_request, competition.id, CompetitionIn(**data))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating__invalid_fields(http_request: HttpRequest, admin: User, super_admin: User, field: Field) -> None:
    http_request.user = super_admin
    data = get_creating_data(admin, field)

    for fields in get_bad_field_ids(field):
        data["fields"] = fields
        with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_FIELDS_ERROR):
            handlers.create_competition(http_request, CompetitionIn(**data))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating__invalid_admins(
    http_request: HttpRequest, user: User, admin: User, super_admin: User, field: Field
) -> None:
    http_request.user = super_admin
    data = get_creating_data(admin, field)

    for admins in get_bad_admin_ids(user, admin, super_admin):
        data["admins"] = admins
        with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_ADMINS_ERROR):
            handlers.create_competition(http_request, CompetitionIn(**data))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating(
    http_request: HttpRequest,
    super_admin: User,
    competition: Competition,
    admin: User,
    another_admin: User,
    field: Field,
    another_field: Field,
) -> None:
    for user in [admin, super_admin]:
        http_request.user = user
        data = get_creating_data(admin, field)
        competition.admins.clear()
        competition.fields.clear()
        competition.admins.add(admin, another_admin)
        competition.fields.add(field, another_field)

        response = handlers.update_competition(http_request, competition.id, CompetitionIn(**data))

        assert type(response) is SuccessResponse
        assert_competition(Competition.objects.get(pk=competition.pk), data)


@pytest.mark.integration
@pytest.mark.django_db
def test_deleting(http_request: HttpRequest, competition: Competition) -> None:
    with pytest.raises(NotFoundException):
        handlers.delete_competition(http_request, -1)

    assert type(handlers.delete_competition(http_request, competition.id)) is SuccessResponse
    assert Competition.objects.count() == 0

    with pytest.raises(NotFoundException):
        handlers.delete_competition(http_request, competition.id)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_requests_on_competition__not_found(http_request: HttpRequest) -> None:
    with pytest.raises(NotFoundException):
        handlers.get_requests_on_competition(http_request, -1)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_requests_on_competition__permission_denied(
    http_request: HttpRequest, competition: Competition, user: User, admin: User, another_admin: User
) -> None:
    handler = lambda: handlers.get_requests_on_competition(http_request, competition.id)
    assert_permission_denied(handler, http_request, competition, user, admin, another_admin)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_requests_on_competition(
    http_request: HttpRequest, competition: Competition, admin: User, super_admin: User, user_request: Request
) -> None:
    competition.admins.add(admin)
    expected = {
        "id": user_request.id,
        "owner": user_request.owner_id,
        "status": user_request.status,
        "description": user_request.description,
        "created_at": user_request.created_at,
        "participants": sorted(user_request.participants.values_list("id", flat=True)),
    }

    for user in [admin, super_admin]:
        http_request.user = user

        response = handlers.get_requests_on_competition(http_request, competition.id)
        assert len(response) == 1

        actual = response[0].dict()
        actual["participants"] = sorted(actual["participants"])

        assert actual == expected


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_form__not_found_competition(http_request: HttpRequest) -> None:
    with pytest.raises(NotFoundException):
        handlers.update_form(http_request, -1, None)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_form__permission_denied(
    http_request: HttpRequest, competition: Competition, user: User, admin: User, another_admin: User
) -> None:
    handler = lambda: handlers.update_form(http_request, competition.id, None)
    assert_permission_denied(handler, http_request, competition, user, admin, another_admin)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating_form__bad_fields(
    http_request: HttpRequest, competition: Competition, admin: User, super_admin: User, field: Field
) -> None:
    competition.admins.add(admin)

    for user in [admin, super_admin]:
        http_request.user = user

        for fields in get_bad_field_ids(field):
            with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_FIELDS_ERROR):
                handlers.update_form(http_request, competition.id, FormIn(fields=fields))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating_form(
    http_request: HttpRequest,
    competition: Competition,
    admin: User,
    super_admin: User,
    field: Field,
    another_field: Field,
) -> None:
    competition.admins.add(admin)

    for user in [admin, super_admin]:
        http_request.user = user
        competition.fields.clear()
        competition.fields.add(field, another_field)

        body = {"fields": [field.id]}

        response = handlers.update_form(http_request, competition.id, FormIn(**body))
        assert type(response) is SuccessResponse
        assert list(Competition.objects.get(pk=competition.pk).fields.all()) == [field]


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_admins__not_found_competition(http_request: HttpRequest) -> None:
    with pytest.raises(NotFoundException):
        handlers.update_admins(http_request, -1, None)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating_admins__invalid_ids(
    http_request: HttpRequest, competition: Competition, user: User, admin: User, super_admin: User
) -> None:
    for admins in get_bad_admin_ids(user, admin, super_admin):
        body = {"admins": admins}

        with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_ADMINS_ERROR):
            handlers.update_admins(http_request, competition.id, AdminsIn(**body))


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating_admins(http_request: HttpRequest, competition: Competition, admin: User, another_admin: User) -> None:
    competition.admins.add(admin, another_admin)

    body = {"admins": [admin.id]}
    response = handlers.update_admins(http_request, competition.id, AdminsIn(**body))

    assert type(response) is SuccessResponse
    assert list(competition.admins.all()) == [admin]


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_template__not_found_competition(http_request: HttpRequest) -> None:
    with pytest.raises(NotFoundException):
        handlers.update_request_template(http_request, -1, None)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_template__permission_denied(
    http_request: HttpRequest, competition: Competition, user: User, admin: User, another_admin: User
) -> None:
    handler = lambda: handlers.update_request_template(http_request, competition.id, None)
    assert_permission_denied(handler, http_request, competition, user, admin, another_admin)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_template(http_request: HttpRequest, competition: Competition, admin: User, super_admin: User) -> None:
    competition.admins.add(admin)

    for user in [admin, super_admin]:
        http_request.user = user

        for template in [None, "", "ABC"]:
            body = {"request_template": template}
            response = handlers.update_request_template(http_request, competition.id, RequestTemplateIn(**body))

            assert type(response) is SuccessResponse
            assert Competition.objects.get(pk=competition.pk).request_template == template


def assert_getting_filtered(request: HttpRequest, query: dict, expected: Competition) -> None:
    response = handlers.get_competitions(request, CompetitionFilters(**query))
    expected = get_expected_competition_out(expected)
    assert [actual.dict() for actual in response] == [expected]


def assert_not_getting_filtered(request: HttpRequest, query: dict) -> None:
    assert handlers.get_competitions(request, CompetitionFilters(**query)) == []


def assert_permission_denied(
    handler: Callable, http_request: HttpRequest, competition: Competition, user: User, admin: User, another_admin: User
) -> None:
    competition.admins.add(admin)

    for auth_user in [user, another_admin]:
        http_request.user = auth_user
        with pytest.raises(ForbiddenException):
            handler()


def assert_competition(actual: Competition, expected: dict) -> None:
    assert actual.name == expected["name"]
    assert actual.registration_before == expected["registration_before"]
    assert actual.started_at == expected["started_at"]
    assert actual.end_at == expected["end_at"]
    assert actual.persons_amount == expected["persons_amount"]
    assert actual.request_template == expected["request_template"]
    assert sorted(actual.fields.values_list("id", flat=True)) == sorted(expected["fields"])
    assert sorted(actual.admins.values_list("id", flat=True)) == sorted(expected["admins"])


def get_expected_competition_out(competition: Competition) -> dict:
    return {
        "id": competition.id,
        "name": competition.name,
        "registration_before": competition.registration_before.astimezone(tz=utc),
        "started_at": competition.started_at.astimezone(tz=utc),
        "end_at": competition.end_at.astimezone(tz=utc),
        "persons_amount": competition.persons_amount,
        "request_template": competition.request_template,
    }


def get_creating_data(admin: User, field: Field) -> dict:
    return {
        "name": "SUPER PUPER TUPER",
        "registration_before": (now() + timedelta(days=10)).astimezone(utc),
        "started_at": (now() + timedelta(days=20)).astimezone(utc),
        "end_at": (now() + timedelta(days=30)).astimezone(utc),
        "persons_amount": MIN_PERSONS_AMOUNT * 2,
        "request_template": "<field></field>",
        "fields": [field.id],
        "admins": [admin.id],
    }

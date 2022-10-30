from datetime import timedelta
from itertools import combinations_with_replacement, product
from typing import Callable

import freezegun
import pytest
from django.forms import model_to_dict
from django.test import Client
from django.utils.timezone import now
from ninja.responses import Response

from api.internal.db.models import Competition, DefaultValue, Field, FormValue, Participation, Request, User
from tests.conftest import AFTER_NOW, BEFORE_NOW, datetime_to_string
from tests.integration.conftest import (
    assert_404,
    assert_422,
    assert_access,
    assert_not_422_body,
    assert_success_response,
    assert_validation_error,
    delete,
    get,
    patch,
    post,
    put,
)

COMPETITIONS = "/competitions"
COMPETITION = COMPETITIONS + "/{id}"
REQUEST_TEMPLATE = COMPETITION + "/request-template"
ADMINS = COMPETITION + "/admins"
FORM = COMPETITION + "/form"


DATE_DELTAS = [
    [timedelta(milliseconds=1), timedelta(milliseconds=2), timedelta(milliseconds=3), True],
    [timedelta(milliseconds=-3), timedelta(milliseconds=-2), timedelta(milliseconds=-1), True],
    [timedelta(seconds=1), timedelta(seconds=2), timedelta(seconds=3), True],
    [timedelta(days=300), timedelta(days=500), timedelta(days=800), True],
    [timedelta(milliseconds=2), timedelta(milliseconds=2), timedelta(milliseconds=3), False],
    [timedelta(milliseconds=1), timedelta(milliseconds=2), timedelta(milliseconds=2), False],
    [timedelta(milliseconds=2), timedelta(milliseconds=2), timedelta(milliseconds=2), False],
    [timedelta(milliseconds=0), timedelta(milliseconds=2), timedelta(milliseconds=3), True],
    [timedelta(milliseconds=0), timedelta(milliseconds=0), timedelta(milliseconds=3), False],
    [timedelta(milliseconds=0), timedelta(milliseconds=0), timedelta(milliseconds=0), False],
    [timedelta(milliseconds=10), timedelta(milliseconds=0), timedelta(milliseconds=0), False],
    [timedelta(milliseconds=10), timedelta(milliseconds=0), timedelta(milliseconds=20), False],
    [timedelta(milliseconds=10), timedelta(milliseconds=0), timedelta(milliseconds=5), False],
    [timedelta(milliseconds=-10), timedelta(milliseconds=1), timedelta(milliseconds=2), True],
    [timedelta(milliseconds=-10), timedelta(milliseconds=-20), timedelta(milliseconds=2), False],
    [timedelta(milliseconds=-10), timedelta(milliseconds=-20), timedelta(milliseconds=-30), False],
    [timedelta(milliseconds=-10), timedelta(milliseconds=-5), timedelta(milliseconds=-1), True],
    [timedelta(milliseconds=-10), timedelta(milliseconds=-5), timedelta(milliseconds=-6), False],
    [timedelta(milliseconds=-1), timedelta(milliseconds=-1), timedelta(milliseconds=-1), False],
]

PERSONS_AMOUNTS = [
    *product(range(1, 100, 10), [True]),
    *product(range(1), [False]),
    *product(range(0, -100, -10), [False]),
]


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting_competitions(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(
        lambda token: get(client, COMPETITIONS, token), [None, user_token, admin_token, super_admin_token], []
    )


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_getting_all(client: Client, competition: Competition, another_competition: Competition) -> None:
    competition.registration_start = now() - timedelta(days=2)
    competition.registration_end = now() + timedelta(days=2)
    competition.save(update_fields=["registration_start", "registration_end"])

    another_competition.registration_start = now() + timedelta(days=2)
    another_competition.registration_end = now() + timedelta(days=4)
    another_competition.save(update_fields=["registration_start", "registration_end"])

    for uri in ["", "?name="]:
        response = get(client, COMPETITIONS + uri)

        assert response.status_code == 200
        assert sorted(response.json(), key=lambda x: x["id"]) == [
            get_expected_for_filtering(comp) for comp in [competition, another_competition]
        ]


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["name", "is_found"],
    [
        ["t", True],
        ["T", True],
        [" top ", True],
        [" top con", True],
        [" top" + 2 * " " + "contest", False],
        ["PLAYER", False],
        ["player", False],
        [" player ", False],
        ["123", False],
    ],
)
def test_filtering_by_name(
    client: Client, competition: Competition, another_competition: Competition, name: str, is_found: bool
) -> None:
    competition.name = "Top contest for top 7"
    another_competition.name = "qwerwr"
    competition.save(update_fields=["name"])
    another_competition.save(update_fields=["name"])

    response = get(client, COMPETITIONS + f"?name={name}")
    assert response.status_code == 200

    assert response.json() == ([get_expected_for_filtering(competition)] if is_found else [])


@pytest.mark.integration
@pytest.mark.django_db
def test_filtering_by_admin(
    client: Client, admin: User, another_admin: User, competition: Competition, another_competition: Competition
) -> None:
    competition.admins.add(admin)

    for admin_id, expected in {admin.id: [get_expected_for_filtering(competition)], another_admin.id: []}.items():
        response = get(client, COMPETITIONS + f"?admin={admin_id}")
        assert response.status_code == 200
        assert response.json() == expected

    assert_validation_error(get(client, COMPETITIONS + "?admin="))


def assert_bool_filter(client: Client, filter: str, flag: bool, competition: Competition) -> None:
    response = get(client, COMPETITIONS + f"?{filter}={flag}")
    assert response.status_code == 200
    assert response.json() == [get_expected_for_filtering(competition)]

    response = get(client, COMPETITIONS + f"?{filter}={not flag}")
    assert response.status_code == 200
    assert response.json() == []


def get_expected_for_filtering(competition: Competition) -> dict:
    expected = model_to_dict(competition, exclude=["fields", "admins"])

    expected["registration_start"] = datetime_to_string(expected["registration_start"])
    expected["registration_end"] = datetime_to_string(expected["registration_end"])
    expected["started_at"] = datetime_to_string(expected["started_at"])

    return expected


@pytest.mark.integration
@pytest.mark.django_db
def test_access_creating(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(lambda token: post(client, COMPETITIONS, token), [super_admin_token], [user_token, admin_token, None])


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["registration_start_delta", "registration_end_delta", "start_delta", "is_correct"], DATE_DELTAS
)
@freezegun.freeze_time(now())
def test_creating__validation_dates(
    client: Client,
    super_admin_token: str,
    registration_start_delta: timedelta,
    registration_end_delta: timedelta,
    start_delta: timedelta,
    is_correct: bool,
) -> None:
    _test_validation_dates(
        lambda body: post(client, COMPETITIONS, super_admin_token, body),
        registration_start_delta,
        registration_end_delta,
        start_delta,
        is_correct,
    )

    if not is_correct:
        assert not Competition.objects.exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_creating__validation_fields(
    client: Client, admin: User, field: Field, another_field: Field, super_admin_token: str
) -> None:

    Competition.objects.all().delete()


@pytest.mark.integration
@pytest.mark.django_db
def test_creating__validation_admins(
    client: Client,
    user: User,
    admin: User,
    super_admin: User,
    another_admin: User,
    field: Field,
    super_admin_token: str,
) -> None:
    _test_validation_admins(
        lambda body: post(client, COMPETITIONS, super_admin_token, body), user, admin, another_admin, super_admin, field
    )


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_creating(
    client: Client, field: Field, another_field: Field, admin: User, another_admin: User, super_admin_token: str
) -> None:
    body = get_body_for_creating_or_updating()
    body["fields"], body["admins"] = sorted([field.id, another_field.id]), sorted([admin.id, another_admin.id])

    field.is_required = True
    another_field.is_required = False
    field.save(update_fields=["is_required"])
    another_field.save(update_fields=["is_required"])

    assert_success_response(post(client, COMPETITIONS, super_admin_token, body))
    assert_creating_or_updating(Competition.objects.first(), body)


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting(
    client: Client, competition: Competition, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    assert_access(
        lambda token: get(client, COMPETITION.format(id=competition.id), token),
        [None, user_token, admin_token, super_admin_token],
        [],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting(client: Client, competition: Competition, field: Field, another_field: Field, admin: User) -> None:
    assert_404(get(client, COMPETITION.format(id=0)), what="competition")

    competition.fields.add(field)
    competition.admins.add(admin)

    response = get(client, COMPETITION.format(id=competition.id))
    assert response.status_code == 200
    assert response.json() == get_expected_for_getting(competition, field, admin)

    competition.fields.clear()
    competition.fields.add(another_field)
    response = get(client, COMPETITION.format(id=competition.id))
    assert response.status_code == 200
    assert response.json() == get_expected_for_getting(competition, another_field, admin)


def get_expected_for_getting(competition: Competition, field: Field, admin: User) -> dict:
    return {
        "id": competition.id,
        "name": competition.name,
        "registration_start": datetime_to_string(competition.registration_start),
        "registration_end": datetime_to_string(competition.registration_end),
        "started_at": datetime_to_string(competition.started_at),
        "persons_amount": competition.persons_amount,
        "request_template": competition.request_template,
        "link": competition.link,
        "fields": [
            {
                "id": field.id,
                "name": field.name,
                "type": field.type,
                "is_required": field.is_required,
                "is_visible": field.is_visible,
            }
        ],
        "admins": [admin.id],
    }


@pytest.mark.integration
@pytest.mark.django_db
def test_access_updating(
    client: Client, competition: Competition, admin: User, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    body = get_body_for_creating_or_updating()

    assert_access(
        lambda token: put(client, COMPETITION.format(id=competition.id), token, body),
        [super_admin_token],
        [user_token, admin_token, None],
    )

    competition.admins.add(admin)
    assert_access(
        lambda token: put(client, COMPETITION.format(id=competition.id), token, body),
        [admin_token, super_admin_token],
        [user_token, None],
    )


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["registration_start_delta", "registration_end_delta", "start_delta", "is_correct"], DATE_DELTAS
)
@freezegun.freeze_time(now())
def test_updating__validation_dates(
    client: Client,
    competition: Competition,
    field: Field,
    admin: User,
    super_admin_token: str,
    registration_start_delta: timedelta,
    registration_end_delta: timedelta,
    start_delta: timedelta,
    is_correct,
) -> None:
    init_competition_for_validation_in_updating(competition, field, admin)

    _test_validation_dates(
        lambda body: put(client, COMPETITION.format(id=competition.id), super_admin_token, body),
        registration_start_delta,
        registration_end_delta,
        start_delta,
        is_correct,
    )

    assert_not_updating_after_bad_validation(is_correct, competition, field, admin)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating__validation_admins(
    client: Client,
    competition: Competition,
    user: User,
    admin: User,
    another_admin: User,
    super_admin: User,
    field: Field,
    super_admin_token: str,
) -> None:
    _test_validation_admins(
        lambda body: put(client, COMPETITION.format(id=competition.id), super_admin_token, body),
        user,
        admin,
        another_admin,
        super_admin,
        field,
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_updating__validation_fields(
    client: Client, competition: Competition, admin: User, field: Field, another_field: Field, super_admin_token: str
) -> None:
    _test_validation_fields(
        lambda body: put(client, COMPETITION.format(id=competition.id), super_admin_token, body),
        admin,
        field,
        another_field,
    )


def init_competition_for_validation_in_updating(competition: Competition, field: Field, admin: User) -> None:
    competition.fields.add(field)
    competition.admins.add(admin)


def assert_not_updating_after_bad_validation(
    is_correct: bool, competition: Competition, field: Field, admin: User
) -> None:
    if not is_correct:
        assert Competition.objects.get(pk=competition.pk) == competition
        assert list(competition.fields.all()) == [field]
        assert list(competition.admins.all()) == [admin]


def _test_validation_dates(
    func: Callable[[dict], Response],
    registration_start_delta: timedelta,
    registration_end_delta: timedelta,
    start_delta: timedelta,
    is_correct: bool,
) -> None:
    body = get_body_for_creating_or_updating()
    body["registration_start"] = datetime_to_string(now() + registration_start_delta)
    body["registration_end"] = datetime_to_string(now() + registration_end_delta)
    body["started_at"] = datetime_to_string(now() + start_delta)

    error, detail = "bad dates", "Values must be next: registration_start < registration_end < started_at"
    response = func(body)

    if is_correct:
        assert_not_422_body(response, error, detail)
    else:
        assert_422(response, error, detail)


def _test_validation_admins(
    func: Callable[[dict], Response], user: User, admin: User, another_admin: User, super_admin: User, field: Field
) -> None:
    body = get_body_for_creating_or_updating()
    body["fields"] = [field.id]

    error, detail = "bad admins", "Validation admins error"

    for bad_admins in get_bad_admin_ids(user, admin, super_admin):
        body["admins"] = bad_admins
        assert_422(func(body), error, detail)

    for admins in get_correct_admin_ids(admin, another_admin):
        body["admins"] = admins
        assert_not_422_body(func(body), error, detail)


def _test_validation_fields(func: Callable[[dict], Response], admin: User, field: Field, another_field: Field) -> None:
    body = get_body_for_creating_or_updating()
    body["admins"] = [admin.id]

    error, detail = "bad fields", "Validation fields error"

    for bad_fields in get_bad_field_ids(field):
        body["fields"] = bad_fields
        assert_422(func(body), error, detail)

    for fields in get_correct_field_ids(field, another_field):
        body["fields"] = fields
        assert_not_422_body(func(body), error, detail)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating(
    client: Client,
    competition: Competition,
    admin: User,
    another_admin: User,
    user_request: Request,
    participation: Request,
    field: Field,
    another_field: Field,
    super_admin_token: str,
) -> None:
    body = get_body_for_creating_or_updating()

    competition.fields.add(field, another_field)
    value = FormValue.objects.create(participation=participation, field=another_field, value="123")

    competition.admins.add(admin, another_admin)

    assert_404(put(client, COMPETITION.format(id=0), super_admin_token, body), what="competition")
    assert Competition.objects.get(pk=competition.pk) == competition

    for _ in range(2):
        body["fields"], body["admins"] = [field.id], [admin.id]
        assert_success_response(put(client, COMPETITION.format(id=competition.id), super_admin_token, body))
        assert_creating_or_updating(Competition.objects.get(pk=competition.pk), body)
        assert FormValue.objects.filter(pk=value.pk).exists()


def assert_creating_or_updating(actual_competition: Competition, expected: dict) -> None:
    actual = model_to_dict(actual_competition, exclude=["id"])
    actual["registration_start"] = datetime_to_string(actual["registration_start"])
    actual["registration_end"] = datetime_to_string(actual["registration_end"])
    actual["started_at"] = datetime_to_string(actual["started_at"])
    actual["fields"] = sorted(map(lambda f: f.id, actual["fields"]))
    actual["admins"] = sorted(map(lambda usr: usr.id, actual["admins"]))

    assert actual == expected


def get_body_for_creating_or_updating() -> dict:
    now_ = now()

    return {
        "name": "top contest",
        "registration_start": datetime_to_string(now_ + timedelta(days=1)),
        "registration_end": datetime_to_string(now_ + timedelta(days=2)),
        "started_at": datetime_to_string(now_ + timedelta(days=3)),
        "request_template": "<field>first_name</field>",
        "link": "https://worldofnoobs.com/12",
        "persons_amount": 1000,
        "fields": [],
        "admins": [],
    }


@pytest.mark.integration
@pytest.mark.django_db
def test_access_deleting(
    client: Client, competition: Competition, admin: User, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    competition.admins.add(admin)

    assert_access(
        lambda token: delete(client, COMPETITION.format(id=competition.id), token),
        [super_admin_token],
        [user_token, admin_token, None],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_deleting(
    client: Client,
    competition: Competition,
    user_request: Request,
    participation: Participation,
    field: Field,
    super_admin_token: str,
) -> None:
    assert_404(delete(client, COMPETITION.format(id=0), super_admin_token), what="competition")

    field.is_required = True
    field.save(update_fields=["is_required"])

    competition.fields.add(field)

    value = FormValue.objects.create(participation=participation, field=field, value="123")

    assert_success_response(delete(client, COMPETITION.format(id=competition.id), super_admin_token))
    assert not Competition.objects.filter(id=competition.id).exists()
    assert not Request.objects.filter(pk=user_request.pk).exists()
    assert not Participation.objects.filter(pk=participation.pk).exists()
    assert not FormValue.objects.filter(pk=value.pk).exists()

    assert_404(delete(client, COMPETITION.format(id=competition.id), super_admin_token), what="competition")


@pytest.mark.integration
@pytest.mark.django_db
def test_access_updating_request_template(
    client: Client, admin: User, competition: Competition, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    body = get_body_for_creating_or_updating()

    assert_access(
        lambda token: patch(client, REQUEST_TEMPLATE.format(id=competition.id), token, body),
        [super_admin_token],
        [user_token, admin_token, None],
    )

    competition.admins.add(admin)
    assert_access(
        lambda token: patch(client, REQUEST_TEMPLATE.format(id=competition.id), token, body),
        [admin_token, super_admin_token],
        [user_token, None],
    )


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("value", [None, "<html>", "", " ", "123"])
def test_updating_request_template(
    client: Client, competition: Competition, super_admin_token: str, value: str
) -> None:
    body = get_body_for_updating_request_template()
    body["request_template"] = value

    assert_404(patch(client, REQUEST_TEMPLATE.format(id=0), super_admin_token, body), what="competition")

    assert_success_response(patch(client, REQUEST_TEMPLATE.format(id=competition.id), super_admin_token, body))
    assert Competition.objects.get(pk=competition.pk).request_template == body["request_template"]


def get_body_for_updating_request_template() -> dict:
    return {"request_template": "<html>asdfas</html>"}


@pytest.mark.integration
@pytest.mark.django_db
def test_access_updating_admins(
    client: Client, admin: User, competition: Competition, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    body = get_body_for_creating_or_updating()

    competition.admins.add(admin)

    assert_access(
        lambda token: put(client, ADMINS.format(id=competition.id), token, body),
        [super_admin_token],
        [user_token, admin_token, None],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_admins(
    client: Client,
    user: User,
    admin: User,
    another_admin: User,
    super_admin: User,
    competition: Competition,
    super_admin_token: str,
) -> None:
    competition.admins.add(admin, another_admin)

    body = {"admins": []}
    assert_404(put(client, ADMINS.format(id=0), super_admin_token, body), what="competition")

    for bad_admins in get_bad_admin_ids(user, admin, super_admin):
        body["admins"] = bad_admins

        assert_422(
            put(client, ADMINS.format(id=competition.id), super_admin_token, body),
            error="bad admins",
            detail="Validation admins error",
        )
        assert sorted(competition.admins.all(), key=lambda usr: usr.id) == sorted(
            [admin, another_admin], key=lambda usr: usr.id
        )

    for admins in get_correct_admin_ids(admin, another_admin):
        body["admins"] = admins

        assert_success_response(put(client, ADMINS.format(id=competition.id), super_admin_token, body))
        assert sorted(map(lambda usr: usr.id, competition.admins.all())) == sorted(admins)


def get_bad_admin_ids(user: User, admin: User, super_admin: User) -> list:
    return [
        [-1],
        [admin.id, -1],
        [user.id],
        [super_admin.id],
        *combinations_with_replacement([admin.id, user.id, super_admin.id], 2),
    ]


def get_correct_admin_ids(admin: User, another_admin: User) -> list:
    return [[], [admin.id], [another_admin.id], [admin.id, another_admin.id]]


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_form(client: Client, competition: Competition, field: Field, another_field: Field) -> None:
    competition.fields.add(field, another_field)

    DefaultValue.objects.bulk_create(DefaultValue(field=field, value=str(i)) for i in range(2))

    assert_404(get(client, FORM.format(id=0)), what="competition")

    expected = sorted(
        [
            {
                "id": field_.id,
                "name": field_.name,
                "type": field_.type,
                "is_required": field_.is_required,
                "is_visible": field_.is_visible,
                "default_values": list(field_.default_values.values_list("value", flat=True)),
            }
            for field_ in [field, another_field]
        ],
        key=lambda x: x["id"],
    )

    response = get(client, FORM.format(id=competition.id))
    assert response.status_code == 200
    assert sorted(response.json(), key=lambda x: x["id"]) == expected


@pytest.mark.integration
@pytest.mark.django_db
def test_access_updating_form(
    client: Client, admin: User, competition: Competition, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    body = get_body_for_updating_form()

    assert_access(
        lambda token: put(client, FORM.format(id=competition.id), token, body),
        [super_admin_token],
        [user_token, admin_token, None],
    )

    competition.admins.add(admin)
    assert_access(
        lambda token: put(client, FORM.format(id=competition.id), token, body),
        [admin_token, super_admin_token],
        [user_token, None],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_form(
    client: Client,
    competition: Competition,
    user_request: Request,
    participation: Participation,
    field: Field,
    another_field: Field,
    super_admin_token: str,
) -> None:
    competition.fields.add(field, another_field)
    value = FormValue.objects.create(participation=participation, field=field, value="123")

    body = get_body_for_updating_form()
    assert_404(put(client, FORM.format(id=0), super_admin_token, body), what="competition")

    for bad_ids in get_bad_field_ids(field):
        body["fields"] = bad_ids

        assert_422(
            put(client, FORM.format(id=competition.id), super_admin_token, body),
            error="bad fields",
            detail="Validation fields error",
        )
        assert sorted(competition.fields.all(), key=lambda f: f.id) == sorted(
            [field, another_field], key=lambda f: f.id
        )
        assert FormValue.objects.filter(pk=value.pk).exists()

    for ids in get_correct_field_ids(field, another_field):
        body["fields"] = ids

        assert_success_response(put(client, FORM.format(id=competition.id), super_admin_token, body))
        assert sorted(map(lambda f: f.id, competition.fields.all())) == sorted(ids)
        assert FormValue.objects.filter(pk=value.pk).exists()


def get_body_for_updating_form() -> dict:
    return {"fields": []}


def get_bad_field_ids(field: Field) -> list:
    return [[], ["unknown"], ["unknown", field.id], ["unknown", "unknwon"], [field.id, field.id]]


def get_correct_field_ids(field: Field, another_field: Field) -> list:
    return [[field.id], [another_field.id], [field.id, another_field.id]]

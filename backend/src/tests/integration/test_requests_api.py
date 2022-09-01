from datetime import timedelta
from itertools import product
from typing import Callable

import freezegun
import pytest
from django.db.models import Q
from django.test import Client
from django.utils.timezone import now
from ninja.responses import Response

from api.internal.db.models import Competition, Field, FormValue, Participation, Request, User
from api.internal.db.models.request import RequestStatus
from api.internal.db.models.user import Permissions
from tests.conftest import AFTER_NOW, BEFORE_NOW, datetime_to_string
from tests.integration.conftest import (
    assert_200,
    assert_404,
    assert_422,
    assert_access,
    assert_not_200,
    assert_not_422_body,
    assert_validation_error,
    delete,
    get,
    patch,
    post,
    put,
)

REQUESTS = "/requests"
REQUEST = "/requests/{id}"
CANCEL = REQUEST + "/cancel"
PROCESS = REQUEST + "/process"


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting_requests(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(lambda token: get(client, REQUESTS, token), [user_token, admin_token, super_admin_token], [])


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_getting_requests(
    client,
    user: User,
    user_token: str,
    admin_token: str,
    user_request: Request,
    another_user_request: Request,
    participation: Participation,
) -> None:
    response = get(client, REQUESTS, user_token)
    assert response.status_code == 200

    actual = response.json()
    for out in actual:
        out["participants"] = sorted(out["participants"])

    expected = sorted(map(get_request_out, [user_request, another_user_request]), key=lambda x: x["id"])
    actual = sorted(actual, key=lambda x: x["id"])
    assert actual == expected

    response = get(client, REQUESTS, admin_token)
    assert response.status_code == 200
    assert response.json() == []


def get_request_out(request: Request) -> dict:
    return {
        "id": request.id,
        "owner": request.owner_id,
        "competition": request.competition_id,
        "team_name": request.team_name,
        "status": str(request.status),
        "description": request.description,
        "created_at": datetime_to_string(request.created_at),
        "participants": sorted(request.participants.values_list("id", flat=True)),
    }


@pytest.mark.integration
@pytest.mark.django_db
def test_access_creating(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(lambda token: post(client, REQUESTS, token), [user_token, admin_token, super_admin_token], [])


@pytest.mark.integration
@pytest.mark.django_db
def test_creating__unknown_competition(client: Client, user_token: str) -> None:
    body = {"competition": 0, "team_name": "SUPER-PUPER TEAM", "team": []}
    assert_422(post(client, REQUESTS, user_token, body), error="competition", details="Unknown competition")
    assert not Request.objects.exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_creating__request_already_created(
    client: Client, competition: Competition, user: User, user_token: str
) -> None:
    request = Request.objects.create(competition=competition, owner=user)
    error, details = "request", "Request has already created"
    body = {"competition": competition.id, "team_name": "SUPER-PUPER TEAM", "team": []}

    assert_422(post(client, REQUESTS, user_token, body), error, details)
    assert not Request.objects.filter(~Q(id=request.id)).exists()

    user.permission = Permissions.TEACHER
    user.save(update_fields=["permission"])
    assert_not_422_body(post(client, REQUESTS, user_token, body), error, details)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", AFTER_NOW)
@freezegun.freeze_time(now())
def test_creating__competition_registration_has_not_started_yet(
    client: Client, competition: Competition, user_token: str, delta: timedelta
) -> None:
    competition.registration_start = now() + delta
    competition.save(update_fields=["registration_start"])

    body = {"competition": competition.id, "team_name": "SUPER-PUPER TEAM", "team": []}
    assert_422(
        post(client, REQUESTS, user_token, body), error="registration_start", details="Registration has not started yet"
    )
    assert not Request.objects.exists()


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW + [timedelta(0)])
@freezegun.freeze_time(now())
def test_creating__competition_registration_is_over(
    client: Client, competition: Competition, user_token: str, delta: timedelta
) -> None:
    competition.registration_end = now() + delta
    competition.save(update_fields=["registration_end"])

    body = {"competition": competition.id, "team_name": "SUPER-PUPER TEAM", "team": []}
    assert_422(post(client, REQUESTS, user_token, body), error="registration_end", details="Registration is over")
    assert not Request.objects.exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_creating__invalid_users(
    client: Client, user: User, admin: User, super_admin: User, competition: Competition, user_token: str
) -> None:
    _test_invalid_users(lambda body: post(client, REQUESTS, user_token, body), competition, user, admin, super_admin)

    assert not Request.objects.exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_creating__invalid_forms(
    client: Client, user: User, competition: Competition, field: Field, another_field: Field, user_token: str
) -> None:
    _test_invalid_forms(lambda body: post(client, REQUESTS, user_token, body), user, competition, field, another_field)

    assert not Request.objects.exists()


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_creating(
    client: Client,
    competition: Competition,
    user: User,
    another: User,
    field: Field,
    another_field: Field,
    user_token: str,
) -> None:
    competition.registration_end = now() + timedelta(days=10)
    competition.persons_amount = 2
    competition.fields.add(field, another_field)
    competition.save(update_fields=["registration_end", "persons_amount"])

    field.is_required = True
    another_field.is_required = False
    field.save(update_fields=["is_required"])
    another_field.save(update_fields=["is_required"])

    body = {
        "competition": competition.id,
        "team_name": "babies",
        "team": [
            {"user_id": user.id, "form": [{"field_id": field.id, "value": "123"}]},
            {
                "user_id": another.id,
                "form": [{"field_id": field.id, "value": "456"}, {"field_id": another_field.id, "value": "789"}],
            },
        ],
    }

    expected_amount = 1
    assert_200(post(client, REQUESTS, user_token, body))
    assert Request.objects.filter(owner=user, competition=competition).count() == expected_amount
    assert_creating_request(body, user, another, field, another_field)

    assert_not_200(post(client, REQUESTS, user_token, body))

    for permission in [Permissions.TEACHER, Permissions.ADMIN, Permissions.SUPER_ADMIN]:
        expected_amount += 1
        user.permission = permission
        user.save(update_fields=["permission"])
        assert_200(post(client, REQUESTS, user_token, body))
        assert Request.objects.filter(owner=user, competition=competition).count() == expected_amount
        assert_creating_request(body, user, another, field, another_field)


def assert_creating_request(body: dict, user: User, another: User, field: Field, another_field: Field) -> None:
    actual = Request.objects.filter(
        owner=user,
        competition_id=body["competition"],
        team_name=body["team_name"],
        created_at=now(),
        status=RequestStatus.AWAITED,
        description=None,
    ).last()

    for id_ in [user.id, another.id]:
        assert Participation.objects.filter(request=actual, user_id=id_)

    assert FormValue.objects.filter(
        participation__request=actual, participation__user=user, field=field, value="123"
    ).exists()
    assert not FormValue.objects.filter(
        participation__request=actual, participation__user=user, field=another_field
    ).exists()

    assert FormValue.objects.filter(
        participation__request=actual, participation__user=another, field=field, value="456"
    ).exists()
    assert FormValue.objects.filter(
        participation__request=actual, participation__user=another, field=another_field, value="789"
    ).exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting_user(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(
        lambda token: post(client, REQUEST.format(id=0), token), [user_token, admin_token, super_admin_token], []
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_user(client: Client, user_request: Request, another: User, field: Field, user_token: str) -> None:
    assert_404(get(client, REQUEST.format(id=0), user_token), what="request")

    form_value = FormValue.objects.create(
        participation=Participation.objects.create(request=user_request, user=another), field=field, value="123"
    )
    expected = {
        "id": user_request.id,
        "owner": user_request.owner_id,
        "competition": user_request.competition_id,
        "team_name": user_request.team_name,
        "status": str(user_request.status),
        "description": user_request.description,
        "created_at": datetime_to_string(user_request.created_at),
        "participants": [
            {"user_id": another.id, "form": [{"field_id": form_value.field_id, "value": form_value.value}]}
        ],
    }

    response = get(client, REQUEST.format(id=user_request.id), user_token)
    assert response.status_code == 200
    assert response.json() == expected


@pytest.mark.integration
@pytest.mark.django_db
def test_access_updating(
    client: Client,
    another: User,
    admin: User,
    user_request: Request,
    user_token: str,
    admin_token: str,
    super_admin_token: str,
) -> None:
    assert_access(
        lambda token: put(client, REQUEST.format(id=0), token), [user_token, admin_token, super_admin_token], []
    )

    body = get_body_for_updating()

    assert_access(
        lambda token: put(client, REQUEST.format(id=user_request.id), token, body),
        [user_token, super_admin_token],
        [admin_token],
    )

    user_request.competition.admins.add(admin)

    assert_access(
        lambda token: put(client, REQUEST.format(id=user_request.id), token, body),
        [user_token, admin_token, super_admin_token],
        [],
    )

    request = Request.objects.create(competition=user_request.competition, owner=another)
    assert_access(
        lambda token: put(client, REQUEST.format(id=request.id), token, body),
        [admin_token, super_admin_token],
        [user_token],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_updating__invalid_users(
    client: Client,
    user: User,
    admin: User,
    super_admin: User,
    user_request: Request,
    participation: Participation,
    field: Field,
    user_token: str,
) -> None:
    user_request.competition.save(update_fields=["registration_end", "persons_amount"])
    form_value = FormValue.objects.create(participation=participation, field=field, value="123")

    _test_invalid_users(
        lambda body: put(client, REQUEST.format(id=user_request.id), user_token, body),
        user_request.competition,
        user,
        admin,
        super_admin,
    )

    assert Request.objects.get(pk=user_request.pk) == user_request
    assert list(user_request.participants.all()) == [user]
    assert list(FormValue.objects.filter(participation__request=user_request)) == [form_value]


@pytest.mark.integration
@pytest.mark.django_db
def test_updating__invalid_forms(
    client: Client,
    user: User,
    competition: Competition,
    user_request: Request,
    field: Field,
    another_field: Field,
    user_token: str,
) -> None:
    _test_invalid_forms(
        lambda body: put(client, REQUEST.format(id=user_request.id), user_token, body),
        user,
        competition,
        field,
        another_field,
    )

    assert Request.objects.get(pk=user_request.pk) == user_request
    assert not Participation.objects.filter(request=user_request).exists()
    assert not FormValue.objects.filter(participation__request=user_request).exists()


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW + [timedelta(0)])
@freezegun.freeze_time(now())
def test_updating__competition_registration_is_over(
    client: Client, user: User, user_request: Request, user_token: str, delta: timedelta
) -> None:
    body = get_body_for_updating()

    user_request.competition.registration_end = now() + delta
    user_request.competition.save(update_fields=["registration_end"])

    assert_422(
        put(client, REQUEST.format(id=user_request.id), user_token, body),
        error="registration_end",
        details="Registration is over",
    )
    assert Request.objects.get(pk=user_request.pk) == user_request
    assert not Participation.objects.filter(request=user_request).exists()
    assert not FormValue.objects.filter(participation__request=user_request).exists()


def _test_invalid_users(
    func: Callable[[dict], Response], competition: Competition, user: User, admin: User, super_admin: User
) -> None:
    competition.registration_end = now() + timedelta(days=10)
    competition.persons_amount = 2
    competition.save(update_fields=["registration_end", "persons_amount"])

    body = {"competition": competition.id, "team_name": "SUPER-PUPER TEAM", "team": None}

    for ids in [[], [user.id], [user.id, 0], [0, 0], [user.id, user.id], [user.id, admin.id, super_admin.id]]:
        body["team"] = [{"user_id": id_, "form": []} for id_ in ids]
        assert_422(func(body), error="bad users", details="Team validation error")


def _test_invalid_forms(
    func: Callable[[dict], Response], user: User, competition: Competition, field: Field, another_field: Field
) -> None:
    competition.registration_end = now() + timedelta(days=10)
    competition.persons_amount = 1
    competition.fields.add(field, another_field)
    competition.save(update_fields=["registration_end", "persons_amount"])

    field.is_required = True
    another_field.is_required = False
    field.save(update_fields=["is_required"])
    another_field.save(update_fields=["is_required"])

    body = {"competition": competition.id, "team_name": "SUPER-PUPER TEAM", "team": [{"user_id": user.id, "form": []}]}

    field_ids = [
        [],
        [0],
        [field.id, field.id],
        [another_field.id, another_field.id],
        [field.id, field.id, another_field.id],
        [another_field.id, another_field.id, field.id],
    ]
    for ids in field_ids:
        body["team"][0]["form"] = [{"field_id": id_, "value": "123"} for id_ in ids]
        assert_422(func(body), error="bad forms", details="Forms validation error")


def get_body_for_updating() -> dict:
    return {"team_name": "babies", "team": []}


@pytest.mark.integration
@pytest.mark.django_db
def test_access_canceling(
    client: Client, admin: User, user_request: Request, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    assert_access(
        lambda token: patch(client, CANCEL.format(id=user_request.id), token),
        [user_token, super_admin_token],
        [admin_token],
    )

    user_request.competition.admins.add(admin)
    assert_access(
        lambda token: patch(client, CANCEL.format(id=user_request.id), token),
        [user_token, admin_token, super_admin_token],
        [],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_canceling(client: Client, user_request: Request, user_token: str) -> None:
    assert_404(patch(client, CANCEL.format(id=0), user_token), what="request")

    for _ in range(2):
        assert_200(patch(client, CANCEL.format(id=user_request.id), user_token))
        assert Request.objects.get(pk=user_request.pk).status == RequestStatus.CANCELED


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW + [timedelta(0)])
@freezegun.freeze_time(now())
def test_canceling__competition_has_already_started(
    client: Client, user_request: Request, user_token: str, delta: timedelta
) -> None:
    user_request.competition.started_at = now() + delta
    user_request.competition.save(update_fields=["started_at"])

    assert_422(
        patch(client, CANCEL.format(id=user_request.id), user_token),
        error="competition",
        details="Competition started",
    )
    assert Request.objects.get(pk=user_request.pk).status == user_request.status


@pytest.mark.integration
@pytest.mark.django_db
def test_access_processing(
    client: Client, admin: User, user_request: Request, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    body = {
        "status": "accepted",
        "description": "Rere",
    }

    assert_access(
        lambda token: patch(client, PROCESS.format(id=user_request.id), token, body),
        [super_admin_token],
        [user_token, admin_token],
    )

    user_request.competition.admins.add(admin)
    assert_access(
        lambda token: patch(client, PROCESS.format(id=user_request.id), token, body),
        [admin_token, super_admin_token],
        [user_token],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_processing(client: Client, user_request: Request, super_admin_token: str) -> None:
    statuses = ["canceled", "awaited", "rejected", "accepted"]
    for status, description in product(statuses, [None, "", " ", "asdfasdf", "123"]):
        body = {"status": status, "description": description}
        assert_200(patch(client, PROCESS.format(id=user_request.id), super_admin_token, body))

        actual = Request.objects.get(pk=user_request.pk)
        assert actual.status == RequestStatus(status)
        assert actual.description == description

    user_request.refresh_from_db()
    for status, description in product(
        [None, "", " ", "123", 123, "unknown", *map(lambda x: x + " ", statuses), *map(lambda x: " " + x, statuses)], []
    ):
        body = {"status": status, "description": description}
        assert_validation_error(patch(client, PROCESS.format(id=user_request.id), super_admin_token, body))
        assert Request.objects.get(pk=user_request.pk) == user_request


@pytest.mark.integration
@pytest.mark.django_db
def test_access_deleting(
    client: Client,
    user_token: str,
    user: User,
    admin: User,
    competition: Competition,
    admin_token: str,
    super_admin_token: str,
) -> None:
    method = delete_method(client, user, competition)

    assert_access(method, [super_admin_token], [user_token, admin_token])

    competition.admins.add(admin)
    assert_access(method, [admin_token, super_admin_token], [user_token])


def delete_method(client: Client, user: User, competition: Competition) -> Callable:
    def wrapper(token: str):
        request = Request.objects.create(owner=user, competition=competition)

        return delete(client, REQUEST.format(id=request.id), token)

    return wrapper


@pytest.mark.integration
@pytest.mark.django_db
def test_deleting(
    client: Client, user_request: Request, participation: Participation, field: Field, super_admin_token: str
) -> None:
    value = FormValue.objects.create(participation=participation, field=field, value="123")

    assert_200(delete(client, REQUEST.format(id=user_request.id), super_admin_token))
    assert not Request.objects.filter(pk=user_request.pk).exists()
    assert not Participation.objects.filter(pk=participation.pk).exists()
    assert not FormValue.objects.filter(pk=value.pk).exists()

    assert_404(delete(client, REQUEST.format(id=user_request.id), super_admin_token), "request")

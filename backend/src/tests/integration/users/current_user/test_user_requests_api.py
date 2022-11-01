from datetime import timedelta

import freezegun
import pytest
from django.test import Client
from django.utils.timezone import now

from api.internal.db.models import Competition, Participation, Request, User
from api.internal.db.models.request import RequestStatus
from tests.conftest import BEFORE_NOW, datetime_to_string
from tests.integration.conftest import assert_404, assert_422, assert_access, assert_success_response, get, patch
from tests.integration.users.current_user.test_current_user_api import CURRENT

REQUESTS = CURRENT + "/requests"
REQUEST = REQUESTS + "/{request_id}"
CANCEL_REQUEST = REQUEST + "/cancel"
RENEW_REQUEST = REQUEST + "/renew"


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting_requests(client: Client, user_token: str, admin_token: str, super_admin_token: str) -> None:
    assert_access(lambda token: get(client, REQUESTS, token), [user_token, admin_token, super_admin_token], [None])


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_requests(client: Client, user: User, another: User, competition: Competition, user_token: str) -> None:
    user_requests = Request.objects.bulk_create(Request(owner=user, competition=competition) for _ in range(2))
    Participation.objects.create(request=user_requests[0], user=another)

    Request.objects.create(owner=another, competition=competition)

    response = get(client, REQUESTS, user_token)
    assert response.status_code == 200

    actual = sorted(response.json(), key=lambda d: d["id"])
    expected = sorted(map(get_expected_request_out, user_requests), key=lambda d: d["id"])
    assert actual == expected


@pytest.mark.integration
@pytest.mark.django_db
def test_access_canceling(
    client: Client, admin: User, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    assert_access(
        lambda token: patch(client, CANCEL_REQUEST.format(request_id=0), token),
        [user_token, admin_token, super_admin_token],
        [None],
    )


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
        patch(client, CANCEL_REQUEST.format(request_id=user_request.id), user_token),
        error="started competition",
        message="The competition has already started",
    )
    assert Request.objects.get(pk=user_request.pk).status == user_request.status


@pytest.mark.integration
@pytest.mark.django_db
def test_canceling(
    client: Client,
    user: User,
    another: User,
    user_request: Request,
    competition: Competition,
    user_token: str,
    admin_token: str,
    super_admin_token: str,
) -> None:
    _test_access_updating_status(
        client, CANCEL_REQUEST, user, another, user_request, competition, user_token, admin_token, super_admin_token
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_access_renewing(
    client: Client,
    user: User,
    another: User,
    user_request: Request,
    competition: Competition,
    user_token: str,
    admin_token: str,
    super_admin_token: str,
) -> None:
    _test_access_updating_status(
        client, RENEW_REQUEST, user, another, user_request, competition, user_token, admin_token, super_admin_token
    )


def _test_access_updating_status(
    client: Client,
    uri: str,
    user: User,
    another: User,
    user_request: Request,
    competition: Competition,
    user_token: str,
    admin_token: str,
    super_admin_token: str,
) -> None:
    Request.objects.bulk_create(Request(owner=usr, competition=competition) for usr in [user, another])

    for token in [admin_token, super_admin_token]:
        response = patch(client, uri.format(request_id=user_request.id), token)
        assert_404(response, what="request")

    response = patch(client, uri.format(request_id=user_request.id), user_token)
    assert response.status_code != 404


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW + [timedelta(0)])
@freezegun.freeze_time(now())
def test_renewing__registration_is_over(
    client: Client, competition: Competition, user_request: Request, user_token: str, delta: timedelta
) -> None:
    competition.registration_end = now() + delta
    competition.save()

    user_request.status = RequestStatus.CANCELED
    user_request.save()

    error, message = "registration end", "Registration is over"
    response = patch(client, RENEW_REQUEST.format(request_id=user_request.id), user_token)
    assert_422(response, error, message)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("status", list(filter(lambda status: status != RequestStatus.CANCELED, RequestStatus)))
def test_renewing__bad_status(client: Client, user_request: Request, user_token: str, status: RequestStatus) -> None:
    user_request.status = status
    user_request.save()

    error, message = "bad status", "The request was not canceled"
    response = patch(client, RENEW_REQUEST.format(request_id=user_request.id), user_token)
    assert_422(response, error, message)


@pytest.mark.integration
@pytest.mark.django_db
def test_renewing(client: Client, competition: Competition, user_request: Request, user_token: str) -> None:
    competition.registration_end = now() + timedelta(days=10)
    competition.save()

    user_request.status = RequestStatus.CANCELED
    user_request.save()

    response = patch(client, RENEW_REQUEST.format(request_id=user_request.id), user_token)
    assert_success_response(response)

    user_request.refresh_from_db()
    assert user_request.status == RequestStatus.AWAITED


def get_expected_request_out(request: Request) -> dict:
    return {
        "id": request.id,
        "owner": request.owner_id,
        "competition": request.competition_id,
        "team_name": request.team_name,
        "participants": sorted(request.participants.values_list("id", flat=True)),
        "status": str(request.status),
        "description": request.description,
        "created_at": datetime_to_string(request.created_at),
    }

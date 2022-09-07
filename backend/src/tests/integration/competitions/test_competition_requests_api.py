import pytest
from django.test import Client

from api.internal.db.models import Competition, Request, User
from tests.conftest import datetime_to_string
from tests.integration.competitions.test_competitions_api import COMPETITION
from tests.integration.conftest import assert_404, assert_access, get

COMPETITION_REQUESTS = COMPETITION + "/requests"


@pytest.mark.integration
@pytest.mark.django_db
def test_access_getting_competition_requests(
    client: Client, competition: Competition, admin: User, user_token: str, admin_token: str, super_admin_token: str
) -> None:
    assert_access(
        lambda token: get(client, COMPETITION_REQUESTS.format(id=competition.id), token),
        [super_admin_token],
        [user_token, admin_token, None],
    )

    competition.admins.add(admin)
    assert_access(
        lambda token: get(client, COMPETITION_REQUESTS.format(id=competition.id), token),
        [admin_token, super_admin_token],
        [user_token, None],
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_competition_requests(
    client: Client,
    competition: Competition,
    another_competition: Competition,
    user: User,
    another: User,
    super_admin_token: str,
) -> None:
    requests = Request.objects.bulk_create(Request(owner=usr, competition=competition) for usr in [user, another])
    Request.objects.create(owner=user, competition=another_competition)

    assert_404(get(client, COMPETITION_REQUESTS.format(id=0), super_admin_token), what="competition")

    response = get(client, COMPETITION_REQUESTS.format(id=competition.id), super_admin_token)

    assert response.status_code == 200
    assert sorted(response.json(), key=lambda x: x["id"]) == [get_competition_request_out(req) for req in requests]


def get_competition_request_out(request: Request) -> dict:
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

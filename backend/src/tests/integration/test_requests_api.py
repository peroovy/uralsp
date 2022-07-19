from datetime import timedelta

import freezegun
import pytest
from django.http import HttpRequest
from django.utils.timezone import now

from api.internal.db.models import Competition, Field, FormValue, Participation, Request, User
from api.internal.db.models.request import RequestStatus
from api.internal.db.repositories import competition_repo, form_value_repo, participation_repo, request_repo, user_repo
from api.internal.exceptions import NotFoundException, UnprocessableEntityException
from api.internal.requests.domain.entities import FormsIn, RequestDetailsOut, RequestIn, RequestOut
from api.internal.requests.domain.services import RequestService
from api.internal.requests.presentation.handlers import RequestHandlers
from api.internal.responses import SuccessResponse
from tests.conftest import BEFORE_NOW

handlers = RequestHandlers(
    RequestService(request_repo, competition_repo, user_repo, participation_repo, form_value_repo)
)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_requests(http_request: HttpRequest, another: User, competition: Competition) -> None:
    user = http_request.user

    assert handlers.get_requests(http_request) == []

    Request.objects.create(owner=another, competition=competition)
    expected = Request.objects.bulk_create(Request(owner=user, competition=competition) for _ in range(2))

    actual = handlers.get_requests(http_request)

    assert sorted(actual, key=lambda o: o.id) == sorted((RequestOut.from_orm(e) for e in expected), key=lambda o: o.id)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_request(http_request: HttpRequest, competition: Competition) -> None:
    request = Request.objects.create(owner=http_request.user, competition=competition)
    participation = Participation.objects.filter(request=request)

    assert handlers.get_request(http_request, request.id) == RequestDetailsOut.create(request, participation)

    with pytest.raises(NotFoundException):
        handlers.get_request(http_request, -1)


@pytest.mark.integration
@pytest.mark.django_db
def test_creating_request__competition_does_not_exist(http_request: HttpRequest, competition: Competition) -> None:
    data = RequestIn(**{"competition_id": -1, "team_name": "Baby", "team": []})

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_COMPETITION_ERROR):
        handlers.create_request(http_request, data)

    assert_creating_request_error(http_request.user)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW)
@freezegun.freeze_time(now())
def test_creating_request__competition_registration_is_expired(
    http_request: HttpRequest, competition: Competition, delta: timedelta
) -> None:
    data = RequestIn(**{"competition_id": competition.id, "team_name": "Baby", "team": []})

    competition.registration_before = now() - delta
    competition.person_amount = 0
    competition.save()

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_COMPETITION_ERROR):
        handlers.create_request(http_request, data)

    assert_creating_request_error(http_request.user)


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_creating_request__invalid_amount_of_participants(http_request: HttpRequest, competition: Competition) -> None:
    team = [
        {"user_id": 1, "form": []},
        {"user_id": 2, "form": []},
        {"user_id": 3, "form": []},
        {"user_id": 4, "form": []},
    ]

    json_ = {"competition_id": competition.id, "team_name": "Baby", "team": None}

    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 2
    competition.save(update_fields=["registration_before", "person_amount"])

    for amount in range(len(team) + 2 + 1):
        if amount == competition.person_amount:
            continue

        json_["team"] = team[:amount]
        data = RequestIn(**json_)
        with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_COMPETITION_ERROR):
            handlers.create_request(http_request, data)

        assert_creating_request_error(http_request.user)


@pytest.mark.integration
@pytest.mark.django_db
def test_creating_request__request_already_exists(http_request: HttpRequest, competition: Competition) -> None:
    data = RequestIn(**{"competition_id": competition.id, "team_name": "Baby", "team": []})
    request = Request.objects.create(owner=http_request.user, competition=competition)

    for status in RequestStatus:
        request.status = status
        request.save(update_fields=["status"])

        with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_COMPETITION_ERROR):
            handlers.create_request(http_request, data)

        assert list(Request.objects.all()) == [request]
        assert not Participation.objects.exists()
        assert not FormValue.objects.exists()


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_creating_request__participants_ids_are_repeated(
    http_request: HttpRequest, another: User, competition: Competition
) -> None:
    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 2
    competition.save(update_fields=["registration_before", "person_amount"])

    data = RequestIn(
        **{
            "competition_id": competition.id,
            "team_name": "Baby",
            "team": [{"user_id": another.id, "form": []}, {"user_id": another.id, "form": []}],
        }
    )

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_TEAM_ERROR):
        handlers.create_request(http_request, data)

    assert_creating_request_error(http_request.user)


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_creating_request__unknown_participants(
    http_request: HttpRequest, another: User, competition: Competition
) -> None:
    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 2
    competition.save(update_fields=["registration_before", "person_amount"])

    data = RequestIn(
        **{
            "competition_id": competition.id,
            "team_name": "Baby",
            "team": [{"user_id": -1, "form": []}, {"user_id": another.id, "form": []}],
        }
    )

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_TEAM_ERROR):
        handlers.create_request(http_request, data)

    assert_creating_request_error(http_request.user)


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_creating_request__amount_of_participants_must_not_be_empty(
    http_request: HttpRequest, another: User, competition: Competition
) -> None:
    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 0
    competition.save(update_fields=["registration_before", "person_amount"])

    data = RequestIn(**{"competition_id": competition.id, "team_name": "Baby", "team": []})

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_TEAM_ERROR):
        handlers.create_request(http_request, data)

    assert_creating_request_error(http_request.user)


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_creating_request__form_has_not_unique_fields_error(
    http_request: HttpRequest, another: User, competition: Competition, text_field: Field
) -> None:
    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 1
    competition.save(update_fields=["registration_before", "person_amount"])

    competition.fields.add(text_field)

    data = RequestIn(
        **{
            "competition_id": competition.id,
            "team_name": "Baby",
            "team": [
                {
                    "user_id": another.id,
                    "form": [{"field_id": text_field.id, "value": "1"}, {"field_id": text_field.id, "value": "2"}],
                }
            ],
        }
    )

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_ANY_FORMS_ERROR):
        handlers.create_request(http_request, data)

    assert_creating_request_error(http_request.user)


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_creating_request__competition_form_has_optional_and_required_fields(
    http_request: HttpRequest, another: User, competition: Competition, text_field: Field, checkbox_field: Field
) -> None:
    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 1
    competition.save(update_fields=["registration_before", "person_amount"])

    checkbox_field.is_required = False
    checkbox_field.save(update_fields=["is_required"])

    competition.fields.add(text_field, checkbox_field)

    data = RequestIn(
        **{
            "competition_id": competition.id,
            "team_name": "Baby",
            "team": [
                {
                    "user_id": another.id,
                    "form": [{"field_id": "-1", "value": "1"}, {"field_id": checkbox_field.id, "value": "2"}],
                }
            ],
        }
    )

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_ANY_FORMS_ERROR):
        handlers.create_request(http_request, data)

        data.team[0].form = []
        handlers.create_request(http_request, data)

    assert_creating_request_error(http_request.user)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@freezegun.freeze_time(now())
def test_creating_request__competition_form_is_empty(
    http_request: HttpRequest,
    user: User,
    another: User,
    competition: Competition,
    text_field: Field,
    checkbox_field: Field,
) -> None:
    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 2
    competition.save(update_fields=["registration_before", "person_amount"])

    data = RequestIn(
        **{
            "competition_id": competition.id,
            "team_name": "Baby",
            "team": [
                {
                    "user_id": another.id,
                    "form": [{"field_id": text_field.id, "value": "1"}, {"field_id": "-1", "value": "2"}],
                },
                {"user_id": user.id, "form": []},
            ],
        }
    )

    response = handlers.create_request(http_request, data)

    actual = Request.objects.filter(
        owner=http_request.user,
        competition=competition,
        team_name=data.team_name,
        status=RequestStatus.AWAITED,
        created_at=now(),
    ).get()
    assert response == RequestOut.from_orm(actual)
    assert sorted(actual.participants.all(), key=lambda usr: usr.id) == sorted([user, another], key=lambda usr: usr.id)
    assert not FormValue.objects.exists()


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@freezegun.freeze_time(now())
def test_creating_request__competition_form_has_only_optional_field(
    http_request: HttpRequest, competition: Competition, user: User, another: User, text_field: Field
) -> None:
    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 2
    competition.save(update_fields=["registration_before", "person_amount"])

    text_field.is_required = False
    text_field.save(update_fields=["is_required"])
    competition.fields.add(text_field)

    data = RequestIn(
        **{
            "competition_id": competition.id,
            "team_name": "Baby",
            "team": [
                {
                    "user_id": another.id,
                    "form": [{"field_id": text_field.id, "value": "1"}, {"field_id": "-1", "value": "2"}],
                },
                {"user_id": user.id, "form": []},
            ],
        }
    )

    response = handlers.create_request(http_request, data)

    actual = Request.objects.filter(
        owner=http_request.user,
        competition=competition,
        team_name=data.team_name,
        status=RequestStatus.AWAITED,
        created_at=now(),
    ).get()
    assert response == RequestOut.from_orm(actual)
    assert sorted(actual.participants.all(), key=lambda usr: usr.id) == sorted([user, another], key=lambda usr: usr.id)
    assert FormValue.objects.count() == 1
    assert FormValue.objects.filter(participation__user=another, field=text_field).exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_request__not_found(http_request: HttpRequest) -> None:
    with pytest.raises(NotFoundException):
        handlers.update_request(http_request, -1)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW)
@freezegun.freeze_time(now())
def test_updating_request__competition_is_ended(
    http_request: HttpRequest, competition: Competition, delta: timedelta
) -> None:
    request = Request.objects.create(owner=http_request.user, competition=competition)

    competition.end_at = now() - delta
    competition.save(update_fields=["end_at"])

    data = FormsIn(**{"team_name": "123", "team": []})
    data.team = None

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_COMPETITION_ERROR):
        handlers.update_request(http_request, request.id, data)


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_updating_request__wrong_amount_of_participants(
    http_request: HttpRequest, another: User, competition: Competition
) -> None:
    request = Request.objects.create(owner=http_request.user, competition=competition)
    competition.end_at = now() + timedelta(days=10)
    competition.person_amount = 1
    competition.save(update_fields=["end_at", "person_amount"])

    data = FormsIn(**{"team_name": "", "team": [{"user_id": 1, "form": []}, {"user_id": 2, "form": []}]})

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_COMPETITION_ERROR):
        handlers.update_request(http_request, request.id, data)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_request__team_must_not_be_empty(
    http_request: HttpRequest, another: User, competition: Competition
) -> None:
    request = Request.objects.create(owner=http_request.user, competition=competition)
    competition.end_at = now() + timedelta(days=10)
    competition.person_amount = 0
    competition.save(update_fields=["end_at", "person_amount"])

    data = FormsIn(**{"team_name": "", "team": []})

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_TEAM_ERROR):
        handlers.update_request(http_request, request.id, data)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_request__participants_ids_are_repeated(
    http_request: HttpRequest, competition: Competition, another: User
) -> None:
    request = Request.objects.create(owner=http_request.user, competition=competition)
    competition.end_at = now() + timedelta(days=10)
    competition.person_amount = 2
    competition.save(update_fields=["end_at", "person_amount"])

    data = FormsIn(**{"team_name": "Baby", "team": [{"user_id": another.id, "form": []} for _ in range(2)]})

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_TEAM_ERROR):
        handlers.update_request(http_request, request.id, data)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_request__unknown_participants(http_request: HttpRequest, competition: Competition) -> None:
    request = Request.objects.create(owner=http_request.user, competition=competition)
    competition.end_at = now() + timedelta(days=10)
    competition.person_amount = 1
    competition.save(update_fields=["end_at", "person_amount"])

    data = FormsIn(**{"team_name": "Baby", "team": [{"user_id": -1, "form": []}]})

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_TEAM_ERROR):
        handlers.update_request(http_request, request.id, data)


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_updating_request__form_has_not_unique_fields_error(
    http_request: HttpRequest, another: User, competition: Competition, text_field: Field
) -> None:
    request = Request.objects.create(owner=http_request.user, competition=competition)
    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 1
    competition.save(update_fields=["registration_before", "person_amount"])

    competition.fields.add(text_field)

    data = FormsIn(
        **{
            "team_name": "Baby",
            "team": [
                {
                    "user_id": another.id,
                    "form": [{"field_id": text_field.id, "value": "1"}, {"field_id": text_field.id, "value": "2"}],
                }
            ],
        }
    )

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_ANY_FORMS_ERROR):
        handlers.update_request(http_request, request.id, data)


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_updating_request__form_has_not_required_fields(
    http_request: HttpRequest, another: User, competition: Competition, text_field: Field, checkbox_field: Field
) -> None:
    request = Request.objects.create(owner=http_request.user, competition=competition)
    competition.registration_before = now() + timedelta(days=10)
    competition.person_amount = 1
    competition.save(update_fields=["registration_before", "person_amount"])

    checkbox_field.is_required = False
    checkbox_field.save(update_fields=["is_required"])

    competition.fields.add(text_field, checkbox_field)

    data = FormsIn(
        **{
            "team_name": "Baby",
            "team": [
                {
                    "user_id": another.id,
                    "form": [{"field_id": "-1", "value": "1"}, {"field_id": checkbox_field.id, "value": "2"}],
                }
            ],
        }
    )

    with pytest.raises(UnprocessableEntityException, match=handlers.INVALID_ANY_FORMS_ERROR):
        handlers.update_request(http_request, request.id, data)

        data.team[0].form = []
        handlers.update_request(http_request, request.id, data)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating_request__competition_form_is_empty(
    http_request: HttpRequest,
    competition: Competition,
    user_request: Request,
    user: User,
    another: User,
    text_field: Field,
) -> None:
    user_request.participants.add(another)

    data = FormsIn(
        **{
            "team_name": "Another",
            "team": [{"user_id": user.id, "form": [{"field_id": text_field.id, "value": "123"}]}],
        }
    )

    response = handlers.update_request(http_request, user_request.id, data)
    user_request.refresh_from_db()

    assert type(response) is SuccessResponse
    assert user_request.team_name == data.team_name
    assert sorted(user_request.participants.all()) == [user]
    assert not FormValue.objects.exists()


# TODO: extend updating_request testing


@pytest.mark.integration
@pytest.mark.django_db
def test_canceling_request__not_found(http_request: HttpRequest) -> None:
    with pytest.raises(NotFoundException):
        handlers.cancel_request(http_request, -1)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW)
@freezegun.freeze_time(now())
def test_canceling_request__competition_already_started(
    http_request: HttpRequest, user_request: Request, competition: Competition, delta: timedelta
) -> None:
    competition.started_at = now() - delta
    competition.save(update_fields=["started_at"])

    with pytest.raises(UnprocessableEntityException, match=handlers.COMPETITION_ALREADY_STARTED_ERROR):
        handlers.cancel_request(http_request, user_request.id)


@pytest.mark.integration
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_canceling_request(http_request: HttpRequest, competition: Competition) -> None:
    request = Request.objects.create(owner=http_request.user, competition=competition, status=RequestStatus.AWAITED)
    competition.started_at = now() + timedelta(days=10)
    competition.save(update_fields=["started_at"])

    for status in RequestStatus:
        request.status = status
        request.save(update_fields=["status"])

        response = handlers.cancel_request(http_request, request.id)
        request.refresh_from_db()

        assert type(response) is SuccessResponse
        assert request.status == RequestStatus.CANCELED


def assert_creating_request_error(owner: User) -> None:
    assert not Request.objects.filter(owner=owner).exists()
    assert not Participation.objects.filter(request__owner=owner).exists()
    assert not FormValue.objects.filter(participation__request__owner=owner).exists()

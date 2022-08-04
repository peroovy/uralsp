from datetime import timedelta
from typing import Iterable, List
from unittest.mock import Mock

import freezegun
import pytest
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
from django.utils.timezone import now

from api.internal.db.models import Competition, Field, FormValue, Participation, Request, User
from api.internal.db.models.request import RequestStatus
from api.internal.requests.domain.entities import FieldValueSchema, FormsIn, ParticipationSchema, RequestIn, Status
from api.internal.requests.domain.services import request_service
from tests.conftest import AFTER_NOW, BEFORE_NOW


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_requests(user: User, user_request: Request) -> None:
    actual = request_service.get_requests(user)

    assert actual == [user_request]


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_request(user_request: Request) -> None:
    assert request_service.get_request(-1) is None
    assert request_service.get_request(user_request.id) == user_request


@pytest.mark.unit
@pytest.mark.django_db
def test_checking_existing(user: User, admin: User, user_request: Request) -> None:
    assert request_service.exists(user, user_request.id) is True
    assert request_service.exists(user, -1) is False
    assert request_service.exists(admin, user_request.id) is False
    assert request_service.exists(admin, -1) is False


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_competition_for_registration__competition_does_not_exist(
    user: User, competition: Competition
) -> None:
    data = Mock()
    data.competition = -1

    assert request_service.validate_competition_for_registration(user, data) is False


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize("status", list(RequestStatus))
def test_validation_competition_for_registration__request_already_exists(
    user: User, status: RequestStatus, user_request: Request
) -> None:
    user_request.status = status
    user_request.save(update_fields=["status"])

    data = Mock()
    data.competition = user_request.competition_id

    assert request_service.validate_competition_for_registration(user, data) is False


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW + [timedelta(0)])
@freezegun.freeze_time(now())
def test_validation_competition_for_registration__registration_time_is_expired(
    user: User, competition: Competition, delta: timedelta
) -> None:
    competition.registration_before = now() + delta
    competition.save(update_fields=["registration_before"])

    data = Mock()
    data.competition = competition.id

    assert request_service.validate_competition_for_registration(user, data) is False


@pytest.mark.unit
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_validation_competition_for_registration__amount_of_participants_is_invalid(
    user: User, competition: Competition
) -> None:
    competition.registration_before = now() + timedelta(days=10)
    competition.persons_amount = 3
    competition.save(update_fields=["registration_before", "persons_amount"])

    data = Mock()
    data.competition = competition.id

    for bad_amount in [1, 2, 4, 5]:
        data.team = list(range(bad_amount))
        assert request_service.validate_competition_for_registration(user, data) is False


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize("delta", AFTER_NOW)
@freezegun.freeze_time(now())
def test_validation_competition_for_registration(user: User, competition: Competition, delta: timedelta) -> None:
    competition.registration_before = now() + delta
    competition.persons_amount = 3
    competition.save(update_fields=["registration_before", "persons_amount"])

    data = Mock()
    data.competition = competition.id
    data.team = list(range(competition.persons_amount))

    assert request_service.validate_competition_for_registration(user, data) is True


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize("delta", BEFORE_NOW + [timedelta(0)])
@freezegun.freeze_time(now())
def test_validation_competition_for_updating__competition_ended(
    user: User, competition: Competition, user_request: Request, delta: timedelta
) -> None:
    competition.end_at = now() + delta
    competition.save(update_fields=["end_at"])

    assert request_service.validate_competition_for_updating(user_request, None) is False


@pytest.mark.unit
@pytest.mark.django_db
@freezegun.freeze_time(now())
def test_validation_competition_for_updating__amount_of_participants_is_invalid(
    user: User, competition: Competition, user_request: Request
) -> None:
    competition.end_at = now() + timedelta(days=10)
    competition.persons_amount = 3
    competition.save(update_fields=["end_at", "persons_amount"])

    data = Mock()

    for bad_amount in [1, 2, 4, 5]:
        data.team = list(range(bad_amount))
        assert request_service.validate_competition_for_updating(user_request, data) is False


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize("delta", AFTER_NOW)
@freezegun.freeze_time(now())
def test_validation_competition_for_updating(
    user: User, competition: Competition, user_request: Request, delta: timedelta
) -> None:
    competition.end_at = now() + delta
    competition.persons_amount = 3
    competition.save(update_fields=["end_at", "persons_amount"])

    data = Mock()
    data.team = list(range(competition.persons_amount))

    assert request_service.validate_competition_for_updating(user_request, data) is True


@pytest.mark.unit
def test_validation_users__team_is_empty() -> None:
    assert_validation_user(False, *[])


@pytest.mark.unit
@pytest.mark.parametrize(
    "ids",
    [
        [1, 1, 2, 3, 4, 4, 5],
        [1, 1],
        [1, 2, 2],
    ],
)
def test_validation_users__any_ids_are_repeated(ids: Iterable[int]) -> None:
    assert_validation_user(False, *ids)


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_users__unknown_ids(user: User, admin: User) -> None:
    assert_validation_user(False, user.id, admin.id, -1, -2, -3)


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_users(user: User, admin: User) -> None:
    assert_validation_user(True, user.id, admin.id)


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_forms__competition_has_not_fields(competition: Competition) -> None:
    competition.fields.clear()

    data = Mock()

    data.competition = -1
    with pytest.raises(ObjectDoesNotExist):
        request_service.validate_forms(data)

    data.competition = competition.id
    assert request_service.validate_forms(data) is True


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_forms__competition_has_only_not_required_fields(
    competition: Competition, field: Field, another_field: Field
) -> None:
    field.is_required = False
    field.save(update_fields=["is_required"])

    another_field.is_required = False
    another_field.save(update_fields=["is_required"])

    competition.fields.add(field, another_field)

    assert_validation_form(
        competition,
        True,
        [
            [],
            [field.id],
            [another_field.id],
            [field.id, another_field.id],
            ["unknown_1", "unknown_2"],
        ],
    )


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_forms__competition_has_only_required_fields(
    competition: Competition, field: Field, another_field: Field
) -> None:
    field.is_required = True
    another_field.is_required = True
    field.save(update_fields=["is_required"])
    another_field.save(update_fields=["is_required"])
    competition.fields.add(field, another_field)

    required = [field.id, another_field.id]

    assert_validation_form(
        competition, True, [required, required + ["unknown_1", "unknown_2"], ["unknown_1"] + required + ["unknown_2"]]
    )


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_forms__required_fields_exist_but_not_team(competition: Competition, field: Field) -> None:
    field.is_required = True
    field.save(update_fields=["is_required"])
    competition.fields.add(field)

    data = Mock()
    data.competition = competition.id
    data.team = []

    assert request_service.validate_forms(data) is False


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_forms__fields_must_be_unique(competition: Competition, field: Field, another_field: Field) -> None:
    competition.fields.add(field, another_field)

    assert_validation_form(competition, False, [field.id, another_field.id, field.id])


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_forms__required_fields_are_not_in_form(
    competition: Competition, field: Field, another_field: Field
) -> None:
    field.is_required = True
    field.save(update_fields=["is_required"])

    another_field.is_required = False
    another_field.save(update_fields=["is_required"])

    competition.fields.add(field, another_field)

    assert_validation_form(competition, False, [[], [another_field.id], ["unknown_1", "unknown_2"]])


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
@freezegun.freeze_time(now())
def test_creating_request(
    user: User, another: User, competition: Competition, field: Field, another_field: Field
) -> None:
    competition.fields.add(field)

    value = "123"
    data = RequestIn(
        competition=competition.id,
        team_name="Babies Team",
        team=[
            ParticipationSchema(
                user_id=i,
                form=[
                    FieldValueSchema(field_id=field.id, value=value),
                    FieldValueSchema(field_id=another_field.id, value="228"),
                    FieldValueSchema(field_id="kjhkjh", value="stupid"),
                ],
            )
            for i in [user.id, another.id]
        ],
    )

    request = request_service.create(user, data)
    assert request is not None
    assert request.owner == user
    assert request.competition == competition
    assert request.team_name == data.team_name
    assert request.status == RequestStatus.AWAITED
    assert request.created_at == now()
    assert sorted(request.participants.all(), key=lambda u: u.id) == sorted([user, another], key=lambda u: u.id)
    assert FormValue.objects.count() == 2
    assert FormValue.objects.filter(participation__user=user, field=field, value=value).exists()
    assert FormValue.objects.filter(participation__user=another, field=field, value=value).exists()


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_creating__unknown_competition(user: User, another: User) -> None:
    data = RequestIn(
        competition=-1,
        team_name="Babies Team",
        team=[ParticipationSchema(user_id=i, form=[]) for i in [user.id, another.id]],
    )

    with pytest.raises(ObjectDoesNotExist):
        request_service.create(user, data)

    assert not Request.objects.exists()
    assert not Participation.objects.exists()
    assert not FormValue.objects.exists()


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_creating__unknown_participants(user: User, another: User, competition: Competition) -> None:
    data = RequestIn(
        competition=competition.id,
        team_name="Babies Team",
        team=[ParticipationSchema(user_id=i, form=[]) for i in [-1, -2]],
    )

    with pytest.raises(DatabaseError):
        request_service.create(user, data)

    assert not Request.objects.exists()
    assert not Participation.objects.exists()
    assert not FormValue.objects.exists()


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
@freezegun.freeze_time(now())
def test_updating_request(
    user: User,
    another: User,
    admin: User,
    competition: Competition,
    field: Field,
    another_field: Field,
    user_request: Request,
    participation: Participation,
) -> None:
    competition.fields.add(field)

    user_request.status = RequestStatus.REJECTED
    user_request.save()

    FormValue.objects.create(participation=participation, field=field, value="123")

    new_team_ids = [user.id, admin.id]
    value = "123"

    data = RequestIn(
        competition=competition.id,
        team_name="Babies Team",
        team=[
            ParticipationSchema(
                user_id=i,
                form=[
                    FieldValueSchema(field_id=field.id, value=value),
                    FieldValueSchema(field_id=another_field.id, value="228"),
                    FieldValueSchema(field_id="kjhkjh", value="stupid"),
                ],
            )
            for i in new_team_ids
        ],
    )

    request_service.update(user_request, data)
    user_request.refresh_from_db()

    assert user_request.owner == user
    assert user_request.competition == competition
    assert user_request.team_name == data.team_name
    assert user_request.status == RequestStatus.AWAITED
    assert sorted(user_request.participants.all().values_list("id", flat=True)) == sorted(new_team_ids)
    assert FormValue.objects.count() == 2

    for usr in new_team_ids:
        assert FormValue.objects.filter(participation__user=usr, field=field, value=value).exists()


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_canceling(user: User, competition: Competition, user_request: Request) -> None:
    request_service.cancel(user_request)

    user_request.refresh_from_db()
    assert user_request.status == RequestStatus.CANCELED


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_processing(user_request: Request) -> None:
    data = Mock()
    data.status = Status.REJECTED
    data.description = "Bad-bad-bad..."

    request_service.process(user_request, data)

    user_request.refresh_from_db()
    assert user_request.status == data.status
    assert user_request.description == data.description


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["delta", "is_started"],
    [
        *[[delta, True] for delta in BEFORE_NOW + [timedelta(0)]],
        *[[delta, False] for delta in AFTER_NOW],
    ],
)
@freezegun.freeze_time(now())
def test_checking_competition_starting(user_request: Request, delta: timedelta, is_started: bool) -> None:
    user_request.competition.started_at = now() + delta
    user_request.competition.save()

    assert request_service.is_competition_started(user_request) == is_started


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_requests_for(user_request: Request) -> None:
    assert request_service.get_requests_for(user_request.competition_id) == [user_request]


@pytest.mark.unit
@pytest.mark.django_db
def test_checking_access(user: User, user_request: Request) -> None:
    assert request_service.has_access(user, user_request, only_admin=False) is True
    assert request_service.has_access(user, user_request, only_admin=True) is False

    user_request.competition.admins.add(user)
    assert request_service.has_access(user, user_request, only_admin=False) is True
    assert request_service.has_access(user, user_request, only_admin=True) is True


def assert_validation_user(is_valid: bool, *ids: int) -> None:
    data = Mock()
    data.team = [ParticipationSchema(user_id=i, form=[]) for i in ids]

    assert request_service.validate_users(data) == is_valid


def assert_validation_form(competition: Competition, is_valid: bool, ids_list) -> None:
    for ids in ids_list:
        data = Mock()
        data.competition = competition.id
        data.team = [ParticipationSchema(user_id=0, form=[FieldValueSchema(field_id=str(i), value="") for i in ids])]

        assert request_service.validate_forms(data) == is_valid

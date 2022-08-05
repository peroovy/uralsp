from datetime import timedelta
from unittest.mock import Mock

import freezegun
import pytest
from django.conf import settings
from django.utils.timezone import now

from api.internal.competitions.domain.entities import Filters
from api.internal.competitions.domain.services import competition_service
from api.internal.db.models import Competition, Field, User
from tests.conftest import (
    AFTER_NOW,
    BAD_CREATING_DATE_DELTAS,
    BEFORE_NOW,
    VALID_CREATING_DATE_DELTAS,
    get_bad_admin_ids,
    get_bad_competition_filters_by_name,
    get_bad_field_ids,
    get_competition_filters_by_name,
)


@pytest.mark.unit
@pytest.mark.django_db
def test_filtering__empty(competition: Competition, another_competition: Competition) -> None:
    actual = sorted(competition_service.get_filtered(Filters()), key=lambda c: c.id)
    assert actual == sorted([competition, another_competition], key=lambda c: c.id)


@pytest.mark.unit
@pytest.mark.django_db
def test_filtering_by_name(competition: Competition) -> None:
    for search in get_competition_filters_by_name(competition):
        actual = competition_service.get_filtered(Filters(name=search))
        assert actual == [competition]

    for search in get_bad_competition_filters_by_name(competition):
        actual = competition_service.get_filtered(Filters(name=search))
        assert actual == []


@pytest.mark.unit
@pytest.mark.django_db
def test_filtering_by_admin(competition: Competition, admin: User) -> None:
    competition.admins.add(admin)

    assert competition_service.get_filtered(Filters(admin=admin.id)) == [competition]
    assert competition_service.get_filtered(Filters(admin=-1)) == []


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["delta", "is_opened"],
    [
        [timedelta(0), False],
        *[[delta, True] for delta in AFTER_NOW],
        *[[delta, False] for delta in BEFORE_NOW],
    ],
)
@freezegun.freeze_time(now())
def test_filtering_by_registration_date(competition: Competition, delta: timedelta, is_opened: bool) -> None:
    competition.registration_before = now() + delta
    competition.save(update_fields=["registration_before"])

    assert competition_service.get_filtered(Filters(opened=is_opened)) == [competition]
    assert competition_service.get_filtered(Filters(opened=not is_opened)) == []


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["delta", "is_started"],
    [
        [timedelta(0), True],
        *[[delta, False] for delta in AFTER_NOW],
        *[[delta, True] for delta in BEFORE_NOW],
    ],
)
@freezegun.freeze_time(now())
def test_filtering_by_started_at(competition: Competition, delta: timedelta, is_started: bool) -> None:
    competition.started_at = now() + delta
    competition.save(update_fields=["started_at"])

    assert competition_service.get_filtered(Filters(started=is_started)) == [competition]
    assert competition_service.get_filtered(Filters(started=not is_started)) == []


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_competition(competition: Competition) -> None:
    assert competition_service.get(competition.id) == competition
    assert competition_service.get(-1) is None


@pytest.mark.unit
@pytest.mark.django_db
def test_check_existing(competition: Competition) -> None:
    assert competition_service.exists(competition.id) is True
    assert competition_service.exists(-1) is False


@pytest.mark.unit
@pytest.mark.django_db
def test_deleting(competition: Competition) -> None:
    assert competition_service.delete(competition.id) is True
    assert competition_service.delete(competition.id) is False
    assert Competition.objects.count() == 0


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
@freezegun.freeze_time(now())
def test_creating(admin: User, field: Field) -> None:
    data = Mock()
    data.name = "New competition"
    data.request_template = "<field></field>"
    data.persons_amount = settings.MIN_PARTICIPANTS_AMOUNT * 2
    data.registration_before = now() + timedelta(days=20)
    data.started_at = now() + timedelta(days=30)
    data.end_at = now() + timedelta(days=40)
    data.admins = [admin.id]
    data.fields = [field.id]

    competition_service.create(data)

    competition = Competition.objects.get(
        name=data.name, request_template=data.request_template, persons_amount=data.persons_amount
    )
    assert_competition(competition, data)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating(
    competition: Competition, admin: User, another_admin: User, field: Field, another_field: Field
) -> None:
    data = Mock()
    data.name = "TOP COMPETITION!!!!!!!!!!!!!!"
    data.request_template = "prosto html"
    data.persons_amount = settings.MIN_PARTICIPANTS_AMOUNT
    data.registration_before = now() + timedelta(days=200)
    data.started_at = now() + timedelta(days=300)
    data.end_at = now() + timedelta(days=400)
    data.admins = [admin.id, another_admin.id]
    data.fields = [field.id, another_field.id]

    competition_service.update(competition.id, data)

    assert_competition(Competition.objects.get(pk=competition.pk), data)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating_form(competition: Competition, field: Field, another_field: Field) -> None:
    competition.fields.add(field, another_field)
    data = Mock()

    for fields in [[field.id], [field.id, another_field.id]]:
        data.fields = fields
        competition_service.update_form(competition.id, data)
        assert sorted(competition.fields.values_list("id", flat=True)) == sorted(fields)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating_admins(competition: Competition, admin: User, another_admin: User) -> None:
    data = Mock()
    for admins in [[admin.id], [admin.id, another_admin.id]]:
        data.admins = admins
        competition_service.update_admins(competition.id, data)
        assert sorted(competition.admins.values_list("id", flat=True)) == sorted(admins)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating_request_template(competition: Competition) -> None:
    template = "<aaaaaaaa></aaaaaaaa>"
    data = Mock(request_template=template)

    assert competition_service.update_request_template(-1, data) is False
    assert not Competition.objects.filter(pk=competition.pk, request_template=template).exists()

    assert competition_service.update_request_template(competition.id, data) is True
    assert Competition.objects.filter(pk=competition.pk, request_template=template).exists()

    data.request_template = None
    assert competition_service.update_request_template(competition.id, data) is True
    assert Competition.objects.filter(pk=competition.pk, request_template=None).exists()


@pytest.mark.unit
@pytest.mark.django_db
def test_checking_access(
    competition: Competition, user: User, admin: User, another_admin: User, super_admin: User
) -> None:
    competition.admins.add(admin)

    assert competition_service.has_access(competition.id, admin) is True
    assert competition_service.has_access(competition.id, super_admin) is True

    assert competition_service.has_access(competition.id, another_admin) is False
    assert competition_service.has_access(competition.id, user) is False


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_form_details(competition: Competition, field: Field, another_field: Field) -> None:
    assert competition_service.get_form_details(competition.id) == []

    competition.fields.add(field, another_field)

    actual = competition_service.get_form_details(competition.id)
    expected = sorted([field, another_field], key=lambda f: f.id)

    assert len(actual) == len(expected)
    for details, field in zip(actual, expected):
        assert details.id == field.id
        assert details.name == field.name
        assert details.type == field.type
        assert details.is_required == field.is_required
        assert details.is_visible == field.is_visible
        assert sorted(details.default_values) == sorted(field.default_values.values_list("value", flat=True))


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["amount", "is_valid"],
    [
        *[[amount, False] for amount in range(settings.MIN_PARTICIPANTS_AMOUNT)],
        *[[amount, True] for amount in range(settings.MIN_PARTICIPANTS_AMOUNT, settings.MIN_PARTICIPANTS_AMOUNT + 3)],
    ],
)
def test_validation_persons_amount(amount: int, is_valid: bool) -> None:
    data = Mock()
    data.persons_amount = amount

    assert competition_service.validate_persons_amount(data) == is_valid


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["registration_delta", "started_delta", "end_delta", "is_valid"],
    [
        *[[*deltas, False] for deltas in BAD_CREATING_DATE_DELTAS],
        *[[*deltas, True] for deltas in VALID_CREATING_DATE_DELTAS],
    ],
)
@freezegun.freeze_time(now())
def test_validation_dates(
    registration_delta: timedelta, started_delta: timedelta, end_delta: timedelta, is_valid: bool
) -> None:
    data = Mock()
    data.registration_before = now() + registration_delta
    data.started_at = now() + started_delta
    data.end_at = now() + end_delta

    assert competition_service.validate_dates(data) == is_valid


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_admins(user: User, admin: User, super_admin: User, another_admin: User) -> None:
    for admins in get_bad_admin_ids(user, admin, super_admin):
        assert competition_service.validate_admins(admins) is False

    assert competition_service.validate_admins([admin.id, another_admin.id]) is True


@pytest.mark.unit
@pytest.mark.django_db
def test_validation_fields(admin: User, field: Field, another_field: Field) -> None:
    for fields in get_bad_field_ids(field):
        assert competition_service.validate_fields(fields) is False

    assert competition_service.validate_fields([field.id, another_field.id]) is True


def assert_competition(actual: Competition, expected: Mock) -> None:
    assert actual.name == expected.name
    assert actual.registration_before == expected.registration_before
    assert actual.started_at == expected.started_at
    assert actual.end_at == expected.end_at
    assert actual.persons_amount == expected.persons_amount
    assert actual.request_template == expected.request_template
    assert sorted(actual.fields.values_list("id", flat=True)) == sorted(expected.fields)
    assert sorted(actual.admins.values_list("id", flat=True)) == sorted(expected.admins)
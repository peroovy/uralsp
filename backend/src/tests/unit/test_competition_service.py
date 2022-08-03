from datetime import timedelta
from unittest.mock import Mock

import freezegun
import pytest
from django.utils.timezone import now

from api.internal.competitions.domain import MIN_PERSONS_AMOUNT
from api.internal.competitions.domain.entities import Filters
from api.internal.competitions.domain.services import OperationStatus, competition_service
from api.internal.db.models import Competition, Field, User
from tests.conftest import (
    AFTER_NOW,
    BAD_CREATING_DATE_DELTAS,
    BEFORE_NOW,
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
    assert competition_service.try_get(competition.id) == competition
    assert competition_service.try_get(-1) is None


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
@pytest.mark.parametrize("amount", range(MIN_PERSONS_AMOUNT))
def test_creating__bad_persons_amount(amount: int) -> None:
    data = Mock()
    data.persons_amount = amount

    assert competition_service.create(data) == OperationStatus.BAD_PERSONS_AMOUNT
    assert Competition.objects.count() == 0


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(["registration_delta", "started_delta", "end_delta"], BAD_CREATING_DATE_DELTAS)
@freezegun.freeze_time(now())
def test_creating__bad_dates(registration_delta: timedelta, started_delta: timedelta, end_delta: timedelta) -> None:
    data = Mock()
    data.persons_amount = MIN_PERSONS_AMOUNT
    data.registration_before = now() + registration_delta
    data.started_at = now() + started_delta
    data.end_at = now() + end_delta

    assert competition_service.create(data) == OperationStatus.BAD_DATES
    assert Competition.objects.count() == 0


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_creating__bad_admins(user: User, admin: User, super_admin: User) -> None:
    data = Mock()
    data.persons_amount = MIN_PERSONS_AMOUNT
    data.registration_before = now() + timedelta(days=200)
    data.started_at = now() + timedelta(days=300)
    data.end_at = now() + timedelta(days=400)

    for admins in get_bad_admin_ids(user, admin, super_admin):
        data.admins = admins
        assert competition_service.create(data) == OperationStatus.BAD_ADMINS
        assert Competition.objects.count() == 0


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_creating__bad_fields(admin: User, field: Field) -> None:
    data = Mock()
    data.persons_amount = MIN_PERSONS_AMOUNT
    data.registration_before = now() + timedelta(days=200)
    data.started_at = now() + timedelta(days=300)
    data.end_at = now() + timedelta(days=400)
    data.admins = [admin.id]

    for fields in get_bad_field_ids(field):
        data.fields = fields
        assert competition_service.create(data) == OperationStatus.BAD_FIELDS
        assert Competition.objects.count() == 0


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
@freezegun.freeze_time(now())
def test_creating(admin: User, field: Field) -> None:
    data = Mock()
    data.name = "OPA"
    data.request_template = "<field></field>"
    data.persons_amount = MIN_PERSONS_AMOUNT * 2
    data.registration_before = now() + timedelta(days=200)
    data.started_at = now() + timedelta(days=300)
    data.end_at = now() + timedelta(days=400)
    data.admins = [admin.id]
    data.fields = [field.id]

    assert competition_service.create(data) == OperationStatus.OK

    competition = Competition.objects.get(
        name=data.name, request_template=data.request_template, persons_amount=data.persons_amount
    )
    assert_competition(competition, data)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize("amount", range(MIN_PERSONS_AMOUNT))
def test_updating__bad_persons_amount(competition: Competition, amount: int) -> None:
    data = Mock()
    data.persons_amount = amount

    assert competition_service.update(competition.id, data) == OperationStatus.BAD_PERSONS_AMOUNT
    assert_not_updated_competition(competition)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(["registration_delta", "started_delta", "end_delta"], BAD_CREATING_DATE_DELTAS)
@freezegun.freeze_time(now())
def test_updating__bad_dates(
    competition: Competition, registration_delta: timedelta, started_delta: timedelta, end_delta: timedelta
) -> None:
    data = Mock()
    data.persons_amount = MIN_PERSONS_AMOUNT
    data.registration_before = now() + registration_delta
    data.started_at = now() + started_delta
    data.end_at = now() + end_delta

    assert competition_service.update(competition.id, data) == OperationStatus.BAD_DATES
    assert_not_updated_competition(competition)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating__bad_admins(competition: Competition, user: User, admin: User, super_admin: User) -> None:
    data = Mock()
    data.persons_amount = MIN_PERSONS_AMOUNT
    data.registration_before = now() + timedelta(days=200)
    data.started_at = now() + timedelta(days=300)
    data.end_at = now() + timedelta(days=400)

    for admins in get_bad_admin_ids(user, admin, super_admin):
        data.admins = admins
        assert competition_service.update(competition.id, data) == OperationStatus.BAD_ADMINS
        assert_not_updated_competition(competition)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating__bad_fields(competition: Competition, admin: User, field: Field) -> None:
    data = Mock()
    data.persons_amount = MIN_PERSONS_AMOUNT
    data.registration_before = now() + timedelta(days=200)
    data.started_at = now() + timedelta(days=300)
    data.end_at = now() + timedelta(days=400)
    data.admins = [admin.id]

    for fields in get_bad_field_ids(field):
        data.fields = fields
        assert competition_service.update(competition.id, data) == OperationStatus.BAD_FIELDS
        assert_not_updated_competition(competition)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating(
    competition: Competition, admin: User, another_admin: User, field: Field, another_field: Field
) -> None:
    data = Mock()
    data.name = "TOP COMPETITION!!!!!!!!!!!!!!"
    data.request_template = "prosto html"
    data.persons_amount = MIN_PERSONS_AMOUNT
    data.registration_before = now() + timedelta(days=200)
    data.started_at = now() + timedelta(days=300)
    data.end_at = now() + timedelta(days=400)
    data.admins = [admin.id, another_admin.id]
    data.fields = [field.id, another_field.id]

    assert competition_service.update(competition.id, data) == OperationStatus.OK
    assert_competition(Competition.objects.get(pk=competition.pk), data)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating_form__bad_fields(competition: Competition, field: Field) -> None:
    data = Mock()
    for fields in get_bad_field_ids(field):
        data.fields = fields
        assert competition_service.update_form(competition.id, data) == OperationStatus.BAD_FIELDS
        assert competition.fields.count() == 0


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating_form(competition: Competition, field: Field, another_field: Field) -> None:
    competition.fields.add(field, another_field)
    data = Mock()

    for fields in [[field.id], [field.id, another_field.id]]:
        data.fields = fields
        assert competition_service.update_form(competition.id, data) == OperationStatus.OK
        assert sorted(competition.fields.values_list("id", flat=True)) == sorted(fields)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating_admins__bad_admins(competition: Competition, user: User, admin: User, super_admin: User) -> None:
    data = Mock()
    for admins in get_bad_admin_ids(user, admin, super_admin):
        data.admins = admins
        assert competition_service.update_admins(competition.id, data) == OperationStatus.BAD_ADMINS
        assert_not_updated_competition(competition)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating_admins(competition: Competition, admin: User, another_admin: User) -> None:
    data = Mock()
    for admins in [[admin.id], [admin.id, another_admin.id]]:
        data.admins = admins
        assert competition_service.update_admins(competition.id, data) == OperationStatus.OK
        assert sorted(competition.admins.values_list("id", flat=True)) == sorted(admins)


@pytest.mark.unit
@pytest.mark.django_db
def test_updating_request_template(competition: Competition) -> None:
    template = "<aaaaaaaa></aaaaaaaa>"

    assert competition_service.update_request_template(-1, template) is False
    assert not Competition.objects.filter(pk=competition.pk, request_template=template).exists()

    assert competition_service.update_request_template(competition.id, template) is True
    assert Competition.objects.filter(pk=competition.pk, request_template=template).exists()

    assert competition_service.update_request_template(competition.id, None) is True
    assert Competition.objects.filter(pk=competition.pk, request_template=None).exists()


@pytest.mark.unit
@pytest.mark.django_db
def test_check_access_for_admin(
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


def assert_competition(actual: Competition, expected: Mock) -> None:
    assert actual.name == expected.name
    assert actual.registration_before == expected.registration_before
    assert actual.started_at == expected.started_at
    assert actual.end_at == expected.end_at
    assert actual.persons_amount == expected.persons_amount
    assert actual.request_template == expected.request_template
    assert sorted(actual.fields.values_list("id", flat=True)) == sorted(expected.fields)
    assert sorted(actual.admins.values_list("id", flat=True)) == sorted(expected.admins)


def assert_not_updated_competition(competition: Competition) -> None:
    assert Competition.objects.get(pk=competition.pk) == competition
    assert competition.admins.count() == 0

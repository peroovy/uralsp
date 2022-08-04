from itertools import permutations

import pytest
from django.forms import model_to_dict

from api.internal.db.models import Request, Participation, User, Competition, Field, FormValue
from api.internal.users.domain.entities import MergingIn
from api.internal.users.domain.services import merging_service


@pytest.mark.unit
@pytest.mark.django_db
def test_existing_users(user: User, another: User) -> None:
    for from_id, to_id in [[user.id, -1], [-1, another.id], [-1, -1]]:
        assert merging_service.exist_users(MergingIn(from_id=from_id, to_id=to_id)) is False

    assert merging_service.exist_users(MergingIn(from_id=user.id, to_id=another.id)) is True


@pytest.mark.unit
@pytest.mark.django_db
def test_checking_equality_permissions(
    user: User, admin: User, super_admin: User, another: User
) -> None:
    for from_id, to_id in permutations([user.id, admin.id, super_admin.id], 2):
        assert merging_service.equal_permissions(MergingIn(from_id=from_id, to_id=to_id)) is False

    for usr in [user, admin, super_admin]:
        another.permission = usr.permission
        another.save(update_fields=["permission"])

        assert merging_service.equal_permissions(MergingIn(from_id=usr.id, to_id=another.id)) is True
        assert merging_service.equal_permissions(MergingIn(from_id=another.id, to_id=usr.id)) is True


@pytest.mark.unit
@pytest.mark.django_db
def test_existing_requests_intersection(
    user: User, another: User, user_request: Request, participation: Participation
) -> None:
    for from_id, to_id in permutations([user.id, another.id]):
        assert merging_service.exists_requests_intersection(MergingIn(from_id=from_id, to_id=to_id)) is False

    Request.objects.create(owner=another, competition_id=user_request.competition_id)
    for from_id, to_id in permutations([user.id, another.id]):
        assert merging_service.exists_requests_intersection(MergingIn(from_id=from_id, to_id=to_id)) is True


@pytest.mark.unit
@pytest.mark.django_db
def test_existing_participation_intersection(
    user: User, another: User, user_request: Request, participation: Participation
) -> None:
    for from_id, to_id in permutations([user.id, another.id]):
        assert merging_service.exists_participation_intersection(MergingIn(from_id=from_id, to_id=to_id)) is False

    Participation.objects.create(request=participation.request, user=another)
    for from_id, to_id in permutations([user.id, another.id]):
        assert merging_service.exists_participation_intersection(MergingIn(from_id=from_id, to_id=to_id)) is True


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_merging_default_users(
    user: User,
    another: User,
    user_request: Request,
    participation: Participation,
    another_competition: Competition,
    competition: Competition,
    field: Field,
) -> None:
    assert_merging_default_users(user, user_request, participation, another, competition, another_competition, field)


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_merging_admins(
    admin: User,
    another_admin: User,
    user_request: Request,
    participation: Participation,
    competition: Competition,
    another_competition: Competition,
    field: Field,
) -> None:
    user_request.owner = admin
    user_request.save(update_fields=["owner"])
    participation.user = admin
    participation.save(update_fields=["user"])
    competition.admins.add(admin)

    assert_merging_default_users(
        admin, user_request, participation, another_admin, competition, another_competition, field
    )
    assert competition.admins.count() == 0


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_merging_super_admins(
    super_admin: User,
    another_super_admin: User,
    user_request: Request,
    participation: Participation,
    another_competition: Competition,
    competition: Competition,
    field: Field,
) -> None:
    user_request.owner = super_admin
    user_request.save(update_fields=["owner"])
    participation.user = super_admin
    participation.save(update_fields=["user"])

    assert_merging_default_users(
        super_admin, user_request, participation, another_super_admin, competition, another_competition, field
    )


def assert_merging_default_users(
    from_user: User,
    from_request: Request,
    from_participation: Participation,
    to_user: User,
    competition: Competition,
    another_competition: Competition,
    field: Field,
) -> None:
    another_user_request = Request.objects.create(owner=to_user, competition=another_competition)
    another_user_participation = Participation.objects.create(user=to_user, request=another_user_request)

    competition.fields.add(field)
    user_form_value = FormValue.objects.create(participation=from_participation, field=field, value="123")

    merging_service.merge(MergingIn(from_id=from_user.id, to_id=to_user.id))

    to_user.refresh_from_db()
    from_request.refresh_from_db()
    from_participation.refresh_from_db()
    another_user_participation.refresh_from_db()
    another_user_request.refresh_from_db()
    user_form_value.refresh_from_db()

    assert from_request.owner == to_user
    assert from_participation.user == to_user
    assert another_user_request.owner == to_user
    assert another_user_participation.user == to_user
    assert user_form_value.participation.user == to_user
    assert not User.objects.filter(pk=from_user.pk).exists()

    actual, expected = model_to_dict(to_user, exclude=["id"]), model_to_dict(from_user, exclude=["id"])
    assert expected == actual

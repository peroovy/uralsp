from itertools import permutations, product
from typing import Optional

import pytest
from django.forms import model_to_dict
from django.test.client import Client

from api.internal.db.models import Competition, Field, FormValue, Participation, Request, User
from api.internal.db.models.user import Institution, Permissions
from tests.integration.conftest import (
    TokenOwner,
    assert_200,
    assert_403,
    assert_404,
    assert_422,
    assert_validation_error,
    get,
    get_headers,
    post,
    put,
)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_users_by_permission(client: Client, user: User, admin: User, super_admin: User) -> None:
    assert_getting_users_by_filter(
        client, "permission", True, {"default": user, "admin": admin, "super_admin": super_admin}
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_users_by_region(client: Client, user: User, another: User) -> None:
    user.region = "Sverdlovsk region"
    another.region = "Moscow region"
    user.save(update_fields=["region"])
    another.save(update_fields=["region"])

    assert_getting_users_by_filter(
        client,
        "region",
        False,
        {
            "S": user,
            "s": user,
            "Sverd": user,
            "SverDlovsK RegIon": user,
            "Sverdlovskregion": None,
            "    Sverdlovsk region    ": user,
            "moscow": another,
            "  moscow": another,
            "moscow ": another,
            "region": None,
        },
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_users_by_email(client: Client, user: User, another: User) -> None:
    user.email = "tankist@warg.net"
    another.email = "super_pro@gmail.com"
    user.save(update_fields=["email"])
    another.save(update_fields=["email"])

    assert_getting_users_by_filter(
        client,
        "email",
        False,
        {
            "t": user,
            "T": None,
            user.email: user,
            user.email.swapcase(): None,
            "warg.net": None,
            "@": None,
            "tankist@": user,
            "tankist @ warg.net": None,
        },
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_users_by_fcs(client: Client, user: User, another: User) -> None:
    user.surname, user.name, user.patronymic = "Petrov", "Pety", "Petrovich"
    user.save(update_fields=["surname", "name", "patronymic"])

    another.surname, another.name, another.patronymic = "Samkov", "Nikita", None
    another.save(update_fields=["surname", "name", "patronymic"])

    assert_getting_users_by_filter(
        client,
        "fcs",
        False,
        {
            "P": user,
            "p": user,
            "Petrov": user,
            "   petrov  ": user,
            "petroV     petY": user,
            "  Pety   ": user,
            " PetrovPetyPetrovich ": user,
            "Samkov  Nikita   ": another,
            "Samkov Nikita Tankist": None,
            "Unknown": None,
            " ".join("PetrovPetyPetrovich"): user,
        },
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_users_by_institution_type(client: Client, user: User, another: User) -> None:
    user.institution_type = Institution.SCHOOL
    another.institution_type = Institution.COLLEGE
    user.save(update_fields=["institution_type"])
    another.save(update_fields=["institution_type"])

    assert_getting_users_by_filter(
        client,
        "institution_type",
        True,
        {"school": user, "college": another, "university": None},
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_users_by_institution_name(client: Client, user: User, another: User) -> None:
    user.institution_name = "URFU"
    another.institution_name = "MSU"
    user.save(update_fields=["institution_name"])
    another.save(update_fields=["institution_name"])

    assert_getting_users_by_filter(
        client,
        "institution_name",
        False,
        {"URFU": user, "urfu": user, "  urfu ": user, "unknown": None, "ur fu": None, "rfu": None},
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_users_by_institution_faculty(client: Client, user: User, another: User) -> None:
    user.institution_faculty = "Computer Science"
    another.institution_faculty = "Software Engineering"
    user.save(update_fields=["institution_faculty"])
    another.save(update_fields=["institution_faculty"])

    assert_getting_users_by_filter(
        client,
        "institution_faculty",
        False,
        {"comp": user, "Comp": user, "  comp  ": user, "c omp": None, "unknown": None, " computer science  ": user},
    )


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_users_by_institution_course(client: Client, user: User, another: User) -> None:
    user.institution_course = "1 class"
    another.institution_course = "3 course"
    user.save(update_fields=["institution_course"])
    another.save(update_fields=["institution_course"])

    assert_getting_users_by_filter(
        client,
        "institution_course",
        False,
        {"1": user, "3": another, " 1 CLAss ": user, "class": None, "unknown": None},
    )


def assert_getting_users_by_filter(client: Client, filter: str, is_enum: bool, value_expected: dict) -> None:
    for value, expected in value_expected.items():
        response = get(client, f"/users?{filter}={value}")
        assert response.status_code == 200

        body = response.json()
        if expected is None:
            assert body["count"] == len(body["items"]) == 0
            continue

        assert body["count"] == len(body["items"]) == 1

        expected_item = {
            "id": expected.id,
            "surname": expected.surname,
            "name": expected.name,
            "patronymic": expected.patronymic,
        }

        assert body["items"][0] == expected_item

    if is_enum:
        assert_validation_error(get(client, f"/users?{filter}=-1"))
    else:
        response = get(client, f"/users?{filter}=")
        assert response.status_code == 200

        body = response.json()
        assert body["count"] > 1
        assert len(body["items"]) == body["count"]


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_user(client: Client, user: User, user_token: str, admin_token: str, super_admin_token: str) -> None:
    uri = f"/users/{user.id}"

    response = get(client, uri, user_token)
    assert_403(response)

    for token in [admin_token, super_admin_token]:
        response = get(client, uri, token)
        assert response.status_code == 200

        expected = {
            "id": user.id,
            "name": user.name,
            "surname": user.surname,
            "patronymic": user.patronymic,
            "permission": user.permission,
            "email": user.email,
            "phone": user.phone,
            "city": user.city,
            "region": user.region,
            "institution_type": user.institution_type,
            "institution_name": user.institution_name,
            "institution_faculty": user.institution_faculty,
            "institution_course": user.institution_course,
            "vkontakte_id": user.vkontakte_id,
            "google_id": user.google_id,
            "telegram_id": user.telegram_id,
        }

        assert response.json() == expected

    assert_404(get(client, "/users/0", super_admin_token), what="user")


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_updating_user(
    client: Client,
    user: User,
    admin: User,
    super_admin: User,
    user_token: str,
    admin_token: str,
    super_admin_token: str,
) -> None:
    body = get_body_for_updating()

    for token, account in {user_token: user, admin_token: admin, super_admin_token: super_admin}.items():
        response = put(client, f"/users/{user.id}", token, body)

        if account is user:
            assert_403(response)
            assert_not_updating(user)
            continue

        assert_200(response)
        assert_updating(user, body)

        User.objects.filter(pk=user.pk).update(**model_to_dict(user, exclude=["id"]))

    for key in list(body.keys()):
        del body[key]
        response = put(client, f"/users/{user.id}", super_admin_token, body)

        assert_validation_error(response)
        assert_not_updating(user)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_unknown_user(
    client: Client,
    user: User,
    admin: User,
    super_admin: User,
    user_token: str,
    admin_token: str,
    super_admin_token: str,
) -> None:
    body = get_body_for_updating()

    for token, account in {user_token: user, admin_token: admin, super_admin_token: super_admin}.items():
        response = put(client, "/users/0", token, body)
        assert_403(response) if token is user_token else assert_404(response, what="user")


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_self(
    client: Client,
    user: User,
    admin: User,
    super_admin: User,
    user_token: str,
    admin_token: str,
    super_admin_token: str,
) -> None:
    body = get_body_for_updating()

    for token, account in {user_token: user, admin_token: admin, super_admin_token: super_admin}.items():
        response = put(client, f"/users/{account.id}", token, body)

        assert_403(response) if account is user else assert_422(
            response, error="bad user", details="Updating self is not allowed"
        )
        assert_not_updating(account)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(
    ["token_owner", "value", "is_correct"],
    [
        [TokenOwner.ADMIN, "default", True],
        [TokenOwner.ADMIN, "teacher", True],
        [TokenOwner.ADMIN, "admin", True],
        [TokenOwner.ADMIN, "super_admin", False],
        [TokenOwner.SUPER_ADMIN, "default", True],
        [TokenOwner.SUPER_ADMIN, "teacher", True],
        [TokenOwner.SUPER_ADMIN, "admin", True],
        [TokenOwner.SUPER_ADMIN, "super_admin", True],
        *[
            [owner, value, None]
            for owner, value in product([TokenOwner.ADMIN, TokenOwner.SUPER_ADMIN], [None, "null", "", " ", "unknown"])
        ],
    ],
)
def test_updating_permission(
    client: Client,
    user: User,
    admin: User,
    admin_token: str,
    super_admin_token: str,
    competition: Competition,
    token_owner: TokenOwner,
    value: Optional[str],
    is_correct: Optional[bool],
) -> None:
    body = get_body_for_updating()
    error, details = "bad permission", "The permission cannot be updated"
    token = admin_token if token_owner == TokenOwner.ADMIN else super_admin_token

    user.permission = Permissions.DEFAULT
    user.save(update_fields=["permission"])

    body["permission"] = value
    response = put(client, f"/users/{user.id}", token, body)

    if is_correct:
        assert_200(response)
        assert_updating(user, body)
    else:
        assert_422(response, error=error, details=details) if is_correct is False else assert_validation_error(response)
        assert_not_updating(user)


@pytest.mark.integration
@pytest.mark.django_db
@pytest.mark.parametrize("value", ["default", "teacher", "super_admin"])
def test_updating_permission__competition_has_the_admin(
    client: Client, user: User, admin: User, super_admin_token: str, competition: Competition, value: str
) -> None:
    body = get_body_for_updating()
    error, details = "bad permission", "The permission cannot be updated"

    competition.admins.add(admin)
    body["permission"] = value

    assert_422(
        put(client, f"/users/{admin.id}", super_admin_token, body),
        error=error,
        details=details,
    )
    assert_not_updating(user)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(
    ["value", "is_correct"],
    [
        [None, False],
        ["null", False],
        ["", False],
        ["  ", False],
        ["unknown", False],
        ["school", True],
        ["college", True],
        ["university", True],
    ],
)
def test_updating_institution_type(
    client: Client, user: User, super_admin_token: str, value: Optional[str], is_correct: bool
) -> None:
    body = get_body_for_updating()
    body["institution_type"] = value

    response = put(client, f"/users/{user.id}", super_admin_token, body)

    if is_correct:
        assert_200(response)
        assert_updating(user, body)
    else:
        assert_validation_error(response)
        assert_not_updating(user)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(
    ["value", "is_correct"],
    [
        [None, True],
        ["", False],
        ["asd", False],
        ["asd@", False],
        ["asd@asd", False],
        ["asd@asd.", False],
        ["asd@asd.a", True],
    ],
)
def test_updating_email(
    client: Client, user: User, another: User, super_admin_token: str, value: Optional[str], is_correct: bool
) -> None:
    body = get_body_for_updating()
    body["email"] = value

    response = put(client, f"/users/{user.id}", super_admin_token, body)

    if is_correct:
        assert_200(response)
        assert_updating(user, body)
    else:
        assert_validation_error(response)
        assert_not_updating(user)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_email__already_exists(client: Client, user: User, another: User, super_admin_token: str) -> None:
    body = get_body_for_updating()

    another.email = body["email"] = "theexgamer@mail.ru"
    another.save(update_fields=["email"])

    assert_422(
        put(client, f"/users/{user.id}", super_admin_token, body),
        error="bad email",
        details="The email already exists",
    )
    assert_not_updating(user)

    assert_200(put(client, f"/users/{another.id}", super_admin_token, body))
    assert_updating(another, body)


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(
    ["value", "is_correct"],
    [
        *[[f"+{dig}" + "1" * 10, True] for dig in range(10)],
        *[[f"   +{dig}" + "1" * 10, False] for dig in range(1, 10)],
        *[[f"+{dig}" + "1" * 10 + "  ", False] for dig in range(1, 10)],
        *[[str(dig) + "1" * 10, False] for dig in range(10)],
        ["+7" + "a" * 10, False],
        ["+" + "a" * 11, False],
        ["a" * 11, False],
    ],
)
def test_updating_phone(
    client: Client, user: User, super_admin_token: str, value: Optional[str], is_correct: bool
) -> None:
    body = get_body_for_updating()
    body["phone"] = value

    response = put(client, f"/users/{user.id}", super_admin_token, body)

    if is_correct:
        assert_200(response)

        actual = User.objects.get(pk=user.pk).phone
        assert len(actual) == 12
        assert actual[0] == "+"
        assert all(map(str.isdigit, actual[1:])) is True
    else:
        assert_validation_error(response)


def assert_updating(user: User, expected: dict) -> None:
    actual = User.objects.get(pk=user.pk)

    assert actual.id == user.id
    assert model_to_dict(actual, exclude=["id", "vkontakte_id", "google_id", "telegram_id"]) == expected


def assert_not_updating(user: User) -> None:
    assert User.objects.get(pk=user.pk) == user


def get_body_for_updating() -> dict:
    return {
        "name": "Pety",
        "surname": "Petrov",
        "patronymic": "Petrovich",
        "permission": "default",
        "email": "pochta123@gmail.com",
        "phone": "+79221297838",
        "city": "Yekaterinburg",
        "region": "Sverdlovsk region",
        "institution_type": "school",
        "institution_name": "First school",
        "institution_faculty": None,
        "institution_course": "1 class",
    }


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize("access", [TokenOwner.ADMIN, TokenOwner.SUPER_ADMIN])
def test_merging_defaults(
    client: Client,
    user: User,
    user_request: Request,
    participation: Participation,
    another: User,
    competition: Competition,
    another_competition: Competition,
    field: Field,
    access: TokenOwner,
    admin_token: str,
    super_admin_token: str,
) -> None:
    token = admin_token if access == TokenOwner.ADMIN else super_admin_token

    assert_merging_default_users(
        client, token, user, user_request, participation, another, competition, another_competition, field
    )


@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize("access", [TokenOwner.ADMIN, TokenOwner.SUPER_ADMIN])
def test_merging_admins(
    client: Client,
    admin: User,
    another_admin: User,
    user_request: Request,
    participation: Participation,
    competition: Competition,
    another_competition: Competition,
    field: Field,
    access: TokenOwner,
    admin_token: str,
    super_admin_token: str,
) -> None:
    user_request.owner = admin
    user_request.save(update_fields=["owner"])
    participation.user = admin
    participation.save(update_fields=["user"])
    competition.admins.add(admin)
    token = admin_token if access == TokenOwner.ADMIN else super_admin_token

    assert_merging_default_users(
        client, token, admin, user_request, participation, another_admin, competition, another_competition, field
    )
    assert competition.admins.count() == 0


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize("access", [TokenOwner.ADMIN, TokenOwner.SUPER_ADMIN])
def test_merging_super_admins(
    client: Client,
    super_admin: User,
    another_super_admin: User,
    user_request: Request,
    participation: Participation,
    another_competition: Competition,
    competition: Competition,
    field: Field,
    access: TokenOwner,
    admin_token: str,
    super_admin_token: str,
) -> None:
    user_request.owner = super_admin
    user_request.save(update_fields=["owner"])
    participation.user = super_admin
    participation.save(update_fields=["user"])
    token = admin_token if access == TokenOwner.ADMIN else super_admin_token

    assert_merging_default_users(
        client,
        token,
        super_admin,
        user_request,
        participation,
        another_super_admin,
        competition,
        another_competition,
        field,
    )


def assert_merging_default_users(
    client: Client,
    token: str,
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

    response = post(client, "/users/merge", token, get_body_for_merging(from_user.id, to_user.id))
    assert_200(response)

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


@pytest.mark.integration
@pytest.mark.django_db
def test_merging__permission_denied(client: Client, user: User, another: User, user_token: str) -> None:
    assert_403(post(client, "/users/merge", user_token, get_body_for_merging(user.id, another.id)))


@pytest.mark.integration
@pytest.mark.django_db
def test_merging__bad_ids(client: Client, user: User, super_admin_token: str) -> None:
    for from_id, to_id in [[0, 0], [0, user.id], [user.id, 0]]:
        assert_404(post(client, "/users/merge", super_admin_token, get_body_for_merging(from_id, to_id)), what="users")

    assert User.objects.get(pk=user.pk) == user


@pytest.mark.integration
@pytest.mark.django_db
def test_merging__permissions_not_equal(
    client: Client, user: User, admin: User, super_admin: User, super_admin_token: str
) -> None:
    for from_id, to_id in permutations([user.id, admin.id, super_admin.id], r=2):
        response = post(client, "/users/merge", super_admin_token, get_body_for_merging(from_id, to_id))
        assert_422(response, error="bad permissions", details="Permissions must be equal")


@pytest.mark.integration
@pytest.mark.django_db
def test_merging__requests_intersect(
    client: Client, user: User, user_request: Request, another: User, super_admin_token: str
) -> None:
    request = Request.objects.create(owner=another, competition=user_request.competition)

    response = post(client, "/users/merge", super_admin_token, get_body_for_merging(user.id, another.id))
    assert_422(response, error="requests", details="Request intersects")

    assert User.objects.get(pk=user.pk) == user
    assert User.objects.get(pk=another.pk) == another
    assert list(user.created_requests.all()) == [user_request]
    assert list(another.created_requests.all()) == [request]
    assert not Participation.objects.exists()


@pytest.mark.integration
@pytest.mark.django_db
def test_merging__participation_intersect(
    client: Client, user: User, participation: Participation, another: User, super_admin_token: str
) -> None:
    participation_another = Participation.objects.create(request=participation.request, user=another)

    response = post(client, "/users/merge", super_admin_token, get_body_for_merging(user.id, another.id))
    assert_422(response, error="participation", details="Participation intersects")

    assert User.objects.get(pk=user.pk) == user
    assert User.objects.get(pk=another.pk) == another
    assert list(user.created_requests.all()) == [participation.request]
    assert not another.created_requests.exists()
    assert list(Participation.objects.filter(user=user)) == [participation]
    assert list(Participation.objects.filter(user=another)) == [participation_another]


def get_body_for_merging(from_id: int, to_id: int) -> dict:
    return {"from_id": from_id, "to_id": to_id}
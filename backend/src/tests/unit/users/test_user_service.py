import pytest

from api.internal.db.models import Competition, Field, FormValue, Participation, Request, User
from api.internal.db.models.user import Permissions
from api.internal.users.domain.entities import Filters, ProfileIn
from api.internal.users.domain.services import user_service
from tests.conftest import get_bad_filters_by_string, get_filters_by_string


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_users__without_filtering(user: User, another: User) -> None:
    actual = sorted(user_service.get_filtered(Filters()), key=lambda usr: usr.id)
    assert actual == sorted([user, another], key=lambda usr: usr.id)


SCHOOL = "First school in K'"


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["search", "is_found"],
    [
        *[[search, True] for search in get_filters_by_string(SCHOOL)],
        *[[search, False] for search in get_bad_filters_by_string(SCHOOL)],
    ],
)
def test_getting_users__filtering_by_school(user: User, search: str, is_found: bool) -> None:
    user.school = SCHOOL
    user.save(update_fields=["school"])

    actual = user_service.get_filtered(Filters(school=search))
    assert actual == ([user] if is_found else [])


CLASS = "Third class"


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["search", "is_found"],
    [
        *[[search, True] for search in get_filters_by_string(CLASS)],
        *[[search, False] for search in get_bad_filters_by_string(CLASS)],
    ],
)
def test_getting_users__filtering_by_school_class(user: User, search: str, is_found: bool) -> None:
    user.school_class = CLASS
    user.save(update_fields=["school_class"])

    actual = user_service.get_filtered(Filters(school_class=search))
    assert actual == ([user] if is_found else [])


REGION = "Sverdlovskaya oblast"


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["search", "is_found"],
    [
        *[[search, True] for search in get_filters_by_string(REGION)],
        *[[search, False] for search in get_bad_filters_by_string(REGION)],
    ],
)
def test_getting_users__filtering_by_region(user: User, search: str, is_found: bool) -> None:
    user.region = REGION
    user.save(update_fields=["region"])

    actual = user_service.get_filtered(Filters(region=search))
    assert actual == ([user] if is_found else [])


EMAIL = "the_email@google.com"


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["search", "is_found"],
    [
        ["", True],
        [EMAIL[0].lower(), True],
        [EMAIL, True],
        [" " + EMAIL, True],
        [EMAIL + " ", True],
        [" " + EMAIL + " ", True],
        *[[search, True] for search in EMAIL.split("@")[:1]],
        [EMAIL.split("@")[0] + "@", True],
        [EMAIL[0].upper(), False],
        [EMAIL.split("@")[1], False],
        [EMAIL[1], False],
        ["@", False],
    ],
)
def test_getting_users__filtering_by_email(user: User, search: str, is_found: bool) -> None:
    user.email = EMAIL
    user.save(update_fields=["email"])

    actual = user_service.get_filtered(Filters(email=search))
    assert actual == ([user] if is_found else [])


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize("permission", Permissions)
def test_getting_users__filtering_by_permission(user: User, permission: Permissions) -> None:
    assert user_service.get_filtered(Filters(permission=permission.value)) == (
        [user] if user.permission == permission else []
    )


SURNAME, NAME, PATRONYMIC = "Petrov", "Petr", "Petrovich"


@pytest.mark.unit
@pytest.mark.django_db
@pytest.mark.parametrize(
    ["search", "has_patronymic", "is_found"],
    [
        [" ".join([SURNAME, NAME, PATRONYMIC]), True, True],
        [" ".join([SURNAME, NAME, PATRONYMIC]).lower(), True, True],
        [" ".join([SURNAME, NAME, PATRONYMIC]).upper(), True, True],
        [" ".join([SURNAME, NAME, PATRONYMIC]).swapcase(), True, True],
        [SURNAME + NAME + PATRONYMIC, True, True],
        [" " * 3 + " ".join([SURNAME, NAME, PATRONYMIC]) + " " * 3, True, True],
        *[[" ".join([SURNAME, NAME]), has, True] for has in [True, False]],
        *[[" " * 3 + " ".join([SURNAME, NAME]) + " " * 3, has, True] for has in [True, False]],
        *[[SURNAME, has, True] for has in [True, False]],
        *[[" " * 3 + SURNAME + " " * 3, has, True] for has in [True, False]],
        [" ".join([SURNAME, NAME, PATRONYMIC]), False, False],
        *[[" ".join([SURNAME, NAME, PATRONYMIC]) + " abc", has, False] for has in [True, False]],
        *[["abc " + " ".join([SURNAME, NAME, PATRONYMIC]), has, False] for has in [True, False]],
    ],
)
def test_getting_users_filtering_by_fcs(user: User, search: str, has_patronymic: bool, is_found: bool) -> None:
    user.name = NAME
    user.surname = SURNAME
    user.patronymic = PATRONYMIC if has_patronymic else None
    user.save(update_fields=["name", "surname", "patronymic"])

    actual = user_service.get_filtered(Filters(fcs=search))
    assert actual == ([user] if is_found else [])


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_user(user: User) -> None:
    assert user_service.get_user(user.id) == user
    assert user_service.get_user(-1) is None


@pytest.mark.unit
@pytest.mark.django_db(transaction=True)
def test_updating_user(user: User) -> None:
    data = ProfileIn(
        name="-1",
        surname="-2",
        patronymic="-3",
        permission=Permissions.SUPER_ADMIN.value,
        email="zzz@opa",
        phone="+79221295888",
        city="What",
        region="111111111111",
        school="-2-2",
        school_class="-3-3",
    )

    assert user_service.update(user, data) is True

    user.refresh_from_db()
    assert user.name == data.name
    assert user.surname == data.surname
    assert user.patronymic == data.patronymic
    assert user.permission == data.permission
    assert user.email == data.email
    assert user.phone == data.phone
    assert user.city == data.city
    assert user.region == data.region
    assert user.school == data.school
    assert user.school_class == data.school_class


@pytest.mark.unit
@pytest.mark.django_db
def test_getting_last_form_values(
    user: User, user_request: Request, competition: Competition, field: Field, another_field: Field
) -> None:
    another_request = Request.objects.get(pk=user_request.pk)
    another_request.pk = None
    another_request.save()

    competition.fields.add(field)

    FormValue.objects.create(
        participation=Participation.objects.create(request=user_request, user=user), field=field, value="123"
    )
    expected = FormValue.objects.create(
        participation=Participation.objects.create(request=another_request, user=user), field=field, value="456"
    )

    actual = user_service.get_last_form_values(user.id, {field.id, "unknown", another_field.id})
    assert actual == [expected]

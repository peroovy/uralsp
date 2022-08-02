# import pytest
#
# from api.internal.db.models import User
# from api.internal.db.models.user import Permissions
# from api.internal.db.repositories import user_repo, form_value_repo, request_repo, participation_repo
# from api.internal.users.domain.entities import Filters, ProfileIn
# from api.internal.users.domain.services import UserService
# from tests.conftest import get_filters_by_string, get_bad_filters_by_string
#
# service = UserService(user_repo, form_value_repo, request_repo, participation_repo)
#
# # TODO: repair
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_getting_users(user: User, another: User) -> None:
#     actual = sorted(service.get_users(Filters()), key=lambda usr: usr.id)
#     assert actual == sorted([user, another], key=lambda usr: usr.id)
#
#     for key, string in [["school", user.school], ["school_class", user.school_class], ["region", user.region]]:
#         for value in get_filters_by_string(string):
#             assert user in service.get_users(Filters(**{key: value}))
#
#         for bad_value in get_bad_filters_by_string(string):
#             assert user not in service.get_users(Filters(**{key: bad_value}))
#
#     for permission in Permissions:
#         actual = service.get_users(Filters(permission=permission.value))
#         if permission == user.permission:
#             assert user in actual
#         else:
#             assert user not in actual
#
#     for search, is_found in [["", False], [user.surname[0], True], [user.surname, True], [user.surname + " ", True]]:
#         actual = service.get_users(Filters(fcs=search))
#
#         if is_found:
#             assert user in actual
#         else:
#             assert user not in actual
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_getting_user(user: User) -> None:
#     assert service.get_user(user.id) == user
#     assert service.get_user(-1) is None
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_updating_user(user: User) -> None:
#     data = ProfileIn(
#         name="-1",
#         surname="-2",
#         patronymic="-3",
#         permission=Permissions.SUPER_ADMIN.value,
#         email="zzz@opa",
#         phone="+79221295888",
#         city="What",
#         region="111111111111",
#         school="-2-2",
#         school_class="-3-3"
#     )
#
#     assert service.update(user.id, data) is True
#
#     user.refresh_from_db()
#     assert user.name == data.name
#     assert user.surname == data.surname
#     assert user.patronymic == data.patronymic
#     assert user.permission == data.permission
#     assert user.email == data.email
#     assert user.phone == data.phone
#     assert user.city == data.city
#     assert user.region == data.region
#     assert user.school == data.school
#     assert user.school_class == data.school_class
#
#

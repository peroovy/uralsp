# from datetime import timedelta
# from typing import Iterable
#
# import freezegun
# import pytest
# from django.core.exceptions import ObjectDoesNotExist
# from django.db import DatabaseError
# from django.utils.timezone import now
#
# from api.internal.db.models import Competition, Field, FormValue, Participation, Request, User
# from api.internal.db.models.request import RequestStatus
# from api.internal.db.repositories import competition_repo, form_value_repo, participation_repo, request_repo, user_repo
# from api.internal.requests.domain.entities import FieldValueSchema, FormsIn, ParticipationSchema, RequestIn
# from api.internal.requests.domain.services import RequestService
# from tests.conftest import AFTER_NOW, BEFORE_NOW
#
# service = RequestService(request_repo, competition_repo, user_repo, participation_repo, form_value_repo)
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_getting_requests(user: User, admin: User, competition: Competition) -> None:
#     Request.objects.create(owner=admin, competition=competition, team_name="")
#     expected = Request.objects.bulk_create(Request(owner=user, competition=competition, team_name="") for i in range(3))
#
#     actual = service.get_requests(user)
#
#     assert sorted(actual, key=lambda r: r.id) == sorted(expected, key=lambda r: r.id)
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_getting_request(user: User, admin: User, competition: Competition) -> None:
#     request = Request.objects.create(owner=user, competition=competition, team_name="")
#
#     assert service.get_request(user, request.id) == request
#     assert service.get_request(user, -1) is None
#     assert service.get_request(admin, request.id) is None
#     assert service.get_request(admin, -1) is None
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_checking_existing(user: User, admin: User, competition: Competition) -> None:
#     request = Request.objects.create(owner=user, competition=competition, team_name="")
#
#     assert service.exists(user, request.id) is True
#     assert service.exists(user, -1) is False
#     assert service.exists(admin, request.id) is False
#     assert service.exists(admin, -1) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_getting_participants(
#     user: User, another: User, competition: Competition, another_competition: Competition
# ) -> None:
#     request, another_request = Request.objects.bulk_create(
#         Request(owner=user, competition=competition, team_name="") for _ in range(2)
#     )
#
#     Request.objects.create(owner=another, competition=another_competition, team_name="")
#     Participation.objects.create(request=another_request, user=user)
#
#     expected = Participation.objects.bulk_create(
#         Participation(request=request, user=participant) for participant in [user, another]
#     )
#     actual = service.get_participation(request)
#
#     assert sorted(actual, key=lambda p: p.id) == sorted(expected, key=lambda p: p.id)
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_canceling(user: User, competition: Competition) -> None:
#     request = Request.objects.create(owner=user, competition=competition, team_name="")
#
#     service.cancel(request.id)
#
#     request.refresh_from_db(fields=["status"])
#     assert request.status == RequestStatus.CANCELED
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_validation_competition_for_registration__competition_does_not_exist(
#     user: User, competition: Competition
# ) -> None:
#     data = RequestIn(competition_id=-1, team_name="", team=[])
#
#     assert service.validate_competition_for_registration(user, data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# @pytest.mark.parametrize("status", list(RequestStatus))
# def test_validation_competition_for_registration__request_exists(
#     user: User, competition: Competition, status: RequestStatus
# ) -> None:
#     Request.objects.create(owner=user, competition=competition, team_name="", status=status)
#     data = RequestIn(competition_id=competition.id, team_name="", team=[])
#
#     assert service.validate_competition_for_registration(user, data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# @pytest.mark.parametrize("delta", BEFORE_NOW)
# @freezegun.freeze_time(now())
# def test_validation_competition_for_registration__registration_time_is_expired(
#     user: User, competition: Competition, delta: timedelta
# ) -> None:
#     competition.registration_before = now() - delta
#     competition.person_amount = 0
#     competition.save(update_fields=["registration_before", "person_amount"])
#
#     data = RequestIn(competition_id=competition.id, team_name="", team=[])
#
#     assert service.validate_competition_for_registration(user, data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# @freezegun.freeze_time(now())
# def test_validation_competition_for_registration__amount_of_participants_is_invalid(
#     user: User, competition: Competition
# ) -> None:
#     competition.registration_before = now() + timedelta(days=10)
#     competition.person_amount = 3
#     competition.save(update_fields=["registration_before", "person_amount"])
#
#     schema = ParticipationSchema(user_id=0, form=[])
#
#     for bad_amount in [1, 2, 4, 5]:
#         data = RequestIn(competition_id=competition.id, team_name="", team=[schema for _ in range(bad_amount)])
#
#         assert service.validate_competition_for_registration(user, data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# @pytest.mark.parametrize("delta", AFTER_NOW)
# @freezegun.freeze_time(now())
# def test_validation_competition_for_registration(user: User, competition: Competition, delta: timedelta) -> None:
#     competition.registration_before = now() + delta
#     competition.person_amount = 3
#     competition.save(update_fields=["registration_before", "person_amount"])
#
#     data = RequestIn(
#         competition_id=competition.id,
#         team_name="",
#         team=[ParticipationSchema(user_id=0, form=[]) for _ in range(competition.person_amount)],
#     )
#
#     assert service.validate_competition_for_registration(user, data) is True
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# @pytest.mark.parametrize("delta", BEFORE_NOW)
# @freezegun.freeze_time(now())
# def test_validation_competition_for_updating__competition_ended(
#     user: User, competition: Competition, delta: timedelta
# ) -> None:
#     competition.end_at = now() - delta
#     competition.save(update_fields=["end_at"])
#
#     request = Request.objects.create(owner=user, competition=competition)
#
#     assert service.validate_competition_for_updating(request, None) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# @freezegun.freeze_time(now())
# def test_validation_competition_for_updating__amount_of_participants_is_invalid(
#     user: User, competition: Competition
# ) -> None:
#     competition.end_at = now() + timedelta(days=10)
#     competition.person_amount = 3
#     competition.save(update_fields=["end_at", "person_amount"])
#
#     request = Request.objects.create(owner=user, competition=competition)
#     schema = ParticipationSchema(user_id=0, form=[])
#
#     for bad_amount in [1, 2, 4, 5]:
#         data = FormsIn(team_name="", team=[schema for _ in range(bad_amount)])
#
#         assert service.validate_competition_for_updating(request, data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# @pytest.mark.parametrize("delta", AFTER_NOW)
# @freezegun.freeze_time(now())
# def test_validation_competition_for_updating(user: User, competition: Competition, delta: timedelta) -> None:
#     competition.end_at = now() + delta
#     competition.person_amount = 3
#     competition.save(update_fields=["end_at", "person_amount"])
#
#     request = Request.objects.create(owner=user, competition=competition)
#     data = FormsIn(
#         team_name="", team=[ParticipationSchema(user_id=0, form=[]) for _ in range(competition.person_amount)]
#     )
#
#     assert service.validate_competition_for_updating(request, data) is True
#
#
# @pytest.mark.unit
# def test_validation_users__team_is_empty() -> None:
#     data = FormsIn(team_name="", team=[])
#
#     assert service.validate_users(data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.parametrize(
#     "ids",
#     [
#         [1, 1, 2, 3, 4, 4, 5],
#         [1, 1],
#         [1, 2, 2],
#     ],
# )
# def test_validation_users__any_ids_are_repeated(ids: Iterable[int]) -> None:
#     data = FormsIn(team_name="", team=[ParticipationSchema(user_id=i, form=[]) for i in ids])
#
#     assert service.validate_users(data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_validation_users__unknown_ids(user: User, admin: User) -> None:
#     data = FormsIn(
#         team_name="", team=[ParticipationSchema(user_id=i, form=[]) for i in [user.id, admin.id, -1, -2, -3]]
#     )
#
#     assert service.validate_users(data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_validation_users(user: User, admin: User) -> None:
#     data = FormsIn(team_name="", team=[ParticipationSchema(user_id=i, form=[]) for i in [user.id, admin.id]])
#
#     assert service.validate_users(data) is True
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_validation_forms__competition_has_not_fields(competition: Competition) -> None:
#     competition.fields.all().delete()
#
#     data = RequestIn(
#         competition_id=competition.id,
#         team_name="",
#         team=[ParticipationSchema(user_id=0, form=[FieldValueSchema(field_id=-1, value="")])],
#     )
#
#     assert service.validate_forms(data) is True
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_validation_forms__competition_has_not_required_fields(
#     competition: Competition, text_field: Field, checkbox_field: Field
# ) -> None:
#     text_field.is_required = False
#     checkbox_field.is_required = False
#     text_field.save(update_fields=["is_required"])
#     checkbox_field.save(update_fields=["is_required"])
#     competition.fields.add(text_field, checkbox_field)
#
#     for ids in [
#         [],
#         [text_field.id],
#         [checkbox_field.id],
#         [text_field.id, checkbox_field.id],
#         ["unknown_1", "unknown_2"],
#     ]:
#         data = RequestIn(
#             competition_id=competition.id,
#             team_name="",
#             team=[ParticipationSchema(user_id=0, form=[FieldValueSchema(field_id=i, value="") for i in ids])],
#         )
#
#         assert service.validate_forms(data) is True
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_validation_forms__competition_has_required_fields(
#     competition: Competition, text_field: Field, checkbox_field: Field
# ) -> None:
#     text_field.is_required = True
#     checkbox_field.is_required = True
#     text_field.save(update_fields=["is_required"])
#     checkbox_field.save(update_fields=["is_required"])
#     competition.fields.add(text_field, checkbox_field)
#
#     required = [text_field.id, checkbox_field.id]
#
#     for ids in [required, required + ["unknown_1", "unknown_2"], ["unknown_1"] + required + ["unknown_2"]]:
#         data = RequestIn(
#             competition_id=competition.id,
#             team_name="",
#             team=[ParticipationSchema(user_id=0, form=[FieldValueSchema(field_id=i, value="") for i in ids])],
#         )
#
#         assert service.validate_forms(data) is True
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_validation_forms__required_fields_exist_but_not_team(competition: Competition, text_field: Field) -> None:
#     text_field.is_required = True
#     text_field.save(update_fields=["is_required"])
#     competition.fields.add(text_field)
#
#     data = RequestIn(competition_id=competition.id, team_name="", team=[])
#
#     assert service.validate_forms(data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_validation_forms__fields_must_be_unique(
#     competition: Competition, text_field: Field, checkbox_field: Field
# ) -> None:
#     text_field.is_required = False
#     checkbox_field.is_required = False
#     text_field.save(update_fields=["is_required"])
#     checkbox_field.save(update_fields=["is_required"])
#     competition.fields.add(text_field, checkbox_field)
#
#     data = RequestIn(
#         competition_id=competition.id,
#         team_name="",
#         team=[
#             ParticipationSchema(
#                 user_id=0,
#                 form=[
#                     FieldValueSchema(field_id=i, value="") for i in [text_field.id, checkbox_field.id, text_field.id]
#                 ],
#             )
#         ],
#     )
#
#     assert service.validate_forms(data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db
# def test_validation_forms__required_fields_are_not_in_form(
#     competition: Competition, text_field: Field, checkbox_field: Field
# ) -> None:
#     text_field.is_required = True
#     checkbox_field.is_required = False
#     text_field.save(update_fields=["is_required"])
#     checkbox_field.save(update_fields=["is_required"])
#     competition.fields.add(text_field, checkbox_field)
#
#     for ids in [[], [checkbox_field.id], ["unknown_1", "unknown_2"]]:
#         data = RequestIn(
#             competition_id=competition.id,
#             team_name="",
#             team=[ParticipationSchema(user_id=0, form=[FieldValueSchema(field_id=i, value="") for i in ids])],
#         )
#
#         assert service.validate_forms(data) is False
#
#
# @pytest.mark.unit
# @pytest.mark.django_db(transaction=True)
# @freezegun.freeze_time(now())
# def test_creating_request(
#     user: User, another: User, competition: Competition, text_field: Field, checkbox_field: Field
# ) -> None:
#     competition.fields.add(text_field)
#
#     value = "123"
#     data = RequestIn(
#         competition_id=competition.id,
#         team_name="Babies Team",
#         team=[
#             ParticipationSchema(
#                 user_id=i,
#                 form=[
#                     FieldValueSchema(field_id=text_field.id, value=value),
#                     FieldValueSchema(field_id=checkbox_field.id, value="228"),
#                     FieldValueSchema(field_id="kjhkjh", value="stupid"),
#                 ],
#             )
#             for i in [user.id, another.id]
#         ],
#     )
#
#     request = service.create(user, data)
#     assert request is not None
#     assert request.owner == user
#     assert request.competition == competition
#     assert request.team_name == data.team_name
#     assert request.status == RequestStatus.AWAITED
#     assert request.created_at == now()
#     assert sorted(request.participants.all(), key=lambda u: u.id) == sorted([user, another], key=lambda u: u.id)
#     assert FormValue.objects.count() == 2
#     assert FormValue.objects.filter(participation__user=user, field=text_field, value=value).exists()
#     assert FormValue.objects.filter(participation__user=another, field=text_field, value=value).exists()
#
#
# @pytest.mark.unit
# @pytest.mark.django_db(transaction=True)
# def test_creating__unknown_competition(user: User, another: User) -> None:
#     data = RequestIn(
#         competition_id=-1,
#         team_name="Babies Team",
#         team=[ParticipationSchema(user_id=i, form=[]) for i in [user.id, another.id]],
#     )
#
#     with pytest.raises(ObjectDoesNotExist):
#         service.create(user, data)
#
#     assert not Request.objects.exists()
#     assert not Participation.objects.exists()
#     assert not FormValue.objects.exists()
#
#
# @pytest.mark.unit
# @pytest.mark.django_db(transaction=True)
# def test_creating__unknown_participants(user: User, another: User, competition: Competition) -> None:
#     data = RequestIn(
#         competition_id=competition.id,
#         team_name="Babies Team",
#         team=[ParticipationSchema(user_id=i, form=[]) for i in [-1, -2]],
#     )
#
#     with pytest.raises(DatabaseError):
#         service.create(user, data)
#
#     assert not Request.objects.exists()
#     assert not Participation.objects.exists()
#     assert not FormValue.objects.exists()
#
#
# @pytest.mark.unit
# @pytest.mark.django_db(transaction=True)
# @freezegun.freeze_time(now())
# def test_updating_request(
#     user: User, another: User, admin: User, competition: Competition, text_field: Field, checkbox_field: Field
# ) -> None:
#     competition.fields.add(text_field)
#     request = Request.objects.create(
#         owner=user, competition=competition, status=RequestStatus.REJECTED, team_name="999999999999999"
#     )
#     participation = Participation.objects.create(request=request, user=another)
#     FormValue.objects.create(participation=participation, field=text_field, value="123")
#
#     new_team_ids = [user.id, admin.id]
#     value = "123"
#
#     data = RequestIn(
#         competition_id=competition.id,
#         team_name="Babies Team",
#         team=[
#             ParticipationSchema(
#                 user_id=i,
#                 form=[
#                     FieldValueSchema(field_id=text_field.id, value=value),
#                     FieldValueSchema(field_id=checkbox_field.id, value="228"),
#                     FieldValueSchema(field_id="kjhkjh", value="stupid"),
#                 ],
#             )
#             for i in new_team_ids
#         ],
#     )
#
#     service.update(user, request.id, data)
#     request.refresh_from_db()
#
#     assert request.owner == user
#     assert request.competition == competition
#     assert request.team_name == data.team_name
#     assert request.status == RequestStatus.AWAITED
#     assert sorted(request.participants.all().values_list("id", flat=True)) == sorted(new_team_ids)
#     assert FormValue.objects.count() == 2
#
#     for usr in new_team_ids:
#         assert FormValue.objects.filter(participation__user=usr, field=text_field, value=value).exists()
#
#
# @pytest.mark.unit
# @pytest.mark.django_db(transaction=True)
# def test_updating__unknown_request(user: User, another: User, competition: Competition, text_field: Field) -> None:
#     competition.fields.add(text_field)
#
#     data = RequestIn(
#         competition_id=competition.id,
#         team_name="Babies Team",
#         team=[ParticipationSchema(user_id=another.id, form=[FieldValueSchema(field_id=text_field.id, value="123")])],
#     )
#
#     bad_id = -1
#     with pytest.raises(ObjectDoesNotExist):
#         service.update(user, bad_id, data)
#
#     assert not Request.objects.filter(id=bad_id).exists()
#     assert not Participation.objects.filter(request_id=bad_id).exists()
#     assert not FormValue.objects.filter(participation__request_id=bad_id).exists()
#
#
# @pytest.mark.unit
# @pytest.mark.django_db(transaction=True)
# def test_updating__unknown_competition(user: User, another: User, competition: Competition, text_field: Field) -> None:
#     expected = Request.objects.create(owner=user, competition=competition)
#
#     data = RequestIn(
#         competition_id=-1,
#         team_name="Babies Team",
#         team=[ParticipationSchema(user_id=another.id, form=[FieldValueSchema(field_id=text_field.id, value="123")])],
#     )
#
#     with pytest.raises(ObjectDoesNotExist):
#         service.update(user, expected.id, data)
#
#     actual = Request.objects.prefetch_related("participants").get(pk=expected.pk)
#
#     assert actual == expected
#     assert not actual.participants.exists()
#     assert not FormValue.objects.exists()
#
#
# @pytest.mark.unit
# @pytest.mark.django_db(transaction=True)
# def test_updating__unknown_participants(user: User, another: User, competition: Competition, text_field: Field) -> None:
#     competition.fields.add(text_field)
#
#     expected = Request.objects.create(owner=user, competition=competition)
#     data = RequestIn(
#         competition_id=competition.id,
#         team_name="Babies Team",
#         team=[
#             ParticipationSchema(user_id=i, form=[FieldValueSchema(field_id=text_field.id, value="123")])
#             for i in [-1, -2]
#         ],
#     )
#
#     with pytest.raises(DatabaseError):
#         service.update(user, expected.id, data)
#
#     actual = Request.objects.prefetch_related("participants").get(pk=expected.pk)
#
#     assert actual == expected
#     assert not actual.participants.exists()
#     assert not FormValue.objects.exists()

import pytest
from django.forms import model_to_dict
from django.http import HttpRequest

from api.internal.db.repositories import user_repo
from api.internal.responses import SuccessResponse
from api.internal.users.domain.entities import DefaultProfileIn
from api.internal.users.domain.services import UserService
from api.internal.users.presentation.handlers import CurrentUserHandlers

current_user_handlers = CurrentUserHandlers(
    UserService(user_repo),
)


@pytest.mark.integration
@pytest.mark.django_db
def test_getting_profile(http_request: HttpRequest) -> None:
    user = http_request.user
    data = current_user_handlers.get_profile(http_request)

    assert data.dict() == model_to_dict(user)


@pytest.mark.integration
@pytest.mark.django_db
def test_updating_profile(http_request: HttpRequest) -> None:
    user = http_request.user

    json_ = {
        "name": "-1",
        "surname": "-2",
        "patronymic": "-3",
        "email": "m@m",
        "phone": "+78005553535",
        "city": "-4",
        "region": "-5",
        "school": "-6",
        "school_class": "-7",
    }

    data = DefaultProfileIn(**json_)

    user_id, permission, vk_id, google_id, telegram_id = (
        user.id,
        user.permission,
        user.vkontakte_id,
        user.google_id,
        user.telegram_id,
    )

    response = current_user_handlers.update_profile(http_request, data)
    user.refresh_from_db()

    expected = data.dict()
    assert type(response) is SuccessResponse
    assert expected == model_to_dict(user, fields=list(expected.keys()))
    assert user.id == user_id
    assert user.permission == permission
    assert user.vkontakte_id == vk_id
    assert user.google_id == google_id
    assert user.telegram_id == telegram_id

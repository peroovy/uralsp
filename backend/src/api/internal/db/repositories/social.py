from abc import ABC, abstractmethod
from typing import Optional

from api.internal.db.models import User


class SocialBaseRepository(ABC):
    def __init__(self, social_field_name: str):
        self._social_field_name = social_field_name

    def update_user(self, user_id: int, social_id: Optional[int]) -> bool:
        return User.objects.filter(id=user_id).update(**{self._social_field_name: social_id}) > 0

    def get_or_create(self, social_id: int, surname: str, name: str) -> User:
        return User.objects.get_or_create(
            **{self._social_field_name: social_id}, defaults={"surname": surname, "name": name}
        )[0]


class VKRepository(SocialBaseRepository):
    def __init__(self):
        super(VKRepository, self).__init__("vkontakte_id")


class GoogleRepository(SocialBaseRepository):
    def __init__(self):
        super(GoogleRepository, self).__init__("google_id")


class TelegramRepository(SocialBaseRepository):
    def __init__(self):
        super(TelegramRepository, self).__init__("telegram_id")

from typing import Optional

from api.internal.db.models import User
from api.internal.db.repositories.user import IUserRepository


class RegisterService:
    def __init__(self, user_repo: IUserRepository):
        self._user_repo = user_repo

    def register_by_vkontakte_id(self, name: str, surname: str, vk_id: int) -> Optional[User]:
        return self._user_repo.create(name, surname, vkontakte_id=vk_id)

    def register_by_google_id(self, name: str, surname: str, google_id: int) -> Optional[User]:
        return self._user_repo.create(name, surname, google_id=google_id)

    def register_by_telegram_id(self, name: str, surname: str, telegram_id: int) -> Optional[User]:
        return self._user_repo.create(name, surname, telegram_id=telegram_id)

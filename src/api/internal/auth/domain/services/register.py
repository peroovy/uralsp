from typing import Optional

from phonenumbers import NumberParseException, PhoneNumberFormat, format_number, parse

from api.internal.db.models import User
from api.internal.db.repositories.user import IUserRepository


class RegisterService:
    def __init__(self, user_repo: IUserRepository):
        self._user_repo = user_repo

    def register_from_vkontakte(self, vk_id: int, name: str, surname: str) -> Optional[User]:
        return self._user_repo.create(name, surname, vkontakte_id=vk_id)

    def try_parse_phone(self, value: str) -> Optional[str]:
        try:
            return format_number(parse(value), PhoneNumberFormat.E164)
        except NumberParseException:
            return None

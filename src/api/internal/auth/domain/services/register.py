from typing import Optional

from phonenumbers import NumberParseException, PhoneNumberFormat, format_number, parse

from api.internal.db.models import User
from api.internal.db.repositories.user import IUserRepository


class RegisterService:
    def __init__(self, user_repo: IUserRepository):
        self._user_repo = user_repo

    def try_register_from_vkontakte(
        self, vk_id: int, name: str, surname: str, patronymic: Optional[str], phone: Optional[str]
    ) -> Optional[User]:
        if phone and not (phone := self.try_parse_phone(phone)):
            return None

        return User.objects.create(name=name, surname=surname, patronymic=patronymic, phone=phone, vkontakte_id=vk_id)

    def try_parse_phone(self, value: str) -> Optional[str]:
        try:
            return format_number(parse(value), PhoneNumberFormat.E164)
        except NumberParseException:
            return None

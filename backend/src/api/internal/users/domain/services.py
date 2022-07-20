import csv
from io import BytesIO, StringIO
from typing import Iterable, List, Optional

from openpyxl import Workbook
from openpyxl.worksheet.worksheet import Worksheet

from api.internal.db.models import User
from api.internal.db.models.user import Permissions
from api.internal.db.repositories.user import IUserRepository
from api.internal.users.domain.entities import Filters, ProfileIn


class UserService:
    def __init__(self, user_repo: IUserRepository):
        self._user_repo = user_repo

    def get_users(self, filters: Filters) -> List[User]:
        return list(
            self._user_repo.get_all_without_super_admins(
                filters.permission, filters.school, filters.school_class, filters.region, filters.email, filters.fcs
            )
        )

    def get_user(self, user_id: int) -> Optional[User]:
        return self._user_repo.get(user_id)

    def update_profile(self, user: User, data: ProfileIn) -> None:
        self._user_repo.update(user.id, **data.dict())

    def update_vkontakte(self, user: User, vk_id: Optional[int]) -> None:
        self._user_repo.update(user.id, vkontakte_id=vk_id)

    def update_google(self, user: User, vk_id: Optional[int]) -> None:
        self._user_repo.update(user.id, google_id=vk_id)

    def get_socials_amount(self, user: User) -> int:
        return self._user_repo.get_socials_amount(user.id)


class DocumentService:
    USER_HEADERS = (
        "id",
        "surname",
        "name",
        "patronymic",
        "permission",
        "email",
        "phone",
        "city",
        "region",
        "school",
        "school_class",
        "vkontakte_id",
        "google_id",
        "telegram_id",
    )

    def serialize_users_to_xlsx(self, users: Iterable[User]) -> BytesIO:
        buffer = BytesIO()
        workbook = Workbook()
        worksheet = workbook.active

        self._add_row_to_xlsx(worksheet, self.USER_HEADERS, 1)

        for row, user in enumerate(users, 2):
            values = self._get_user_row(user)
            self._add_row_to_xlsx(worksheet, values, row)

        workbook.save(buffer)
        buffer.seek(0)

        return buffer

    def serialize_users_to_csv(self, users: Iterable[User]) -> BytesIO:
        buffer = StringIO()
        writer = csv.writer(buffer)

        writer.writerow(self.USER_HEADERS)

        for user in users:
            writer.writerow(self._get_user_row(user))

        buffer.seek(0)
        return BytesIO(buffer.read().encode("utf-8"))

    @staticmethod
    def _get_user_row(user: User) -> List[str]:
        return [
            user.id,
            user.surname,
            user.name,
            user.patronymic,
            Permissions(user.permission).name,
            user.email,
            user.phone,
            user.city,
            user.region,
            user.school,
            user.school_class,
            user.vkontakte_id,
            user.google_id,
            user.telegram_id,
        ]

    @staticmethod
    def _add_row_to_xlsx(worksheet: Worksheet, values: Iterable[str], row: int) -> None:
        for column, value in enumerate(values, 1):
            cell = worksheet.cell(row=row, column=column)
            cell.value = value

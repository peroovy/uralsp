import csv
from enum import IntEnum, auto
from io import BytesIO, StringIO
from typing import Iterable, List, Optional, Set

from django.db.transaction import atomic
from django.forms import model_to_dict
from openpyxl import Workbook
from openpyxl.worksheet.worksheet import Worksheet

from api.internal.db.models import FormValue, User
from api.internal.db.models.user import Permissions
from api.internal.db.repositories import user_repo, form_value_repo, request_repo, participation_repo
from api.internal.db.repositories.form_value import IFormValueRepository
from api.internal.db.repositories.participation import IParticipationRepository
from api.internal.db.repositories.request import IRequestRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.users.domain.entities import Filters, ProfileIn


class OperationStatus(IntEnum):
    INTERSECTION_PARTICIPATION_ERROR = auto()
    INTERSECTION_REQUESTS_ERROR = auto()
    NOT_EQUALS_PERMISSIONS = auto()
    BAD_USER_IDS = auto()
    OK = auto()


class UserService:
    def __init__(
        self,
        user_repo: IUserRepository,
        form_value_repo: IFormValueRepository,
        request_repo: IRequestRepository,
        participation_repo: IParticipationRepository,
    ):
        self._user_repo = user_repo
        self._form_value_repo = form_value_repo
        self._request_repo = request_repo
        self._participation_repo = participation_repo

    def get_users(self, filters: Filters) -> List[User]:
        return list(
            self._user_repo.get_filtered(
                filters.permission, filters.school, filters.school_class, filters.region, filters.email, filters.fcs
            )
        )

    def get_user(self, user_id: int) -> Optional[User]:
        return self._user_repo.try_get(user_id)

    def update(self, user_id: int, data: ProfileIn) -> bool:
        return self._user_repo.update(user_id, **data.dict())

    def get_last_form_values(self, user_id: int, field_ids: Set[str]) -> List[FormValue]:
        return list(self._form_value_repo.get_lasts_for(user_id, field_ids))

    @atomic
    def merge(self, from_id: int, to_id: int) -> OperationStatus:
        if not self._user_repo.exist_all(from_id, to_id):
            return OperationStatus.BAD_USER_IDS

        if not self._user_repo.equal_permissions(from_id, to_id):
            return OperationStatus.NOT_EQUALS_PERMISSIONS

        if self._request_repo.exists_intersection(from_id, to_id):
            return OperationStatus.INTERSECTION_REQUESTS_ERROR

        if self._participation_repo.exists_intersection(from_id, to_id):
            return OperationStatus.INTERSECTION_PARTICIPATION_ERROR

        self._participation_repo.migrate(from_id, to_id)
        self._request_repo.migrate(from_id, to_id)

        from_user = self._user_repo.try_get(from_id)
        migrated_data = model_to_dict(from_user, exclude=["id"])
        from_user.delete()

        self._user_repo.update(to_id, **migrated_data)

        return OperationStatus.OK


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


user_service = UserService(user_repo, form_value_repo, request_repo, participation_repo)
document_service = DocumentService()

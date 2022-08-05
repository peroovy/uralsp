import csv
from io import BytesIO, StringIO
from typing import Iterable, List, Optional, Set

from django.db.transaction import atomic
from django.forms import model_to_dict
from openpyxl import Workbook
from openpyxl.worksheet.worksheet import Worksheet

from api.internal.db.models import FormValue, User
from api.internal.db.models.user import Permissions
from api.internal.db.repositories import form_value_repo, participation_repo, request_repo, user_repo
from api.internal.db.repositories.form_value import IFormValueRepository
from api.internal.db.repositories.participation import IParticipationRepository
from api.internal.db.repositories.request import IRequestRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.users.domain.entities import Filters, MergingIn, ProfileIn


class UserService:
    def __init__(
        self,
        user_repo: IUserRepository,
        form_value_repo: IFormValueRepository,
    ):
        self._user_repo = user_repo
        self._form_value_repo = form_value_repo

    def get_filtered(self, filters: Filters) -> List[User]:
        return list(
            self._user_repo.get_filtered(
                filters.permission,
                filters.institution_type,
                filters.institution_name,
                filters.institution_faculty,
                filters.institution_course,
                filters.region,
                filters.email,
                filters.fcs,
            )
        )

    def get_user(self, user_id: int) -> Optional[User]:
        return self._user_repo.try_get(user_id)

    @atomic
    def update(self, user: User, data: ProfileIn) -> bool:
        return self._user_repo.update(user.id, **data.dict())

    def has_access(self, user: User, permission_to_update: Permissions) -> bool:
        return user.permission == Permissions.SUPER_ADMIN or permission_to_update not in [
            Permissions.ADMIN,
            Permissions.SUPER_ADMIN,
        ]

    def get_last_form_values(self, user_id: int, field_ids: Set[str]) -> List[FormValue]:
        return list(self._form_value_repo.get_lasts_for(user_id, field_ids))

    def get_socials_amount(self, user_id: int) -> int:
        return self._user_repo.get_socials_amount(user_id)


class MergingService:
    def __init__(
        self, user_repo: IUserRepository, request_repo: IRequestRepository, participation_repo: IParticipationRepository
    ):
        self._user_repo = user_repo
        self._request_repo = request_repo
        self._participation_repo = participation_repo

    def exist_users(self, users: MergingIn) -> bool:
        return self._user_repo.exist_all(users.from_id, users.to_id)

    def equal_permissions(self, users: MergingIn) -> bool:
        return self._user_repo.equal_permissions(users.from_id, users.to_id)

    def exists_requests_intersection(self, users: MergingIn) -> bool:
        return self._request_repo.exists_intersection(users.from_id, users.to_id)

    def exists_participation_intersection(self, users: MergingIn) -> bool:
        return self._participation_repo.exists_intersection(users.from_id, users.to_id)

    @atomic
    def merge(self, users: MergingIn) -> None:
        self._participation_repo.migrate(users.from_id, users.to_id)
        self._request_repo.migrate(users.from_id, users.to_id)

        from_user = self._user_repo.try_get(users.from_id)
        migrated_data = model_to_dict(from_user, exclude=["id"])
        from_user.delete()

        self._user_repo.update(users.to_id, **migrated_data)


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


user_service = UserService(user_repo, form_value_repo)
merging_service = MergingService(user_repo, request_repo, participation_repo)
document_service = DocumentService()
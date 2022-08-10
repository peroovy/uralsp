from io import BytesIO
from typing import Iterable, List, Optional, Set, Union

from django.db.transaction import atomic
from django.forms import model_to_dict

from api.internal.db.models import FormValue, User
from api.internal.db.models.user import Institution, Permissions
from api.internal.db.repositories import competition_repo, form_value_repo, participation_repo, request_repo, user_repo
from api.internal.db.repositories.competition import ICompetitionRepository
from api.internal.db.repositories.form_value import IFormValueRepository
from api.internal.db.repositories.participation import IParticipationRepository
from api.internal.db.repositories.request import IRequestRepository
from api.internal.db.repositories.user import IUserRepository
from api.internal.users.domain.entities import CurrentProfileIn, Filters, MergingIn, ProfileIn
from api.internal.utils import serialize_to_csv, serialize_to_xlsx


class UserService:
    SORTED_PERMISSIONS = (Permissions.DEFAULT, Permissions.TEACHER, Permissions.ADMIN, Permissions.SUPER_ADMIN)

    def __init__(
        self,
        user_repo: IUserRepository,
        form_value_repo: IFormValueRepository,
        competition_repo: ICompetitionRepository,
    ):
        self._user_repo = user_repo
        self._form_value_repo = form_value_repo
        self._competition_repo = competition_repo

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
    def update(self, user: User, data: Union[ProfileIn, CurrentProfileIn]) -> bool:
        return self._user_repo.update(user.id, **data.dict())

    def can_update_permission(self, user: User, target: User, permission: Permissions) -> bool:
        if target.permission == permission:
            return True

        if self.SORTED_PERMISSIONS.index(user.permission) < self.SORTED_PERMISSIONS.index(permission):
            return False

        if target.permission == Permissions.ADMIN:
            return not self._competition_repo.exists_in_admin(target.id)

        return True

    def get_last_form_values(self, user_id: int, field_ids: Set[str]) -> List[FormValue]:
        return list(self._form_value_repo.get_lasts_for(user_id, field_ids))

    def get_socials_amount(self, user_id: int) -> int:
        return self._user_repo.get_socials_amount(user_id)

    def exists_email(self, owner: User, email: str) -> bool:
        if email is None:
            return False

        return self._user_repo.exists_email(owner.id, email)


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


class UserSerializer:
    USER_HEADERS = [
        "id",
        "surname",
        "name",
        "patronymic",
        "permission",
        "email",
        "phone",
        "city",
        "region",
        "institution_type",
        "institution_name",
        "institution_faculty",
        "institution_course",
        "vkontakte_id",
        "google_id",
        "telegram_id",
    ]

    def to_xlsx(self, users: Iterable[User]) -> BytesIO:
        return serialize_to_xlsx(self._get_rows(users))

    def to_csv(self, users: Iterable[User]) -> BytesIO:
        return serialize_to_csv(self._get_rows(users))

    def _get_rows(self, users: Iterable[User]) -> List[List[str]]:
        return [self.USER_HEADERS] + [list(map(lambda s: s or "-", self._get_user_row(user))) for user in users]

    def _get_user_row(self, user: User) -> list:
        return [
            user.id,
            user.surname,
            user.name,
            user.patronymic,
            user.permission,
            user.email,
            user.phone,
            user.city,
            user.region,
            user.institution_type,
            user.institution_name,
            user.institution_faculty,
            user.institution_course,
            user.vkontakte_id,
            user.google_id,
            user.telegram_id,
        ]


user_service = UserService(user_repo, form_value_repo, competition_repo)
merging_service = MergingService(user_repo, request_repo, participation_repo)
user_serializer = UserSerializer()

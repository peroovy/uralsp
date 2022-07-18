from api.internal.db.models import User
from api.internal.db.repositories.user import IUserRepository
from api.internal.users.domain.entities import DefaultProfileIn


class UserService:
    def __init__(self, user_repo: IUserRepository):
        self._user_repo = user_repo

    def update_profile(self, user: User, data: DefaultProfileIn) -> None:
        self._user_repo.update(user.id, **data.dict())

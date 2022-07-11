from api.internal.db.repositories.refresh_token import RefreshTokenRepository
from api.internal.db.repositories.user import UserRepository

user_repo = UserRepository()
refresh_repo = RefreshTokenRepository()

__all__ = ["user_repo", "refresh_repo"]

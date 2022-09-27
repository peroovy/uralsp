from abc import ABC, abstractmethod
from typing import Optional

from api.internal.db.models import RefreshToken


class IRefreshTokenRepository(ABC):
    @abstractmethod
    def try_get(self, value: str) -> Optional[RefreshToken]:
        ...

    @abstractmethod
    def get_or_create(self, user_id: int, value: str) -> RefreshToken:
        ...

    @abstractmethod
    def revoke_all(self, user_id: int) -> None:
        ...


class RefreshTokenRepository(IRefreshTokenRepository):
    def try_get(self, value: str) -> Optional[RefreshToken]:
        return RefreshToken.objects.filter(value=value).first()

    def get_or_create(self, user_id: int, value: str) -> RefreshToken:
        return RefreshToken.objects.get_or_create(user_id=user_id, value=value)[0]

    def revoke_all(self, user_id: int) -> None:
        RefreshToken.objects.filter(user_id=user_id).update(revoked=True)

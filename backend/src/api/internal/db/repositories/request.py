from abc import ABC, abstractmethod
from typing import Optional

from django.db.models import QuerySet

from api.internal.db.models import Request
from api.internal.db.models.request import RequestStatus


class IRequestRepository(ABC):
    @abstractmethod
    def get_requests(self, owner_id: int) -> QuerySet[Request]:
        ...

    @abstractmethod
    def get_request(self, request_id: int) -> Optional[Request]:
        ...

    @abstractmethod
    def get_requests_on_competition(self, competition_id: int) -> QuerySet[Request]:
        ...

    @abstractmethod
    def create(self, owner_id: int, competition_id: int, team_name: str) -> Request:
        ...

    @abstractmethod
    def exists(self, owner_id: int, request_id: int) -> bool:
        ...

    @abstractmethod
    def exists_request_on_competition(self, owner_id: int, competition_id: int) -> bool:
        ...

    @abstractmethod
    def update(self, request_id: int, team_name: str, status: RequestStatus, description: Optional[str]) -> None:
        ...

    @abstractmethod
    def cancel(self, request_id: int) -> None:
        ...


class RequestRepository(IRequestRepository):
    def get_requests(self, owner_id: int) -> QuerySet[Request]:
        return Request.objects.filter(owner_id=owner_id)

    def get_request(self, request_id: int) -> Optional[Request]:
        return Request.objects.filter(id=request_id).first()

    def get_requests_on_competition(self, competition_id: int) -> QuerySet[Request]:
        return Request.objects.filter(competition_id=competition_id)

    def create(self, owner_id: int, competition_id: int, team_name: str) -> Request:
        return Request.objects.create(owner_id=owner_id, competition_id=competition_id, team_name=team_name)

    def exists(self, owner_id: int, request_id: int) -> bool:
        return Request.objects.filter(id=request_id, owner_id=owner_id).exists()

    def exists_request_on_competition(self, owner_id: int, competition_id: int) -> bool:
        return Request.objects.filter(owner_id=owner_id, competition_id=competition_id).exists()

    def update(self, request_id: int, team_name: str, status: RequestStatus, description: Optional[str]) -> None:
        Request.objects.filter(id=request_id).select_for_update().update(
            team_name=team_name, status=status, description=description
        )

    def cancel(self, request_id: int) -> None:
        Request.objects.filter(id=request_id).select_for_update().update(status=RequestStatus.CANCELED)

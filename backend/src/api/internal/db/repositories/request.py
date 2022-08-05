from abc import ABC, abstractmethod
from typing import List, Optional

from django.db.models import Prefetch, QuerySet

from api.internal.db.models import FormValue, Request
from api.internal.db.models.request import RequestStatus


class IRequestRepository(ABC):
    @abstractmethod
    def get_requests(self, owner_id: int) -> QuerySet[Request]:
        ...

    @abstractmethod
    def try_get_request(self, request_id: int) -> Optional[Request]:
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
    def update(self, request_id: int, **kwargs) -> int:
        ...

    @abstractmethod
    def exists_intersection(self, owner_id_1: int, owner_id_2: int) -> bool:
        ...

    @abstractmethod
    def migrate(self, from_owner_id: int, to_owner_id: int) -> int:
        ...

    @abstractmethod
    def try_get_request_with_participation_and_forms(self, request_id: int) -> Optional[Request]:
        ...


class RequestRepository(IRequestRepository):
    def get_requests(self, owner_id: int) -> QuerySet[Request]:
        return Request.objects.filter(owner_id=owner_id)

    def try_get_request(self, request_id: int) -> Optional[Request]:
        return Request.objects.filter(id=request_id).first()

    def create(self, owner_id: int, competition_id: int, team_name: str) -> Request:
        return Request.objects.create(owner_id=owner_id, competition_id=competition_id, team_name=team_name)

    def exists(self, owner_id: int, request_id: int) -> bool:
        return Request.objects.filter(id=request_id, owner_id=owner_id).exists()

    def exists_request_on_competition(self, owner_id: int, competition_id: int) -> bool:
        return Request.objects.filter(owner_id=owner_id, competition_id=competition_id).exists()

    def update(self, request_id: int, **kwargs) -> int:
        return Request.objects.filter(id=request_id).select_for_update().update(**kwargs)

    def exists_intersection(self, owner_id_1: int, owner_id_2: int) -> bool:
        return Request.objects.filter(
            owner_id=owner_id_1, competition=Request.objects.filter(owner_id=owner_id_2).values("competition")[:1]
        ).exists()

    def migrate(self, from_owner_id: int, to_owner_id: int) -> int:
        return Request.objects.filter(owner_id=from_owner_id).select_for_update().update(owner_id=to_owner_id)

    def try_get_request_with_participation_and_forms(self, request_id: int) -> Optional[Request]:
        return (
            Request.objects.filter(id=request_id)
            .prefetch_related(
                "participation", Prefetch("participation__form", queryset=FormValue.objects.order_by("field_id"))
            )
            .first()
        )

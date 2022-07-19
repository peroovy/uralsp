from abc import ABC, abstractmethod

from django.db.models import QuerySet

from api.internal.db.models import Participation


class IParticipationRepository(ABC):
    @abstractmethod
    def create(self, request_id: int, user_id: int) -> Participation:
        ...

    @abstractmethod
    def delete_all(self, request_id: int) -> None:
        ...

    @abstractmethod
    def get_all(self, request_id: int) -> QuerySet[Participation]:
        ...


class ParticipationRepository(IParticipationRepository):
    def create(self, request_id: int, user_id: int) -> Participation:
        return Participation.objects.create(request_id=request_id, user_id=user_id)

    def delete_all(self, request_id: int) -> None:
        Participation.objects.filter(request_id=request_id).delete()

    def get_all(self, request_id: int) -> QuerySet[Participation]:
        return Participation.objects.filter(request_id=request_id).prefetch_related("form")

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
    def get_with_forms(self, request_id) -> QuerySet[Participation]:
        ...

    @abstractmethod
    def exists_intersection(self, user_id_1: int, user_id_2: int) -> bool:
        ...

    @abstractmethod
    def migrate(self, from_user_id: int, to_user_id: int) -> int:
        ...


class ParticipationRepository(IParticipationRepository):
    def create(self, request_id: int, user_id: int) -> Participation:
        return Participation.objects.create(request_id=request_id, user_id=user_id)

    def delete_all(self, request_id: int) -> None:
        Participation.objects.filter(request_id=request_id).delete()

    def get_with_forms(self, request_id: int) -> QuerySet[Participation]:
        return Participation.objects.filter(request_id=request_id).prefetch_related("form")

    def exists_intersection(self, user_id_1: int, user_id_2: int) -> bool:
        return Participation.objects.filter(
            user_id=user_id_1, request=Participation.objects.filter(user_id=user_id_2).values("request")[:1]
        ).exists()

    def migrate(self, from_user_id: int, to_user_id: int) -> int:
        return Participation.objects.filter(user_id=from_user_id).select_for_update().update(user_id=to_user_id)

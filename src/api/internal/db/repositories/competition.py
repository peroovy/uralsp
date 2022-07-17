from abc import ABC, abstractmethod
from typing import Optional

from django.db.models import QuerySet

from api.internal.db.models import Competition, Field


class ICompetitionRepository(ABC):
    @abstractmethod
    def get(self, competition_id: int) -> Optional[Competition]:
        ...

    @abstractmethod
    def get_fields(self, competition_id: int) -> QuerySet[Field]:
        ...

    @abstractmethod
    def exists(self, competition_id: int) -> bool:
        ...


class CompetitionRepository(ICompetitionRepository):
    def get(self, competition_id: int) -> Optional[Competition]:
        return Competition.objects.filter(id=competition_id).first()

    def get_fields(self, competition_id: int) -> QuerySet[Field]:
        return Competition.objects.prefetch_related("fields").get(id=competition_id).fields.all()

    def exists(self, competition_id: int) -> bool:
        return Competition.objects.filter(id=competition_id).exists()

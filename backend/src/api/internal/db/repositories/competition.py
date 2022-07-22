from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional

from django.db.models import QuerySet
from django.utils.timezone import now

from api.internal.db.models import Competition, Field


class ICompetitionRepository(ABC):
    @abstractmethod
    def get(self, competition_id: int) -> Optional[Competition]:
        ...

    @abstractmethod
    def get_for_update(self, competition_id: int) -> Competition:
        ...

    @abstractmethod
    def get_fields(self, competition_id: int) -> QuerySet[Field]:
        ...

    @abstractmethod
    def exists(self, competition_id: int) -> bool:
        ...

    @abstractmethod
    def get_filtered(
        self, name: Optional[str], admin_id: Optional[int], is_opened: Optional[bool], is_started: Optional[bool]
    ) -> QuerySet[Competition]:
        ...

    @abstractmethod
    def create(
        self, name: str, started_at: datetime, registration_before: datetime, end_at: datetime, person_amount: int, request_template: Optional[str]
    ) -> Competition:
        ...

    @abstractmethod
    def delete(self, competition_id: int) -> None:
        ...

    @abstractmethod
    def update_request_template(self, competition_id: int, request_template: Optional[str]) -> None:
        ...


class CompetitionRepository(ICompetitionRepository):
    def get(self, competition_id: int) -> Optional[Competition]:
        return (
            Competition.objects.filter(id=competition_id)
            .prefetch_related("fields", "fields__default_values", "requests")
            .first()
        )

    def get_for_update(self, competition_id: int) -> Competition:
        return Competition.objects.select_for_update().get(id=competition_id)

    def get_fields(self, competition_id: int) -> QuerySet[Field]:
        return Competition.objects.prefetch_related("fields").get(id=competition_id).fields.all()

    def exists(self, competition_id: int) -> bool:
        return Competition.objects.filter(id=competition_id).exists()

    def get_filtered(
        self, name: Optional[str], admin_id: Optional[int], is_opened: Optional[bool], is_started: Optional[bool]
    ) -> QuerySet[Competition]:
        now_ = now()

        attr = dict(
            (key, value) for key, value in [["name__istartswith", name], ["admins__id", admin_id]] if value is not None
        )

        if is_opened is not None:
            attr[f"registration_before__{'gt' if is_opened else 'lte'}"] = now_

        if is_started is not None:
            attr[f"started_at__{'lte' if is_started else 'gt'}"] = now_

        return Competition.objects.filter(**attr)

    def create(
        self, name: str, started_at: datetime, registration_before: datetime, end_at: datetime, persons_amount: int, request_template: Optional[str]
    ) -> Competition:
        return Competition.objects.create(
            name=name,
            started_at=started_at,
            registration_before=registration_before,
            end_at=end_at,
            persons_amount=persons_amount,
            request_template=request_template
        )

    def delete(self, competition_id: int) -> None:
        Competition.objects.filter(id=competition_id).delete()

    def update_request_template(self, competition_id: int, request_template: Optional[str]) -> None:
        Competition.objects.filter(id=competition_id).select_for_update().update(request_template=request_template)
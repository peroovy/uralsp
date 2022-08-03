from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional

from django.db.models import QuerySet
from django.utils.timezone import now

from api.internal.db.models import Competition, Field
from api.internal.utils import get_strip_filters


class ICompetitionRepository(ABC):
    @abstractmethod
    def try_get(self, competition_id: int) -> Optional[Competition]:
        ...

    @abstractmethod
    def get_for_update(self, competition_id: int) -> Competition:
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
        self,
        name: str,
        started_at: datetime,
        registration_before: datetime,
        end_at: datetime,
        person_amount: int,
        request_template: Optional[str],
    ) -> Competition:
        ...

    @abstractmethod
    def delete(self, competition_id: int) -> bool:
        ...

    @abstractmethod
    def update(self, competition_id: int, **kwargs) -> bool:
        ...

    @abstractmethod
    def is_admin(self, competition_id: int, user_id: int) -> bool:
        ...

    @abstractmethod
    def get_form(self, competition_id: int) -> QuerySet[Field]:
        ...


class CompetitionRepository(ICompetitionRepository):
    def try_get(self, competition_id: int) -> Optional[Competition]:
        return Competition.objects.filter(id=competition_id).first()

    def get_for_update(self, competition_id: int) -> Competition:
        return Competition.objects.select_for_update().get(id=competition_id)

    def exists(self, competition_id: int) -> bool:
        return Competition.objects.filter(id=competition_id).exists()

    def get_filtered(
        self, name: Optional[str], admin_id: Optional[int], is_opened: Optional[bool], is_started: Optional[bool]
    ) -> QuerySet[Competition]:
        now_ = now()
        filters = get_strip_filters(name__istartswith=name)

        if admin_id is not None:
            filters["admins__id"] = admin_id

        if is_opened is not None:
            filters[f"registration_before__{'gt' if is_opened else 'lte'}"] = now_

        if is_started is not None:
            filters[f"started_at__{'lte' if is_started else 'gt'}"] = now_

        return Competition.objects.filter(**filters)

    def create(
        self,
        name: str,
        started_at: datetime,
        registration_before: datetime,
        end_at: datetime,
        persons_amount: int,
        request_template: Optional[str],
    ) -> Competition:
        return Competition.objects.create(
            name=name,
            started_at=started_at,
            registration_before=registration_before,
            end_at=end_at,
            persons_amount=persons_amount,
            request_template=request_template,
        )

    def delete(self, competition_id: int) -> bool:
        return Competition.objects.filter(id=competition_id).delete()[0] > 0

    def update(self, competition_id: int, **kwargs) -> bool:
        return Competition.objects.filter(id=competition_id).select_for_update().update(**kwargs) > 0

    def is_admin(self, competition_id: int, user_id: int) -> bool:
        return Competition.objects.filter(id=competition_id, admins__id=user_id).exists()

    def get_form(self, competition_id: int) -> QuerySet[Field]:
        return Competition.objects.prefetch_related("fields__default_values").get(id=competition_id).fields.all()

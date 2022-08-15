from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional, Set

from django.db.models import Prefetch, Q, QuerySet
from django.utils.timezone import now

from api.internal.db.models import Competition, Field, FormValue
from api.internal.db.models.request import Request, RequestStatus
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
        registration_start: datetime,
        registration_end: datetime,
        started_at: datetime,
        person_amount: int,
        request_template: Optional[str],
        link: Optional[str],
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

    @abstractmethod
    def try_get_with_requests(self, competition_id: int) -> Optional[Competition]:
        ...

    @abstractmethod
    def try_get_with_requests_for_serialization(
        self, competition_id: int, status: RequestStatus = None, fields: Set[str] = None
    ) -> Optional[Competition]:
        ...

    @abstractmethod
    def exists_in_admin(self, user_id: int) -> bool:
        ...


class CompetitionRepository(ICompetitionRepository):
    def try_get(self, competition_id: int) -> Optional[Competition]:
        return Competition.objects.filter(id=competition_id).first()

    def get_for_update(self, competition_id: int) -> Competition:
        return Competition.objects.select_for_update().get(id=competition_id)

    def try_get_with_requests(self, competition_id: int) -> Optional[Competition]:
        return (
            Competition.objects.filter(id=competition_id).prefetch_related("requests", "requests__participants").first()
        )

    def exists(self, competition_id: int) -> bool:
        return Competition.objects.filter(id=competition_id).exists()

    def get_filtered(
        self, name: Optional[str], admin_id: Optional[int], is_opened: Optional[bool], is_started: Optional[bool]
    ) -> QuerySet[Competition]:
        now_ = now()
        filters = get_strip_filters(name__istartswith=name)

        if admin_id is not None:
            filters["admins__id"] = admin_id

        if is_started is not None:
            filters[f"started_at__{'lte' if is_started else 'gt'}"] = now_

        queryset = Competition.objects.filter(**filters)

        if is_opened is not None:
            opened = Q(registration_start__lte=now_) & Q(registration_end__gt=now_)
            queryset = queryset.filter(opened if is_opened else ~opened)

        return queryset

    def create(
        self,
        name: str,
        registration_start: datetime,
        registration_end: datetime,
        started_at: datetime,
        persons_amount: int,
        request_template: Optional[str],
        link: Optional[str],
    ) -> Competition:
        return Competition.objects.create(
            name=name,
            registration_start=registration_start,
            registration_end=registration_end,
            started_at=started_at,
            persons_amount=persons_amount,
            request_template=request_template,
            link=link,
        )

    def delete(self, competition_id: int) -> bool:
        return Competition.objects.filter(id=competition_id).delete()[0] > 0

    def update(self, competition_id: int, **kwargs) -> bool:
        return Competition.objects.filter(id=competition_id).select_for_update().update(**kwargs) > 0

    def is_admin(self, competition_id: int, user_id: int) -> bool:
        return Competition.objects.filter(id=competition_id, admins__id=user_id).exists()

    def get_form(self, competition_id: int) -> QuerySet[Field]:
        return Competition.objects.prefetch_related("fields__default_values").get(id=competition_id).fields.all()

    def try_get_with_requests_for_serialization(
        self, competition_id: int, status: RequestStatus = None, fields: Set[str] = None
    ) -> Optional[Competition]:
        queryset = Competition.objects.filter(id=competition_id).prefetch_related(
            Prefetch("requests", queryset=Request.objects.filter(**({"status": status} if status is not None else {}))),
            Prefetch(
                "fields",
                queryset=Field.objects.filter(**({"id__in": fields} if fields is not None else {})).order_by("id"),
            ),
            "requests__participation",
            Prefetch(
                "requests__participation__form",
                queryset=FormValue.objects.filter(**({"field_id__in": fields} if fields is not None else {})).order_by(
                    "field_id"
                ),
            ),
        )

        return queryset.first()

    def exists_in_admin(self, user_id: int) -> bool:
        return Competition.objects.filter(admins__id=user_id).exists()

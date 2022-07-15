from abc import ABC, abstractmethod

from django.db.models import QuerySet

from api.internal.db.models import Field


class IFieldRepository(ABC):
    pass


class FieldRepository(IFieldRepository):
    pass

from typing import Set

from ninja import Schema

from api.internal.db.models.request import RequestStatus
from api.internal.requests.domain.entities import RequestOut


class CompetitionRequestOut(RequestOut):
    pass


class SerializerParams(Schema):
    fields: Set[str] = None
    status: RequestStatus = None
    has_headers: bool = False

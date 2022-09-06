from typing import Set

from ninja import ModelSchema, Schema

from api.internal.db.models import Request
from api.internal.db.models.request import RequestStatus


class CompetitionRequestOut(ModelSchema):
    class Config:
        model = Request
        model_fields = ["id", "owner", "status", "description", "created_at", "participants"]


class SerializerParams(Schema):
    fields: Set[str] = None
    status: RequestStatus = None
    has_headers: bool = False

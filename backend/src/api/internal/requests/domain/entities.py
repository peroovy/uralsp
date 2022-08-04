from datetime import datetime
from enum import IntEnum
from typing import Iterable, List, Optional

from ninja import ModelSchema, Schema

from api.internal.db.models import Participation, Request


class Status(IntEnum):
    ACCEPTED = 1
    REJECTED = 2


class FieldValueSchema(Schema):
    field_id: str
    value: str


class ParticipationSchema(Schema):
    user_id: int
    form: List[FieldValueSchema]


class FormsIn(Schema):
    team_name: str
    team: List[ParticipationSchema]


class RequestIn(FormsIn):
    competition_id: int


class RequestOut(ModelSchema):
    class Config:
        model = Request
        model_fields = "__all__"


class RequestDetailsOut(Schema):
    id: int
    owner: int
    competition: int
    team_name: str
    status: int
    description: Optional[str]
    created_at: datetime
    participants: List[ParticipationSchema]


class SwitchOut(Schema):
    is_canceled: bool


class ProcessIn(Schema):
    status: Status
    description: Optional[str] = None

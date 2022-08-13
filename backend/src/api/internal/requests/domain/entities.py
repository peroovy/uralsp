from datetime import datetime
from typing import List, Optional

from ninja import ModelSchema, Schema

from api.internal.db.models import Request
from api.internal.db.models.request import RequestStatus


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
    competition: int


class RequestOut(ModelSchema):
    class Config:
        model = Request
        model_fields = "__all__"


class RequestDetailsOut(Schema):
    id: int
    owner: int
    competition: int
    team_name: str
    status: str
    description: Optional[str]
    created_at: datetime
    participants: List[ParticipationSchema]


class SwitchOut(Schema):
    is_canceled: bool


class ProcessIn(Schema):
    status: RequestStatus
    description: Optional[str] = None

from datetime import datetime
from typing import List, Optional

from ninja import ModelSchema, Schema

from api.internal.db.models import Request, User


class DefaultProfileOut(ModelSchema):
    class Config:
        model = User
        model_fields = "__all__"


class DefaultProfileIn(ModelSchema):
    class Config:
        model = User
        model_exclude = ["vkontakte_id", "google_id", "telegram_id"]


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

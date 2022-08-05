from enum import IntEnum
from typing import List, Optional, Set

from django.conf import settings
from ninja import Field as F, ModelSchema, Schema

from api.internal.db.models import Competition, Field, Request


class Filters(Schema):
    name: Optional[str] = None
    admin: Optional[int] = None
    opened: Optional[bool] = None
    started: Optional[bool] = None


class CompetitionOut(ModelSchema):
    class Config:
        model = Competition
        model_exclude = ["fields", "admins"]


class CompetitionIn(ModelSchema):
    persons_amount: int = F(ge=settings.MIN_PARTICIPANTS_AMOUNT)
    fields: List[str]
    admins: List[int]

    class Config:
        model = Competition
        model_exclude = ["id", "fields", "admins"]


class CompetitionFieldOut(ModelSchema):
    class Config:
        model = Field
        model_fields = "__all__"


class FieldDetailsOut(ModelSchema):
    default_values: List[str]

    class Config:
        model = Field
        model_fields = "__all__"


class CompetitionDetailsOut(ModelSchema):
    fields: List[CompetitionFieldOut]

    class Config:
        model = Competition
        model_exclude = ["admins"]


class RequestOut(ModelSchema):
    class Config:
        model = Request
        model_fields = ["id", "owner", "status", "description", "created_at", "participants"]


class FormIn(Schema):
    fields: List[str]


class AdminsIn(Schema):
    admins: List[int]


class RequestTemplateIn(Schema):
    request_template: Optional[str]


class Status(IntEnum):
    AWAITED = 0
    ACCEPTED = 1
    REJECTED = 2
    CANCELED = 3


class RequestsSerializationIn(Schema):
    fields: Set[str] = None
    status: Status = None
    has_headers: bool = False

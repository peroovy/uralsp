from typing import List, Optional

from django.conf import settings
from ninja import Field as F, ModelSchema, Schema

from api.internal.db.models import Competition, Field


class CompetitionFilters(Schema):
    name: Optional[str] = None
    admin: Optional[int] = None
    opened: Optional[bool] = None
    started: Optional[bool] = None


class CompetitionOut(ModelSchema):
    class Config:
        model = Competition
        model_exclude = ["fields", "admins"]


class CompetitionIn(ModelSchema):
    persons_amount: int = F(default=settings.MIN_PARTICIPANTS_AMOUNT, gte=settings.MIN_PARTICIPANTS_AMOUNT)
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
        model_fields = "__all__"


class FormIn(Schema):
    fields: List[str]


class AdminsIn(Schema):
    admins: List[int]


class RequestTemplateIn(Schema):
    request_template: Optional[str]

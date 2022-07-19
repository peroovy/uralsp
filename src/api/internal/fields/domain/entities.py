from typing import List

from ninja import ModelSchema, Schema

from api.internal.db.models import Field


class FieldSchema(ModelSchema):
    default_values: List[str]

    class Config:
        model = Field
        model_fields = "__all__"


class FieldIn(ModelSchema):
    default_values: List[str]

    class Config:
        model = Field
        model_exclude = ["id"]


class FieldFilters(Schema):
    search: str = ""

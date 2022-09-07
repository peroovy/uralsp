from typing import List, Optional

from ninja import Field as F, ModelSchema, Schema

from api.internal.db.models import Field


class FieldSchema(ModelSchema):
    default_values: List[str]

    class Config:
        model = Field
        model_fields = "__all__"


class FieldUpdatingIn(ModelSchema):
    default_values: List[str]

    class Config:
        model = Field
        model_exclude = ["id"]


class FieldsFilters(Schema):
    search: Optional[str] = F(None, description="a search by id and name")

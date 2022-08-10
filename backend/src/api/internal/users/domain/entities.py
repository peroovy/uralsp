from enum import Enum
from typing import Optional

from ninja import ModelSchema, Schema
from pydantic import EmailStr, Field

from api.internal.db.models import User
from api.internal.db.models.user import Institution, Permissions

PHONE_REGEX = r"^\+[0-9]{1}[1-9]{10}$"


class ProfileOut(ModelSchema):
    class Config:
        model = User
        model_fields = ["id", "surname", "name", "patronymic"]


class FullProfileOut(ModelSchema):
    class Config:
        model = User
        model_fields = "__all__"


class ProfileIn(ModelSchema):
    permission: Permissions
    institution_type: Institution
    phone: Optional[str] = Field(regex=PHONE_REGEX)
    email: Optional[EmailStr]

    class Config:
        model = User
        model_exclude = ["id", "vkontakte_id", "google_id", "telegram_id"]


class CurrentProfileIn(ModelSchema):
    institution_type: Institution
    phone: Optional[str] = Field(regex=PHONE_REGEX)
    email: Optional[EmailStr]

    class Config:
        model = User
        model_exclude = ["id", "permission", "vkontakte_id", "google_id", "telegram_id"]


class Filters(Schema):
    permission: Optional[Permissions] = None
    region: Optional[str] = None
    email: Optional[str] = None
    fcs: Optional[str] = None
    institution_type: Optional[Institution] = None
    institution_name: Optional[str] = None
    institution_faculty: Optional[str] = None
    institution_course: Optional[str] = None


class FormValueOut(Schema):
    id: str
    value: str


class MergingIn(Schema):
    from_id: int
    to_id: int

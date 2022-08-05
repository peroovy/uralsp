from enum import IntEnum
from typing import Optional

from ninja import ModelSchema, Schema
from pydantic import EmailStr, Field

from api.internal.db.models import User


class ProfileOut(ModelSchema):
    class Config:
        model = User
        model_fields = ["id", "surname", "name", "patronymic"]


class FullProfileOut(ModelSchema):
    class Config:
        model = User
        model_fields = "__all__"


class ProfileIn(ModelSchema):
    phone: Optional[str] = Field(regex=r"^\+7[0-9]{10}")
    email: Optional[str] = EmailStr()

    class Config:
        model = User
        model_exclude = ["id", "vkontakte_id", "google_id", "telegram_id"]


class CurrentProfileIn(ProfileIn):
    class Config:
        model = User
        model_exclude = ["id", "permission", "vkontakte_id", "google_id", "telegram_id"]


class PermissionsIn(IntEnum):
    DEFAULT = 0
    TEACHER = 1
    ADMIN = 2
    SUPER_ADMIN = 3


class InstitutionTypes(IntEnum):
    SCHOOL = 0
    COLLEGE = 1
    UNIVERSITY = 2


class Filters(Schema):
    permission: Optional[PermissionsIn] = None
    region: Optional[str] = None
    email: Optional[str] = None
    fcs: Optional[str] = None
    institution_type: Optional[InstitutionTypes] = None
    institution_name: Optional[str] = None
    institution_faculty: Optional[str] = None
    institution_course: Optional[str] = None


class FormValueOut(Schema):
    id: str
    value: str


class MergingIn(Schema):
    from_id: int
    to_id: int
from enum import IntEnum

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
    phone: str = Field(regex=r"^\+7[0-9]{10}")
    email: str = EmailStr()

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


class Filters(Schema):
    permission: PermissionsIn = None
    school: str = ""
    school_class: str = ""
    region: str = ""
    email: str = ""
    fcs: str = ""

from ninja import ModelSchema
from pydantic import EmailStr, Field

from api.internal.db.models import User


class DefaultProfileOut(ModelSchema):
    class Config:
        model = User
        model_fields = "__all__"


class DefaultProfileIn(ModelSchema):
    phone: str = Field(regex=r"^\+7[0-9]{10}")
    email: str = EmailStr()

    class Config:
        model = User
        model_exclude = ["id", "permission", "vkontakte_id", "google_id", "telegram_id"]

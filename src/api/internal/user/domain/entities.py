from datetime import datetime
from typing import List, Optional, Iterable

from ninja import ModelSchema, Schema

from api.internal.db.models import Request, User, Participation


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

    @staticmethod
    def create(request: Request, participants: Iterable[Participation]) -> "RequestDetailsOut":
        participation_outs = []
        for participation in participants:
            field_values = [
                FieldValueSchema(field_id=field_value.field_id, value=field_value.value)
                for field_value in participation.form.all()
            ]
            participation_outs.append(ParticipationSchema(user_id=participation.user_id, form=field_values))

        return RequestDetailsOut(
            id=request.id,
            owner=request.owner_id,
            competition=request.competition_id,
            team_name=request.team_name,
            status=request.status,
            description=request.description,
            created_at=request.created_at,
            participants=participation_outs,
        )


class SwitchOut(Schema):
    is_canceled: bool

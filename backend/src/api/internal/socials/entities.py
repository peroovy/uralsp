from typing import Optional

from ninja import Schema


class VKCredentialsIn(Schema):
    uid: int
    first_name: str
    last_name: str
    hash: str


class GoogleCredentialsIn(Schema):
    id_token: str


class TelegramCredentialsIn(Schema):
    id: int
    first_name: str
    last_name: Optional[str] = None
    username: Optional[str] = None
    photo_url: Optional[str] = None
    auth_date: int
    hash: str

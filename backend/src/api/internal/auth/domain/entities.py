from ninja import Schema


class VKLoginIn(Schema):
    access_token: str


class GoogleLoginIn(Schema):
    id_token: str


class TokenDetailsOut(Schema):
    token_type: str = "bearer"
    access_token: str
    expires_in: int

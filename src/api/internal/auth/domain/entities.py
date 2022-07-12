from ninja import Schema


class VKLoginIn(Schema):
    access_token: str
    service_token: str
    name: str
    surname: str


class TokenDetailsOut(Schema):
    token_type: str = "bearer"
    access_token: str
    expires_in: float

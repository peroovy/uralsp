from ninja import Schema


class VKCredentialsIn(Schema):
    access_token: str


class GoogleCredentialsIn(Schema):
    id_token: str


class TokenDetailsOut(Schema):
    token_type: str = "bearer"
    access_token: str
    expires_in: int

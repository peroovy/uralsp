from ninja import Schema


class SocialLoginIn(Schema):
    client_id: int
    client_secret: str
    code: str


class TokenDetailsOut(Schema):
    token_type: str = "bearer"
    access_token: str
    expires_in: float

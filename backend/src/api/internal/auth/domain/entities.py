from ninja import Schema


class TokenDetailsOut(Schema):
    token_type: str = "bearer"
    access_token: str
    expires_in: int

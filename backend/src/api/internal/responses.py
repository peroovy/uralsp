from ninja import Schema


class ErrorResponse(Schema):
    error: str = "error"
    detail: str = "info"


class SuccessResponse(Schema):
    detail: str = "Success"

from ninja import Schema


class ErrorResponse(Schema):
    error: str = "error"
    details: str = "info"


class SuccessResponse(Schema):
    details: str = "Success"

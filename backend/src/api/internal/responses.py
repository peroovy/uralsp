from ninja import Schema


class ErrorResponse(Schema):
    error: str = "error"
    message: str = "info"


class SuccessResponse(Schema):
    message: str = "Success"

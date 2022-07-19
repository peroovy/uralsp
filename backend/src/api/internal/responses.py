from ninja import Schema


class ErrorResponse(Schema):
    error: str = "info"


class SuccessResponse(Schema):
    message: str = "Success"

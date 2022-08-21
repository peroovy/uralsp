from uuid import UUID

from loguru import logger

INTERNAL_ERROR = "Internal error"


def log(handler_name: str, operation_id: UUID, message: str, **kwargs) -> str:
    return f"{handler_name.upper()} {operation_id}: {message.capitalize()} {' '.join(_get_key_value(key, value) for key, value in kwargs.items())}"


def catch(handler: str, operation_id: UUID, **log_kwargs):
    return logger.catch(
        reraise=True,
        message=log(handler, operation_id, INTERNAL_ERROR, **log_kwargs),
        onerror=lambda exc: _set_attributes(exc, operation_id),
    )


def _set_attributes(exception: Exception, operation_id: UUID) -> None:
    exception.operation_id = operation_id


def _get_key_value(key, value) -> str:
    return '{key}="{value}"'.format(key=key, value=value)

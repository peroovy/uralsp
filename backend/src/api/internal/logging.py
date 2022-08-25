import types
from functools import partial, wraps
from typing import Callable
from uuid import UUID, uuid4

from django.conf import settings
from loguru import logger
from loguru._logger import Logger

from api.internal.exceptions import API_EXCEPTIONS

INTERNAL_ERROR = "Internal error"
MODULE, HANDLER_NAME, OPERATION_ID = "module", "handler_name", "operation_id"


def catch(func: Callable) -> Callable:
    @wraps(func)
    def wrapper(*args, **kwargs):
        module, name, operation_id = func.__module__, func.__name__, uuid4()

        patched = get_patched(module, name)
        message = log(operation_id, INTERNAL_ERROR) + f"args={args} kwargs=({_get_kwargs(kwargs)})"

        with patched.catch(
            reraise=True,
            message=message,
            exclude=API_EXCEPTIONS,
            onerror=lambda exc: _set_attrs(exc, module, name, operation_id),
        ):
            return partial(func, _operation_id=operation_id)(*args, **kwargs)

    return wrapper


def log(operation_id: UUID, message: str, **kwargs) -> str:
    return f"Operation={operation_id}: {message.capitalize()} {_get_kwargs(kwargs)}"


def telegram_logging(exception: Exception) -> None:
    patched = get_patched(module=getattr(exception, MODULE), handler_name=getattr(exception, HANDLER_NAME))
    operation_id = getattr(exception, OPERATION_ID)

    patched.bind(telegram=True).error(log(operation_id, str(exception))[: settings.TELEGRAM_CHARACTERS_LIMIT])


def get_patched(module: str, handler_name: str) -> Logger:
    return logger.patch(lambda r: r.update(name=module, function=handler_name))


def _get_kwargs(kwargs) -> str:
    return " ".join(f'{key}="{value}"' for key, value in kwargs.items())


def _set_attrs(exception: Exception, module: str, handler_name: str, operation_id: UUID) -> None:
    setattr(exception, MODULE, module)
    setattr(exception, HANDLER_NAME, handler_name)
    setattr(exception, OPERATION_ID, operation_id)

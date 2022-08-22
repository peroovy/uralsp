import types
import uuid
from functools import wraps
from typing import Callable
from uuid import UUID

from django.conf import settings
from loguru import logger
from loguru._logger import Logger

INTERNAL_ERROR = "Internal error"
NAME, FUNCTION, OPERATION_ID = "name", "function", "operation_id"


class LoggingMetaclass(type):
    def __new__(mcs, cls_name: str, bases: tuple, attrs: dict):
        for name, value in attrs.items():
            if not isinstance(value, types.FunctionType) or name == "<lambda>" or name.startswith("_"):
                continue

            attrs[name] = catch(value)

        return super(LoggingMetaclass, mcs).__new__(mcs, cls_name, bases, attrs)


def catch(func: Callable) -> Callable:
    @wraps(func)
    def wrapper(*args, **kwargs):
        name, function, operation_id = func.__module__, func.__name__, uuid.uuid4()

        patched = get_patched(name, function)
        message = log(operation_id, INTERNAL_ERROR) + f"args={args} kwargs=({_get_kwargs(**kwargs)})"

        with patched.catch(
            reraise=True, message=message, onerror=lambda exc: _set_attrs(exc, name, function, operation_id)
        ):
            if OPERATION_ID in kwargs:
                kwargs[OPERATION_ID] = operation_id

            return func(*args, **kwargs)

    return wrapper


def log(operation_id: UUID, message: str, **kwargs) -> str:
    return f"Operation={operation_id}: {message.capitalize()} {_get_kwargs(**kwargs)}"


def telegram_logging(exception: Exception) -> None:
    patched = get_patched(name=getattr(exception, NAME), function=getattr(exception, FUNCTION))

    patched.bind(telegram=True).error(str(exception)[: settings.TELEGRAM_CHARACTERS_LIMIT])


def get_patched(name: str, function: str) -> Logger:
    return logger.patch(lambda r: r.update(name=name, function=function))


def _get_kwargs(**kwargs) -> str:
    return " ".join(f'{key}="{value}"' for key, value in kwargs.items())


def _set_attrs(exception: Exception, name: str, function: str, operation_id: UUID) -> None:
    setattr(exception, NAME, name)
    setattr(exception, FUNCTION, function)
    setattr(exception, OPERATION_ID, operation_id)

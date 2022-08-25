import types

from api.internal.logging import catch


class HandlersMetaclass(type):
    def __new__(mcs, cls_name: str, bases: tuple, attrs: dict):
        for name, value in attrs.items():
            if not isinstance(value, types.FunctionType) or name == "<lambda>" or name.startswith("_"):
                continue

            attrs[name] = catch(value)

        return super(HandlersMetaclass, mcs).__new__(mcs, cls_name, bases, attrs)

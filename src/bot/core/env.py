import os
from distutils.util import strtobool


def get(key: str, default: str = None):
    value = os.getenv(key)
    return value if value is not None else default


def get_bool(key: str, default: bool = True):
    value = os.getenv(key)

    if value is not None:
        return bool(strtobool(value))
    else:
        return default


def get_int(key: str, default: int = 0):
    value = os.getenv(key)

    if value is not None:
        return int(value)
    else:
        return default


def get_list_of_str(key: str):
    return __get_list(key)


def get_list_of_int(key: str):
    values = __get_list(key)
    return map(int, values)


def __get_list(key: str):
    value = os.getenv(key)
    return value.split(",")

import os

import certifi
from motor.motor_asyncio import AsyncIOMotorClient

from core import Config, env_validator
from core.singleton import Singleton


class MongoDb(metaclass=Singleton):
    def __init__(self):
        connection_string = self.__build_connection_string()
        self.__client = AsyncIOMotorClient(connection_string, ssl_ca_certs=certifi.where())
        self.__database = self.__client[Config().db.name]

    # noinspection PyMethodMayBeStatic
    def __build_connection_string(self):
        return (
            f"mongodb+srv://{Config().db.user}:{ Config().db.password}"
            f"@{Config().db.host}/{Config().db.name}?retryWrites=true&w=majority"
        )

    @property
    def database(self):
        return self.__database

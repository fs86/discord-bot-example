import os

import certifi
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from core import Config, env_validator
from core.singleton import Singleton
from models.warn.warning import Warn

# class MongoDb(metaclass=Singleton):
#     def __init__(self):
#         connection_string = self.__build_connection_string()
#         self.__client = AsyncIOMotorClient(connection_string, ssl_ca_certs=certifi.where())
#         self.__database = self.__client[Config().db.name]

#     # noinspection PyMethodMayBeStatic
#     def __build_connection_string(self):
#         return (
#             f"mongodb+srv://{Config().db.user}:{ Config().db.password}"
#             f"@{Config().db.host}/{Config().db.name}?retryWrites=true&w=majority"
#         )

#     @property
#     def database(self):
#         return self.__database


class MongoDb(metaclass=Singleton):
    @classmethod
    async def init(cls):
        self = MongoDb()
        self.__client = AsyncIOMotorClient(
            self.__build_connection_string(), ssl_ca_certs=certifi.where()
        )

        self.__database = self.__client[Config().db.name]

        await init_beanie(database=self.__client.test, document_models=[Warn])

    def __build_connection_string(self):
        return (
            f"mongodb+srv://{Config().db.user}:{ Config().db.password}"
            f"@{Config().db.host}/{Config().db.name}?retryWrites=true&w=majority"
        )

    @property
    def database(self):
        return self.__database

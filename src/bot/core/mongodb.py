from beanie import Document, init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from core import Config
from models.warn.warning import WarnDetails, Warn


async def configure():
    config = Config().db
    client = AsyncIOMotorClient(__build_connection_string(config))
    await init_beanie(database=client[config.name], document_models=[Warn, WarnDetails])


def __build_connection_string(config):
    return (
        f"mongodb+srv://{config.user}:{config.password}"
        f"@{config.host}/{config.name}?retryWrites=true&w=majority"
    )


def __get_model_classes():
    model_classes = [cls.__name__ for cls in Document.__subclasses__()]

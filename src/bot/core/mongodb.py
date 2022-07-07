import urllib.parse
from typing import TYPE_CHECKING, List, Type, Union

from beanie import Document, init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from core import Config

if TYPE_CHECKING:
    from beanie.odm.documents import DocType


class InvalidDocumentModelsConfiguration(Exception):
    """An Exception raised when the document models configuration is invalid."""


async def configure(autoload_models: bool = False, document_models: List[Union[Type["DocType"], str]] = None):
    if not autoload_models and not document_models:
        raise InvalidDocumentModelsConfiguration(
            f"You must either enable automatic loading of model classes using autoload_models=True, "
            f"or define the model classes manually using document_models."
        )

    config = Config().db
    client = AsyncIOMotorClient(__build_connection_string(config))

    document_models = __get_model_classes() if autoload_models else document_models
    await init_beanie(database=client[config.name], document_models=document_models)


def __build_connection_string(config):
    name = config.name if "name" in config else ""
    prefix = "mongodb+srv" if config.use_dns_seed_list else "mongodb"

    params = {}

    if "retry_writes" in config:
        params["retryWrites"] = str(config.retry_writes).lower()

    if "write_concern" in config:
        params["w"] = config.write_concern

    params = f"?{urllib.parse.urlencode(params)}" if len(params) > 0 else ""

    return f"{prefix}://{config.user}:{config.password}@{config.host}/{name}{params}"


def __get_model_classes():
    return [f"{cls.__module__}.{cls.__name__}" for cls in Document.__subclasses__()]

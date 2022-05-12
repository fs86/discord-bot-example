from dependency_injector import containers, providers
from discord.ext import ipc

from core import Config


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(packages=["api.endpoints"])

    ipc_client = providers.Singleton(ipc.Client, secret_key=Config().ipc.secret_key)

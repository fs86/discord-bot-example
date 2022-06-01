from dependency_injector import containers, providers
from discord.ext import ipc
from fastapi_discord import DiscordOAuthClient

from core import Config
from services import PermissionService, SettingsService


class Container(containers.DeclarativeContainer):
    modules = [".dependencies"]
    packages = ["api.endpoints", "api.helpers"]

    wiring_config = containers.WiringConfiguration(modules=modules, packages=packages)

    ipc_client = providers.Singleton(ipc.Client, secret_key=Config().ipc.secret_key)

    __oauth_config = Config().oauth
    discord = providers.Singleton(
        DiscordOAuthClient,
        client_id=__oauth_config.client_id,
        client_secret=__oauth_config.client_secret,
        redirect_uri=__oauth_config.redirect_uri,
        scopes=tuple(__oauth_config.scopes),
    )

    permission_service = providers.Factory(PermissionService)
    settings_service = providers.Factory(SettingsService)

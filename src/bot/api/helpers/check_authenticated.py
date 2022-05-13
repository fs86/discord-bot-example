from dependency_injector.wiring import Provide, inject
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials
from fastapi_discord import DiscordOAuthClient

from api.containers import Container


@inject
async def check_authenticated(
    bearer: HTTPAuthorizationCredentials, discord: DiscordOAuthClient = Depends(Provide[Container.discord])
):
    await discord.requires_authorization(bearer)

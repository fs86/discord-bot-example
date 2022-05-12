from typing import Optional

from dependency_injector.wiring import Provide, inject
from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi_discord import DiscordOAuthClient, User

from api.exceptions import InvalidPermissions
from api.helpers import check_authenticated
from api.utils import discord_oauth as discord

from .containers import Container


async def is_authenticated(bearer: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer())):
    await check_authenticated(bearer)


async def is_admin(
    bearer: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer()),
    user: User = Depends(discord.user),
):
    await check_authenticated(bearer)

    admins = [110737883484143616]

    if not int(user.id) in admins:
        raise InvalidPermissions


@inject
async def get_discord_user(request: Request, discord: DiscordOAuthClient = Depends(Provide[Container.discord])) -> User:
    return await discord.user(request)

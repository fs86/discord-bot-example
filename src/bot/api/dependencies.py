from typing import List, Optional

from dependency_injector.wiring import Provide, inject
from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi_discord import DiscordOAuthClient, Guild, User

from api.containers import Container
from api.exceptions import InvalidPermissions
from api.helpers import check_authenticated
from api.viewmodels import UserProfileInfo, UserVm
from services.permission_service import PermissionService


@inject
async def get_user(
    request: Request,
    discord: DiscordOAuthClient = Depends(Provide[Container.discord]),
    permission_service: PermissionService = Depends(Provide[Container.permission_service]),
):
    discord_user = await discord.user(request)

    guilds = [{"id": guild.id, "name": guild.name} for guild in await discord.guilds(request)]
    is_admin = await permission_service.is_admin(int(discord_user.id))

    user_profile_info = UserProfileInfo(is_admin=is_admin, guilds=guilds)
    return UserVm.from_user(discord_user, profile_info=user_profile_info)


@inject
async def get_guilds(
    request: Request, discord: DiscordOAuthClient = Depends(Provide[Container.discord])
) -> List[Guild]:
    return await discord.guilds(request)


async def is_authenticated(bearer: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer())):
    await check_authenticated(bearer)


@inject
async def is_admin(
    bearer: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer()),
    user: User = Depends(get_user),
    permission_service: PermissionService = Depends(Provide[Container.permission_service]),
):
    await check_authenticated(bearer)

    is_admin = await permission_service.is_admin(user.id)

    if not is_admin:
        raise InvalidPermissions

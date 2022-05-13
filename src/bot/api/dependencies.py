from typing import Optional

from dependency_injector.wiring import Provide, inject
from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi_discord import DiscordOAuthClient, User

from api.containers import Container
from api.exceptions import InvalidPermissions
from api.helpers import check_authenticated
from models.permissions import PermissionLevel
from services.permission_service import PermissionService


@inject
async def get_discord_user(request: Request, discord: DiscordOAuthClient = Depends(Provide[Container.discord])) -> User:
    return await discord.user(request)


async def is_authenticated(bearer: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer())):
    await check_authenticated(bearer)


@inject
async def is_admin(
    bearer: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer()),
    user: User = Depends(get_discord_user),
    permission_service: PermissionService = Depends(Provide[Container.permission_service]),
):
    await check_authenticated(bearer)

    permission_level = await permission_service.get_permission_level(user.id)

    if permission_level != PermissionLevel.ADMIN:
        raise InvalidPermissions

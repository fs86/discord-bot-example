from typing import Optional

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi_discord import User

from api.exceptions import InvalidPermissions
from api.helpers import check_authenticated
from api.utils import discord_oauth as discord


async def is_logged_in_user(bearer: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer())):
    await check_authenticated(bearer)


async def is_admin(
    bearer: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer()),
    user: User = Depends(discord.user),
):
    await check_authenticated(bearer)

    admins = [110737883484143616]

    if not int(user.id) in admins:
        raise InvalidPermissions

from typing import Optional

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi_discord import User

from api.exceptions import InvalidPermissions
from api.helpers import check_authenticated
from api.utils import discord_oauth as discord

admins = [110737883484143616]


async def is_admin(
    bearer: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer()),
    user: User = Depends(discord.user),
):
    await check_authenticated(bearer)

    if not int(user.id) in admins:
        raise InvalidPermissions

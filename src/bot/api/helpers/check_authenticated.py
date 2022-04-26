from fastapi.security import HTTPAuthorizationCredentials

from api.utils import discord_oauth as discord


async def check_authenticated(bearer: HTTPAuthorizationCredentials):
    await discord.requires_authorization(bearer)

from typing import List

from dependency_injector.wiring import Provide, inject
from discord import User
from discord.ext import ipc
from fastapi import APIRouter, Depends
from fastapi_discord import Guild

from api.containers import Container
from api.dependencies import get_guilds, get_user, is_admin, is_authenticated
from api.helpers.user_helper import get_profile_info
from api.requests import GuildSettingsRequest
from api.responses.user_response import UserResponse
from services import SettingsService

router = APIRouter(
    prefix="/bot",
    tags=["Bot"],
    dependencies=[Depends(is_admin)],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_info():
    ...


@router.get("/guilds", dependencies=[Depends(is_authenticated)])
@inject
async def get_guilds(
    user: User = Depends(get_user),
    guilds: List[Guild] = Depends(get_guilds),
    ipc_client: ipc.Client = Depends(Provide[Container.ipc_client]),
):
    bot_guilds = await ipc_client.request("get_guild_ids")
    user_guild_ids = [guild.id for guild in guilds]

    profile_info = await get_profile_info(user)

    if not profile_info.is_admin:
        bot_guilds = [guild for guild in bot_guilds if guild["id"] in user_guild_ids]

    return bot_guilds


# /bot/guilds/43432456837573537


@router.post("/guilds/{guild_id}")
@inject
async def update_guild(
    guild_id: int,
    request: GuildSettingsRequest,
    settings_service: SettingsService = Depends(Provide[Container.settings_service]),
):
    settings = request.__dict__
    await settings_service.update(guild_id, settings)

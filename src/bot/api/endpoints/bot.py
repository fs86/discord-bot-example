from typing import List

from dependency_injector.wiring import Provide, inject
from discord.ext import ipc
from fastapi import APIRouter, Depends
from fastapi_discord import Guild

from api.containers import Container
from api.dependencies import get_guilds, get_user, is_admin, is_authenticated
from api.requests import GuildSettings
from api.viewmodels import UserVm
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
    user: UserVm = Depends(get_user),
    guilds: List[Guild] = Depends(get_guilds),
    ipc_client: ipc.Client = Depends(Provide[Container.ipc_client]),
):
    bot_guilds = await ipc_client.request("get_guild_ids")
    user_guild_ids = [guild.id for guild in guilds]

    if not user.profile_info.is_admin:
        bot_guilds = [guild for guild in bot_guilds if guild["id"] in user_guild_ids]

    return bot_guilds


# /bot/guilds/43432456837573537


@router.post("/guilds/{guild_id}")
@inject
async def update_guild(
    guild_id: int,
    guild_settings: GuildSettings,
    settings_service: SettingsService = Depends(Provide[Container.settings_service]),
):
    # await settings_service.set(guild_id=guild_id, key="bot_prefix", value=guild_settings.bot_prefix)
    await settings_service.update(guild_id, guild_settings.__dict__)

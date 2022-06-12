from typing import List

from dependency_injector.wiring import Provide, inject
from discord import User
from discord.ext import ipc
from fastapi import APIRouter, Depends
from fastapi_discord import Guild
from pydantic import BaseModel

from api.containers import Container
from api.dependencies import get_user, get_user_guilds, is_authenticated
from api.exceptions import RequiresGuildOwner
from api.helpers.user_helper import get_profile_info
from api.requests import GuildSettingsRequest
from api.responses.guild_settings_response import GuildSettingsResponse
from services import SettingsService

router = APIRouter(
    prefix="/guilds",
    tags=["Guilds"],
    dependencies=[Depends(is_authenticated)],
    responses={404: {"description": "Not found"}},
)


@router.get("/", dependencies=[Depends(is_authenticated)])
@inject
async def get_guilds(
    user: User = Depends(get_user),
    guilds: List[Guild] = Depends(get_user_guilds),
    ipc_client: ipc.Client = Depends(Provide[Container.ipc_client]),
):
    bot_guilds = await ipc_client.request("get_guild_ids")
    user_guild_ids = [guild.id for guild in guilds]

    profile_info = await get_profile_info(user)

    if not profile_info.is_admin:
        bot_guilds = [guild for guild in bot_guilds if guild["id"] in user_guild_ids]

    return bot_guilds


@router.post("/{guild_id}/settings")
@inject
async def update_guild_settings(
    guild_id: int,
    request: GuildSettingsRequest,
    user_guilds: List[Guild] = Depends(get_user_guilds),
    settings_service: SettingsService = Depends(Provide[Container.settings_service]),
):
    guilds_with_owner_rights = [int(guild.id) for guild in user_guilds if guild.owner]

    if guild_id not in guilds_with_owner_rights:
        raise RequiresGuildOwner

    settings = request.__dict__
    await settings_service.update(guild_id, settings)

    return "Ok"


class TestModel(BaseModel):
    bot_prefix: str
    bot_display_name: str


@router.get("/{guild_id}/settings", response_model=GuildSettingsResponse, response_model_exclude_unset=True)
@inject
async def get_guild_settings(
    guild_id: int, settings_service: SettingsService = Depends(Provide[Container.settings_service])
):
    settings = await settings_service.get(guild_id)
    return settings.values

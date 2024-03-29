from typing import List

from dependency_injector.wiring import Provide, inject
from discord import User
from fastapi import APIRouter, Depends, status
from fastapi_discord import Guild

from api.containers import Container
from api.dependencies import get_user, get_user_guilds, is_authenticated
from api.exceptions import RequiresGuildOwner
from api.helpers import ipc_helper, user_helper
from api.requests import GuildSettingsRequest
from api.responses.guild_settings_response import GuildSettingsResponse
from services import SettingsService

router = APIRouter(
    prefix="/guilds",
    tags=["Guilds"],
    dependencies=[Depends(is_authenticated)],
    responses={404: {"description": "Not found"}},
)


@router.get("/", dependencies=[Depends(is_authenticated)], status_code=status.HTTP_200_OK)
@inject
async def get_guilds(user: User = Depends(get_user), guilds: List[Guild] = Depends(get_user_guilds)):
    bot_guilds = await ipc_helper.get_guild_ids()
    user_guild_ids = [guild.id for guild in guilds]

    profile_info = await user_helper.get_profile_info(user)

    if not profile_info.is_admin:
        bot_guilds = [guild for guild in bot_guilds if guild["id"] in user_guild_ids]

    return bot_guilds


@router.post("/{guild_id}/settings", status_code=status.HTTP_200_OK)
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
    await ipc_helper.set_bot_nickname(guild_id, request.bot_nickname)


@router.get(
    "/{guild_id}/settings",
    response_model=GuildSettingsResponse,
    response_model_exclude_unset=True,
    status_code=status.HTTP_200_OK,
)
@inject
async def get_guild_settings(
    guild_id: int, settings_service: SettingsService = Depends(Provide[Container.settings_service])
):
    return await settings_service.get(guild_id)


@router.get("/{guild_id}/textchannels", status_code=status.HTTP_200_OK)
async def get_guild_textchannels(guild_id: int):
    return await ipc_helper.get_guild_channels(guild_id, text_channels_only=True)

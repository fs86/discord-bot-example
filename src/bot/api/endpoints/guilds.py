from dependency_injector.wiring import Provide, inject
from discord.ext import ipc
from fastapi import APIRouter, Depends
from fastapi_discord import DiscordOAuthClient

from api.containers import Container
from api.dependencies import get_guilds, get_user, is_authenticated
from api.viewmodels import UserVm

router = APIRouter(
    prefix="/guilds",
    tags=["Guilds"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", dependencies=[Depends(is_authenticated)])
@inject
async def guilds(
    user: UserVm = Depends(get_user),
    guilds=Depends(get_guilds),
    ipc_client: ipc.Client = Depends(Provide[Container.ipc_client]),
):
    bot_guilds = await ipc_client.request("get_guild_ids")
    user_guild_ids = [guild["id"] for guild in user.profile_info.guilds]

    if not user.profile_info.is_admin:
        bot_guilds = [guild for guild in bot_guilds if guild["id"] in user_guild_ids]

    return bot_guilds

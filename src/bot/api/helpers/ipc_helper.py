from dependency_injector.wiring import Provide, inject
from discord.ext import ipc
from fastapi import Depends

from api.containers import Container


@inject
async def get_guild_count(ipc_client: ipc.Client = Depends(Provide[Container.ipc_client])):
    return await ipc_client.request("get_guild_count")


@inject
async def get_guild_ids(ipc_client: ipc.Client = Depends(Provide[Container.ipc_client])):
    return await ipc_client.request("get_guild_ids")


@inject
async def get_guild_channels(
    guild_id: int, text_channels_only: bool = False, ipc_client: ipc.Client = Depends(Provide[Container.ipc_client])
):
    return await ipc_client.request("get_guild_channels", guild_id=guild_id, text_channels_only=text_channels_only)


@inject
async def set_bot_nickname(
    guild_id: int, bot_nickname: str, ipc_client: ipc.Client = Depends(Provide[Container.ipc_client])
):
    return await ipc_client.request("set_bot_nickname", guild_id=guild_id, bot_nickname=bot_nickname)

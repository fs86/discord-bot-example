from dependency_injector.wiring import Provide, inject
from discord.ext import ipc
from fastapi import APIRouter, Depends

from api.containers import Container
from api.dependencies import is_admin

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    dependencies=[Depends(is_admin)],
    responses={404: {"description": "Not found"}},
)


@router.get("/guilds")
@inject
async def test(ipc_client: ipc.Client = Depends(Provide[Container.ipc_client])):
    guild_count = await ipc_client.request("get_guild_count")
    return {"guild_count": guild_count}


@router.get("/guildss")
@inject
async def guilds(ipc_client: ipc.Client = Depends(Provide[Container.ipc_client])):
    guilds = await ipc_client.request("get_guilds")
    ...

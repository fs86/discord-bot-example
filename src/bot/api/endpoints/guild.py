from fastapi import APIRouter, Depends

from api.utils import discord_oauth as discord
from api.utils import ipc_client

router = APIRouter(
    prefix="/guild",
    tags=["Guild"],
    responses={404: {"description": "Not found"}},
)


@router.get("/{guild_id}", dependencies=[Depends(discord.requires_authorization)])
async def guild(guild_id: str):
    return {"guild_id": guild_id}

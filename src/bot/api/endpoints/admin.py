from fastapi import APIRouter, Depends

from api.utils import ipc_client

from ..dependencies import is_admin

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    dependencies=[Depends(is_admin)],
    responses={404: {"description": "Not found"}},
)


@router.get("/guilds")
async def test():
    guild_count = await ipc_client.request("get_guild_count")
    return {"guild_count": guild_count}

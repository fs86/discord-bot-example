from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends
from fastapi_discord import DiscordOAuthClient

from api.containers import Container

router = APIRouter(
    prefix="/account",
    tags=["Account (Discord user info gateway)"],
    responses={404: {"description": "Not found"}},
)


@router.get("/login")
@inject
async def login(discord: DiscordOAuthClient = Depends(Provide[Container.discord])):
    return {"url": discord.oauth_login_url}


@router.get("/callback")
@inject
async def login_callback(code: str, discord: DiscordOAuthClient = Depends(Provide[Container.discord])):
    token, refresh_token = await discord.get_access_token(code)
    return {"access_token": token, "refresh_token": refresh_token}

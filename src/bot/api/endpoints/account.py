from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends
from fastapi_discord import DiscordOAuthClient, User

from api.containers import Container
from api.viewmodels import UserProfileInfo, UserVm

from ..dependencies import get_discord_user, is_authenticated

router = APIRouter(
    prefix="/account",
    tags=["Account"],
    responses={404: {"description": "Not found"}},
)


@router.get("/login")
@inject
async def login(discord: DiscordOAuthClient = Depends(Provide[Container.discord])):
    return {"url": discord.oauth_login_url}


@router.get("/callback")
@inject
async def callback(code: str, discord: DiscordOAuthClient = Depends(Provide[Container.discord])):
    token, refresh_token = await discord.get_access_token(code)
    return {"access_token": token, "refresh_token": refresh_token}


@router.get("/@me", dependencies=[Depends(is_authenticated)], response_model=UserVm)
async def me(user: User = Depends(get_discord_user)):
    return UserVm.from_user(user, profile_info=UserProfileInfo(is_admin=True))

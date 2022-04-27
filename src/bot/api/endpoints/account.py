from fastapi import APIRouter, Depends
from fastapi_discord import User

from api.utils import discord_oauth as discord
from api.viewmodels import UserProfileInfo, UserVm

from ..dependencies import is_authenticated

router = APIRouter(
    prefix="/account",
    tags=["Account"],
    responses={404: {"description": "Not found"}},
)


@router.get("/login")
async def login():
    return {"url": discord.oauth_login_url}


@router.get("/callback")
async def callback(code: str):
    token, refresh_token = await discord.get_access_token(code)
    return {"access_token": token, "refresh_token": refresh_token}


@router.get("/@me", dependencies=[Depends(is_authenticated)], response_model=UserVm)
async def me(user: User = Depends(discord.user)):
    return UserVm.from_user(user, profile_info=UserProfileInfo(is_admin=True))

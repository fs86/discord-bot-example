from fastapi import APIRouter, Depends
from fastapi_discord import User

from api.ipc import ipc_client
from api.oauth import discord_oauth as discord

# Check out https://github.com/tokusumi/fastapi-cloudauth for OAuth2 authentication.
# When using PyJWT, dont forget to install PyJWT["crypto"].

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


@router.get("/@me", dependencies=[Depends(discord.requires_authorization)], response_model=User)
async def me(user: User = Depends(discord.user)):
    return user


@router.get("/test")
async def test():
    guild_count = await ipc_client.request("get_guild_count")
    return {"guild_count": guild_count}

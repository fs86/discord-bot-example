from fastapi import APIRouter, Depends
from fastapi_discord import User

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
async def private(user: User = Depends(discord.user)):
    return user

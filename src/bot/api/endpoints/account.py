from typing import List

from fastapi import APIRouter, Depends
from fastapi_discord import Guild, User

from api.dependencies import get_guilds, get_user, is_authenticated
from api.viewmodels import UserVm

router = APIRouter(
    prefix="/account",
    tags=["Account"],
    dependencies=[Depends(is_authenticated)],
    responses={404: {"description": "Not found"}},
)


@router.get("/@me", response_model=UserVm)
async def me(user: User = Depends(get_user)):
    return user


@router.get("/@me/guilds", response_model=List[Guild])
async def guilds(guilds=Depends(get_guilds)):
    return guilds

from typing import List

from fastapi import APIRouter, Depends
from fastapi_discord import Guild, User

from api.dependencies import get_guilds, get_user, is_authenticated
from api.viewmodels import UserVm

router = APIRouter(
    prefix="/account",
    tags=["Account (Discord user info gateway)"],
    dependencies=[Depends(is_authenticated)],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=UserVm)
async def get_info(user: User = Depends(get_user)):
    return user


@router.get("/guilds", response_model=List[Guild])
async def get_guilds(guilds=Depends(get_guilds)):
    return guilds

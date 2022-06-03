from typing import List

from fastapi import APIRouter, Depends
from fastapi_discord import Guild, User

from api.dependencies import get_user_guilds, get_user, is_authenticated
from api.helpers import get_profile_info
from api.responses import UserResponse

router = APIRouter(
    prefix="/account",
    tags=["Account (Discord user info gateway)"],
    dependencies=[Depends(is_authenticated)],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=UserResponse)
async def get_info(user: User = Depends(get_user)):
    profile_info = await get_profile_info(user)
    return UserResponse.from_user(user=user, profile_info=profile_info)


@router.get("/guilds", response_model=List[Guild])
async def get_user_guilds(guilds=Depends(get_user_guilds)):
    return guilds

from fastapi import APIRouter

from api.endpoints import account, guild

router = APIRouter()

router.include_router(account.router)
router.include_router(guild.router)

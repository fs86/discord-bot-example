from fastapi import APIRouter

from api.endpoints import account

router = APIRouter()

router.include_router(account.router)

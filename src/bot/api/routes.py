from fastapi import APIRouter

from api.endpoints import account, admin

router = APIRouter()

router.include_router(account.router)
router.include_router(admin.router)

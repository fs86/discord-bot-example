from fastapi import APIRouter

import api.endpoints as endpoints

router = APIRouter()

router.include_router(endpoints.account_login.router)
router.include_router(endpoints.account.router)
router.include_router(endpoints.bot.router)

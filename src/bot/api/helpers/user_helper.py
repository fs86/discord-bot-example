from dependency_injector.wiring import Provide, inject
from discord import User
from fastapi import Depends

from api.containers import Container
from api.responses import UserProfileInfo
from services import PermissionService


@inject
async def get_profile_info(
    user: User, permission_service: PermissionService = Depends(Provide[Container.permission_service])
):
    is_admin = await permission_service.is_admin(int(user.id))
    return UserProfileInfo(is_admin=is_admin)

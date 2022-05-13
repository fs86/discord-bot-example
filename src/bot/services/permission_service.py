from models import Permissions
from models.permissions import PermissionLevel


class PermissionService:
    async def get_permission_level(self, member_id: int):
        permissions = await Permissions.find_one(Permissions.member_id == member_id)
        return await permissions.level if permissions else PermissionLevel.NONE

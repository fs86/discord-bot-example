from models import Permissions
from models.permissions import PermissionLevel


class PermissionService:
    # DE: Ermittelt die Berechtiungs-Stufe des Members mit der übergebenen ID.
    # EN: Determines the permission level of the member with the given ID.
    async def get_permission_level(self, member_id: int):
        permissions = await Permissions.find_one(Permissions.member_id == member_id)
        return await permissions.level if permissions else PermissionLevel.NONE

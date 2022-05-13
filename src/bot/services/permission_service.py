from models import Permissions


class PermissionService:
    # DE: Ermittelt die Berechtiungs-Stufe des Members mit der übergebenen ID.
    # EN: Determines the permission level of the member with the given ID.
    async def is_admin(self, member_id: int):
        permissions = await Permissions.find_one(Permissions.member_id == member_id)
        return permissions.is_admin if permissions else False

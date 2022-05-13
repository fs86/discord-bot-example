from enum import Enum

from beanie import Document


class PermissionLevel(Enum):
    NONE = 0
    MODERATOR = 1
    ADMIN = 2


class Permissions(Document):
    member_id: int
    level: PermissionLevel

    class Collection:
        name = "permissions"

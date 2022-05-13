from dataclasses import dataclass
from typing import Any, List, Optional

from fastapi_discord import User


@dataclass
class UserProfileInfo:
    is_admin: bool
    guilds: Optional[List[Any]]

    def __init__(self, is_admin: bool = False, guilds: List[Any] = []) -> None:
        self.is_admin = is_admin
        self.guilds = guilds


class UserVm(User):
    profile_info: Optional[UserProfileInfo]

    def __init__(self, **data: Any):
        super().__init__(**data)

    @staticmethod
    def from_user(user: User, profile_info: UserProfileInfo = UserProfileInfo()):
        user_vm = UserVm(**user.__dict__)
        user_vm.profile_info = profile_info

        return user_vm

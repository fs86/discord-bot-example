from dataclasses import dataclass
from typing import Any, Optional

from fastapi_discord import User


@dataclass
class UserProfileInfo:
    is_admin: bool

    def __init__(self, **kwargs) -> None:
        self.__dict__.update(kwargs)
        ...


class UserResponse(User):
    profile_info: Optional[UserProfileInfo]

    def __init__(self, **data: Any):
        super().__init__(**data)

    @staticmethod
    def from_user(user: User, profile_info: UserProfileInfo = UserProfileInfo()):
        user_vm = UserResponse(**user.__dict__)
        user_vm.profile_info = profile_info

        return user_vm

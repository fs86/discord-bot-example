from typing import Optional

from fastapi_discord import User

from .common import BaseResponse


class UserProfileInfo(BaseResponse):
    is_admin: bool


class UserResponse(BaseResponse):
    id: str
    username: str
    discriminator: str
    avatar: Optional[str]
    avatar_url: Optional[str]
    locale: str
    email: Optional[str]
    bot: Optional[bool]
    mfa_enabled: bool
    flags: int
    premium_type: Optional[int]
    public_flags: int
    profile_info: Optional[UserProfileInfo]

    @staticmethod
    def from_user(user: User, profile_info: UserProfileInfo):
        return user.__dict__ | {"profile_info": profile_info.__dict__}

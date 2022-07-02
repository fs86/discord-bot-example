from typing import Optional

from .common import BaseResponse


class GuildSettingsResponse(BaseResponse):
    bot_prefix: Optional[str]
    bot_nickname: Optional[str]
    welcome_channel_id: Optional[str]
    welcome_message: Optional[str]
    leave_channel_id: Optional[str]
    leave_message: Optional[str]

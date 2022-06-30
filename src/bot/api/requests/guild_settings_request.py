from typing import Optional

from .common import BaseRequest


class GuildSettingsRequest(BaseRequest):
    bot_prefix: Optional[str]
    bot_nickname: Optional[str]
    welcome_channel_id: Optional[int]
    welcome_message: Optional[str]
    leave_channel_id: Optional[int]
    leave_message: Optional[str]

from typing import List, Optional

from .common import BaseRequest


class GuildSettingsRequest(BaseRequest):
    bot_prefix: Optional[str]
    bot_nickname: Optional[str]
    blacklist: Optional[List[str]]
    welcome_channel_id: Optional[int]
    welcome_message: Optional[str]
    leave_channel_id: Optional[int]
    leave_message: Optional[str]

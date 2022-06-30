from .common import BaseResponse


class GuildSettingsResponse(BaseResponse):
    bot_prefix: str
    bot_nickname: str
    welcome_channel_id: int
    welcome_message: str
    leave_channel_id: int
    leave_message: str

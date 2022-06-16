from .common import BaseRequest


class GuildSettingsRequest(BaseRequest):
    bot_prefix: str
    welcome_channel_id: int
    welcome_message: str

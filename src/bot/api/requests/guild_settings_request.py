from .common import BaseRequest


class GuildSettingsRequest(BaseRequest):
    bot_prefix: str
    bot_display_name: str

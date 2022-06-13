from .common import BaseResponse


class GuildSettingsResponse(BaseResponse):
    bot_prefix: str
    bot_display_name: str

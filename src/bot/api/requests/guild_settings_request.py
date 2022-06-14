from .common import BaseRequest


class GuildSettingsRequest(BaseRequest):
    bot_prefix: str
    ticket_category: str

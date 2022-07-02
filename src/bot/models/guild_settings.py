import datetime
from typing import List

from beanie import Document, Indexed
from pydantic import BaseModel


class GuildSettingsValues(BaseModel):
    bot_prefix: str = "."
    bot_nickname: str = None
    welcome_channel_id: int = None
    welcome_message: str = None
    leave_channel_id: int = None
    leave_message: str = None


class GuildSettings(Document):
    guild_id: Indexed(int)
    values: GuildSettingsValues = {}

    class Collection:
        name = "settings"

    class Settings:
        use_cache = True
        cache_expiration_time = datetime.timedelta(minutes=30)
        cache_capacity = 5

import datetime
from typing import List

from beanie import Document, Indexed
from pydantic import BaseModel


class GuildSettingsValues(BaseModel):
    bot_prefix: str = "."
    ticket_category: str = "Tickets"


class GuildSettings(Document):
    guild_id: Indexed(int)
    values: GuildSettingsValues = {}

    class Collection:
        name = "settings"

    class Settings:
        use_cache = True
        cache_expiration_time = datetime.timedelta(minutes=30)
        cache_capacity = 5

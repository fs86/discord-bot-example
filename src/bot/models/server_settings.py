import datetime
from typing import List

from beanie import Document, Indexed
from pydantic import BaseModel


class ServerSettingsValues(BaseModel):
    bot_prefix: str = "."
    ticket_category: str = "Tickets"


class ServerSettings(Document):
    guild_id: Indexed(int)
    values: ServerSettingsValues = {}

    class Collection:
        name = "settings"

    class Settings:
        use_cache = True
        cache_expiration_time = datetime.timedelta(minutes=30)
        cache_capacity = 5

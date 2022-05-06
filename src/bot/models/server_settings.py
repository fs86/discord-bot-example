import datetime
from typing import List

from beanie import Document
from pydantic import BaseModel

from models.common.auditable import AuditableBaseModel


class ServerSettingsValue(AuditableBaseModel):
    bot_prefix: str
    ticket_category: str
    ticket_channel_prefix: str


class ServerSettings(Document):
    guild_id: int
    values: List[ServerSettingsValue] = []

    class Collection:
        name = "settings"

    class Settings:
        use_cache = True
        cache_expiration_time = datetime.timedelta(minutes=30)
        cache_capacity = 5

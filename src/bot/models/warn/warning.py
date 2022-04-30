from datetime import datetime
from typing import List, Optional

from beanie import Document, Link
from pydantic import BaseModel


class WarnDetails(Document):
    reason: str
    date: datetime

    class Collection:
        name = "warn_details"


class Warn(Document):
    guild_id: int
    member_id: int
    entries: Optional[List[Link[WarnDetails]]] = []

    class Collection:
        name = "warn"

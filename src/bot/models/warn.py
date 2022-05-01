from datetime import datetime
from typing import List, Optional

from beanie import Document, Link
from pydantic import BaseModel


class WarnDetails(BaseModel):
    created_by_id: int
    created_by_ref: str
    created_at: datetime
    reason: str


class Warn(Document):
    guild_id: int
    member_id: int
    member_ref: str
    entries: Optional[List[WarnDetails]] = []

    class Collection:
        name = "warn"

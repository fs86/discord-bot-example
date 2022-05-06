from datetime import datetime
from typing import Optional

from beanie import Document
from pydantic import BaseModel


class AuditInfo(BaseModel):
    created_by_id: int
    created_by_ref: str
    created_at: datetime
    modified_by_id: Optional[int]
    modified_by_ref: Optional[str]
    modified_at: Optional[datetime]


class AuditableBaseModel(BaseModel):
    audit_info: AuditInfo


class AuditableDocument(Document):
    audit_info: AuditInfo

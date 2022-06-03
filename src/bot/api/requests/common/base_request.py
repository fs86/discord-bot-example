from pydantic import BaseModel

from api.utils import to_camel


class BaseRequest(BaseModel):
    class Config:
        alias_generator = to_camel

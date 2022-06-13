from pydantic import BaseModel

from api.utils import to_camel


class BaseResponse(BaseModel):
    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True

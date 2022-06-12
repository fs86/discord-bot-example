from pydantic import BaseModel

from api.utils import to_camel


class GuildSettingsResponse(BaseModel):
    bot_prefix: str
    bot_display_name: str

    # def __init__(__pydantic_self__, **data: Any) -> None:
    #     super().__init__(**data)

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True

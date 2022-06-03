from pydantic import BaseModel

from api.utils import to_camel


class GuildSettingsRequest(BaseModel):
    bot_prefix: str
    bot_display_name: str

    class Config:
        alias_generator = to_camel

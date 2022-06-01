from pydantic import BaseModel


class GuildSettingsRequest(BaseModel):
    bot_prefix: str

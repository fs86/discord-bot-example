from pydantic import BaseModel


class GuildSettings(BaseModel):
    bot_prefix: str

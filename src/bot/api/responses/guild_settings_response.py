from api.utils import to_camel

from .common import BaseResponse


class GuildSettingsResponse(BaseResponse):
    bot_prefix: str
    bot_display_name: str

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True

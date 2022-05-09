from typing import List

from beanie.operators import In

from models import ServerSettings, ServerSettingsValues


class SettingsService:
    async def initialize(self, guild_ids: List[int] | int, integrity_check=True):
        server_settings_new = []
        server_settings_old = []

        if not isinstance(guild_ids, list):
            guild_ids = [guild_ids]

        if integrity_check:
            initialized = await self.which()

            # New settings
            for guild_id in [guild_id for guild_id in guild_ids if guild_id not in initialized]:
                server_settings_new.append(self.__get_new(guild_id))

            # Old settings
            for guild_id in [guild_id for guild_id in initialized if guild_id not in guild_ids]:
                server_settings_old.append(guild_id)

        else:
            for guild_id in guild_ids:
                server_settings_new.append(self.__get_new(guild_id))

        if len(server_settings_new) > 0:
            await ServerSettings.insert_many(server_settings_new)

        if len(server_settings_old) > 0:
            await ServerSettings.find(In(ServerSettings.guild_id, server_settings_old)).delete_many()

    async def get(self, guild_id: int):
        return await self.__get_server_settings(guild_id)

    async def set(self, guild_id: int, key: str, value):
        server_settings = await self.__get_server_settings(guild_id)
        setattr(server_settings.values, key, value)
        await server_settings.save()

    async def which(self):
        server_settings = await ServerSettings.find().to_list()
        return [settings.guild_id for settings in server_settings]

    def __get_new(self, guild_id: int):
        return ServerSettings(guild_id=guild_id, values=ServerSettingsValues())

    async def __get_server_settings(self, guild_id: int, fetch_links: bool = True):
        return await ServerSettings.find_one(ServerSettings.guild_id == guild_id, fetch_links=fetch_links)

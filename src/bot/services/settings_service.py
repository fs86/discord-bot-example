from typing import Any, List

from beanie.operators import In

from models import GuildSettings, GuildSettingsValues


class SettingsService:
    # DE: Initialisiert die Einstellungen für die angegebenen Server. Falls auf der Datenbank für den jeweiligen Server
    #     noch keine Einstellungen hinterlegt sind, werden diese automatisch mit den Standardwerten (siehe models/server_settings.py) angelegt.
    # EN: Initializes the settings for the specified servers. If no settings are stored in the database
    #     for the respective server, they are automatically created with the default values (see models/server_settings.py).
    async def initialize(self, guild_ids: List[int] | int, integrity_check=True):
        guild_settings_new = []
        guild_settings_old = []

        if not isinstance(guild_ids, list):
            guild_ids = [guild_ids]

        if integrity_check:
            initialized_guilds = await self.get_initialized_guild_ids()

            # New settings
            for guild_id in [guild_id for guild_id in guild_ids if guild_id not in initialized_guilds]:
                guild_settings_new.append(self.__get_new(guild_id))

            # Old settings
            for guild_id in [guild_id for guild_id in initialized_guilds if guild_id not in guild_ids]:
                guild_settings_old.append(guild_id)

        else:
            for guild_id in guild_ids:
                guild_settings_new.append(self.__get_new(guild_id))

        if len(guild_settings_new) > 0:
            await GuildSettings.insert_many(guild_settings_new)

        if len(guild_settings_old) > 0:
            await GuildSettings.find(In(GuildSettings.guild_id, guild_settings_old)).delete_many()

    # DE: Liefert alle Einstellungen für den angegebenen Server.
    # EN: Returns all settings for the specified server.
    async def get(self, guild_id: int):
        return (await self.__get_guild_settings(guild_id)).values

    # DE: Aktualisiert eine Einstellungswert für den angegebenen Server.
    # EN: Updates a setting value for the specified server.
    async def set(self, guild_id: int, key: str, value):
        guild_settings = await self.__get_guild_settings(guild_id)
        setattr(guild_settings.values, key, value)
        await guild_settings.save()

    # DE: Aktualisert die Einstellungen für den angegebenen Server.
    # EN: Updates the settings for the specified server.
    async def update(self, guild_id: int, settings: dict[str, Any]):
        guild_settings = await self.__get_guild_settings(guild_id)

        guild_settings.init_cache()
        guild_settings.values = GuildSettingsValues(**settings)

        await guild_settings.save()

    # DE: Prüft, für welche Server bereits Einstellungen gespeichert wurden und gibt die Server IDs als Liste zurück.
    # EN: Checks for which servers settings have already been saved and returns the server IDs as a list.
    async def get_initialized_guild_ids(self):
        guild_settings = await GuildSettings.find().to_list()
        return [settings.guild_id for settings in guild_settings]

    # DE: Erstellt ein neues 'ServerSettings' Objekt und gibt es zurück. Das Objekt wird zu diesem Zeitpunkt noch nicht auf der Datenbank gespeichert.
    # EN: Creates a new 'ServerSettings' object and returns it. The object is not yet stored in the database at this point.
    def __get_new(self, guild_id: int):
        return GuildSettings(guild_id=guild_id, values=GuildSettingsValues())

    # DE: Ermittelt den Datenbankeintrag für die angegebene Server ID.
    # EN: Determines the database entry for the specified server id.
    async def __get_guild_settings(self, guild_id: int, fetch_links: bool = True):
        return await GuildSettings.find_one(GuildSettings.guild_id == guild_id, fetch_links=fetch_links)

from datetime import datetime

from beanie import WriteRules

from models import Warn, WarnDetails


class WarnService:
    # DE: Verwarnt den angegebenen Benutzer.
    # EN: Warns the specified user.
    async def add_warning(
        self,
        guild_id: int,
        member_id: int,
        member_ref: str,
        created_by_id: int,
        created_by_ref: str,
        reason: str = None,
    ):
        warn = await self.__get_warn(guild_id, member_id)

        if not warn:
            warn = Warn(guild_id=guild_id, member_id=member_id, member_ref=member_ref)

        warn.entries.append(
            WarnDetails(
                created_by_id=created_by_id,
                created_by_ref=created_by_ref,
                created_at=datetime.now(),
                reason=reason,
            )
        )

        await warn.save(link_rule=WriteRules.WRITE)

        return len(warn.entries)

    # DE: Ermittelt alle Verwarnungen für den angegebenen Benutzer.
    # EN: Gets all warnings for the specified user.
    async def get_warnings(self, guild_id: int, member_id: int):
        warn = await self.__get_warn(guild_id, member_id)
        return warn.entries if warn else None

    # DE: Entfernt eine oder mehrere Verwarnung für den angegebenen Benutzer.
    # EN: Removes one or more warnings for the specified user.
    async def remove_warning(self, guild_id: int, member_id: int, warns_to_remove):
        warns_to_remove = " ".join(warns_to_remove.split())
        warn = await self.__get_warn(guild_id, member_id)
        warn_count_before = len(warn.entries) if warn else 0
        separators = [",", " "]

        if warns_to_remove == "*":
            warn.entries = []

        elif warns_to_remove.isdigit():
            self.__remove(warn.entries, warns_to_remove)

        if any(s in warns_to_remove for s in separators):
            warns_to_remove = self.__args_to_list(warns_to_remove, separators)
            for number in reversed(sorted(warns_to_remove)):
                self.__remove(warn.entries, number)

        await warn.save()

        if not warn.entries:
            await warn.delete()

        return len(warn.entries), warn_count_before - len(warn.entries)

    # DE: Ermittelt den Datenbankeintrag für die Kombination Server ID / Member ID.
    # EN: Determines the database entry for the combination server id / member id.
    async def __get_warn(self, guild_id: int, member_id: int, fetch_links: bool = True) -> Warn:
        return await Warn.find_one(Warn.guild_id == guild_id, Warn.member_id == member_id, fetch_links=fetch_links)

    # DE: Wandelt die eingegebenen Argumente in eine Liste um.
    # EN: Converts the entered arguments into a list.
    def __args_to_list(self, args, separators):
        for char in separators:
            args = args.replace(char, ";")

        return args.split(";") if args else None

    # DE: Entfernt einen Eintrag aus einer Liste anhand seiner Position.
    # EN: Removes an entry from a list based on its position.
    def __remove(self, warnings, number):
        index = int(number) - 1
        warnings.pop(index)

        return warnings

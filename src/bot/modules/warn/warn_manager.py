from datetime import datetime

from core.mongodb import MongoDb


class WarnManager:
    def __init__(self):
        self.warnings = MongoDb().database["warnings"]

    async def add_warning(self, guild_id: int, member_id: int, reason: str = None):
        search_object = {"guild_id": guild_id, "member_id": member_id}
        member_data = await self.warnings.find_one(search_object)
        warning = {"reason": reason, "date": datetime.now()}

        if member_data is None:
            member_data = {"guild_id": guild_id, "member_id": member_id, "warnings": [warning]}
            await self.warnings.insert_one(member_data)
        else:
            member_data["warnings"].append(warning)
            await self.warnings.update_one(search_object, {"$set": member_data})

        return len(member_data["warnings"])

    async def get_warnings(self, guild_id: int, member_id: int):
        member_data = await self.warnings.find_one({"guild_id": guild_id, "member_id": member_id})
        return member_data["warnings"] if member_data is not None else None

    async def remove_warning(self, guild_id: int, member_id: int, warns_to_remove):
        warns_to_remove = " ".join(warns_to_remove.split())
        warnings = await self.get_warnings(guild_id, member_id)
        warn_count_before = len(warnings) if warnings else 0
        separators = [",", " "]

        if warns_to_remove == "*":
            await self.warnings.delete_one({"guild_id": guild_id, "member_id": member_id})
            warnings = []

        elif warns_to_remove.isdigit():
            self.__remove(warnings, warns_to_remove)

        elif any(s in warns_to_remove for s in separators):
            warns_to_remove = self.__args_to_list(warns_to_remove, separators)
            for number in reversed(sorted(warns_to_remove)):
                self.__remove(warnings, number)

        await self.warnings.update_one(
            {"guild_id": guild_id, "member_id": member_id}, {"$set": {"warnings": warnings}}
        )

        return len(warnings), warn_count_before - len(warnings)

    def __args_to_list(self, args, separators):
        args = " ".join(args.split())

        for char in separators:
            if char in args:
                args = "".join(args.split())
                return args.split(char)

        return None

    def __remove(self, warnings, number):
        index = int(number) - 1
        warnings.pop(index)

        return warnings

from .mock.ticket_service_mock import tickets_metadata_mock, tickets_mock


class TicketService:
    def config(self, guild_id: int, category: str):
        guild_metadata_entry = next(
            filter(lambda x: x["guild_id"] == guild_id, tickets_metadata_mock), None
        )

        if not guild_metadata_entry:
            tickets_metadata_mock.append({"guild_id": guild_id, "category": category})
        else:
            guild_metadata_entry["category"] = category

    def get_config(self, guild_id):
        return next(filter(lambda x: x["guild_id"] == guild_id, tickets_metadata_mock), None)

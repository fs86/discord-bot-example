import discord
from discord.commands import Option
from discord.ext import commands

from core import Config
from core.ui import DialogResult
from services import TicketService

from .create_ticket_dialog import CreateTicketDialog


class TicketCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.ticket_service = TicketService()

    @discord.slash_command(guild_ids=[Config().bot.dev_server_id])
    async def ticket(
        self,
        ctx: discord.ApplicationContext,
        ticket_type: Option(
            str,
            "Art des Tickets",
            choices=["Bewerbung", "Beschwerde", "Allgemeine Frage"],
            required=True,
        ),
    ):
        ticket_create_dialog = CreateTicketDialog(
            title=f"Neues Ticket: {ticket_type}",
            callback=self.ticket_dialog_callback,
            params={"ticket_type": ticket_type},
        )

        await ctx.send_modal(ticket_create_dialog)

    async def ticket_dialog_callback(self, result: DialogResult):
        await result.interaction.response.send_message(
            f"Art des Tickets: {result.params['ticket_type']}\r\n"
            f"Beschreibung: {result.data[0].value}\r\n"
        )


def setup(bot: commands.Bot):
    bot.add_cog(TicketCog(bot))

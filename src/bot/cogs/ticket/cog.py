import discord
from discord.commands import Option
from discord.ext import commands

from core.ui import DialogResult
from services import TicketService

from .create_ticket_dialog import CreateTicketDialog


class TicketCog(commands.Cog):
    ticket = discord.SlashCommandGroup("ticket", "Commands related to ticket.")

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.ticket_service = TicketService()

    @ticket.command(guild_ids=[873898854607650826])
    async def config(
        self,
        ctx: discord.ApplicationContext,
        category: Option(str, "Kategorie für die Ticket-Kanäle", required=True),
    ):
        self.ticket_service.config(ctx.guild.id, category)
        config = self.ticket_service.get_config(ctx.guild.id)

        await ctx.respond(
            f"Guild ID: {config['guild_id']}\r\nCategory: {config['category']}", ephemeral=True
        )

    @ticket.command(guild_ids=[873898854607650826])
    async def create(
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
            callback=self.create_callback,
            params={"ticket_type": ticket_type},
        )

        await ctx.send_modal(ticket_create_dialog)

    async def create_callback(self, result: DialogResult):
        await result.interaction.response.send_message(
            f"Type: {result.params['ticket_type']}\r\n"
            f"Short Input: {result.data[0].value}\r\n"
            f"Long Input: {result.data[1].value}"
        )

    @ticket.command(guild_ids=[873898854607650826])
    async def close(
        self,
        ctx: discord.ApplicationContext,
        reason: Option(str, "Begründung"),
    ):
        await ctx.respond(f"Ticket wurde geschlossen.\r\nBegründung: {reason}", ephemeral=True)


def setup(bot: commands.Bot):
    bot.add_cog(TicketCog(bot))

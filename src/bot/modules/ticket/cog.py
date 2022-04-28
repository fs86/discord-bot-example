import discord
from discord.commands import Option
from discord.ext import commands

from .ticket_manager import TicketManager


class TicketCog(commands.Cog):
    ticket = discord.SlashCommandGroup("ticket", "Commands related to ticket.")

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.ticket_manager = TicketManager()

    @ticket.command(guild_ids=[873898854607650826])
    async def config(
        self,
        ctx: discord.ApplicationContext,
        category: Option(str, "Kategorie für die Ticket-Kanäle", required=True),
    ):
        self.ticket_manager.config(ctx.guild.id, category)
        config = self.ticket_manager.get_config(ctx.guild.id)

        await ctx.respond(
            f"Guild ID: {config['guild_id']}\r\nCategory: {config['category']}", ephemeral=True
        )

    @ticket.command(guild_ids=[873898854607650826])
    async def create(self, ctx: discord.ApplicationContext):
        await ctx.respond("Ticket wurde erstellt", ephemeral=True)

    @ticket.command(guild_ids=[873898854607650826])
    async def close(
        self,
        ctx: discord.ApplicationContext,
        reason: Option(str, "Begründung"),
    ):
        await ctx.respond(f"Ticket wurde geschlossen.\r\nBegründung: {reason}", ephemeral=True)


def setup(bot: commands.Bot):
    bot.add_cog(TicketCog(bot))

import discord
from discord import OptionChoice, option
from discord.ext import commands

from core import Config
from services import SettingsService


class SettingsCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.settings_service = SettingsService()

    @commands.command()
    async def my_prefix_command(self, ctx: commands.Context):
        print(f"Hello {ctx.author.display_name} 👋")

    @discord.slash_command(guild_ids=[Config().bot.dev_server_id])
    @option(
        "key",
        description="Welche Einstellung möchtest du ändern?",
        choices=[
            OptionChoice(name="Bot Prefix", value="bot_prefix"),
            OptionChoice(name="Ticket Kategorie", value="ticket_category"),
        ],
    )
    @option("value", description="Neuer Wert")
    async def settings(self, ctx: discord.ApplicationContext, key: str, value: str):
        await self.settings_service.set(ctx.guild.id, key, value)
        await ctx.respond(f"Einstellung für '{key}' wurde geändert zu '{value}'", ephemeral=True)


def setup(bot: commands.Bot):
    bot.add_cog(SettingsCog(bot))

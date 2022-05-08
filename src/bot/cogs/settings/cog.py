import discord
from discord.commands import Option
from discord.ext import commands

from core import Config
from services import SettingsService


class SettingsCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.settings_service = SettingsService()

        self.key_mapping = {"Bot Prefix": "bot_prefix", "Ticket Kategorie": "ticket_category"}

    @commands.command()
    async def my_prefix_command(self, ctx: commands.Context):
        print(f"Hello {ctx.author.display_name} 👋")

    @discord.slash_command(guild_ids=[Config().bot.dev_server_id])
    async def settings(
        self,
        ctx: discord.ApplicationContext,
        key: Option(
            str,
            "Welche Einstellung möchtest du ändern?",
            choices=["Bot Prefix", "Ticket Kategorie"],
        ),
        value: Option(str, "Neuer Wert"),
    ):
        internal_key = self.key_mapping[key]
        await self.settings_service.set(ctx.guild.id, internal_key, value)
        await ctx.respond(f"Einstellung für '{key}' wurde geändert zu '{value}'", ephemeral=True)


def setup(bot: commands.Bot):
    bot.add_cog(SettingsCog(bot))

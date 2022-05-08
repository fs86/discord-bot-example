import discord
from discord.ext import commands

from services import SettingsService


class MainCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.settings_service = SettingsService()

    @commands.Cog.listener()
    async def on_ready(self):
        print(f"{self.bot.user.name} has connected to Discord!")
        await self.settings_service.initialize([guild.id for guild in self.bot.guilds])

    @commands.Cog.listener()
    async def on_guild_join(self, guild: discord.Guild):
        await self.settings_service.initialize(guild.id, integrity_check=False)

    @discord.slash_command()
    @commands.is_owner()
    async def synccommands(self, ctx: discord.ApplicationContext):
        await self.bot.sync_commands()
        await ctx.respond("Commands has been synchronized", ephemeral=True)


def setup(bot: commands.Bot):
    bot.add_cog(MainCog(bot))

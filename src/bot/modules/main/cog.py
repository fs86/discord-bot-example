import discord
from discord.ext import commands


class MainCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_ready(self):
        print(f"{self.bot.user.name} has connected to Discord!")

    @discord.slash_command()
    async def sync(self, ctx: discord.ApplicationContext):
        await self.bot.sync_commands()


def setup(bot: commands.Bot):
    bot.add_cog(MainCog(bot))

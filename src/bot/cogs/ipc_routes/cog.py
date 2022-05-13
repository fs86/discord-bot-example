from discord.ext import commands, ipc


class IpcRoutes(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @ipc.server.route()
    async def get_guild_count(self, data):
        return len(self.bot.guilds)

    @ipc.server.route()
    async def get_guild_ids(self, data):
        return [{"id": str(guild.id), "name": guild.name} for guild in self.bot.guilds]


def setup(bot: commands.Bot):
    bot.add_cog(IpcRoutes(bot))

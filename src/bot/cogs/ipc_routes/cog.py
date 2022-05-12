from discord.ext import commands, ipc


class IpcRoutes(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @ipc.server.route()
    async def get_guild_count(self, data):
        return len(self.bot.guilds)

    @ipc.server.route()
    async def get_guilds(self, data):
        guild_data = [{"id": guild.id, "member_count": len(guild.members)} for guild in self.bot.guilds]
        return guild_data


def setup(bot: commands.Bot):
    bot.add_cog(IpcRoutes(bot))

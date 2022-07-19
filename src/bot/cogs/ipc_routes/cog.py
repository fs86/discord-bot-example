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

    @ipc.server.route()
    async def get_guild_channels(self, data):
        guild = self.bot.get_guild(data.guild_id)
        source = guild.text_channels if data.text_channels_only else guild.channels

        return [{"id": str(channel.id), "name": channel.name} for channel in source]

    @ipc.server.route()
    async def get_bot_nickname(self, data):
        guild = self.bot.get_guild(data.guild_id)
        return guild.me.nick or guild.me.name

    @ipc.server.route()
    async def set_bot_nickname(self, data):
        guild = self.bot.get_guild(data.guild_id)
        await guild.me.edit(nick=data.bot_nickname)


def setup(bot: commands.Bot):
    bot.add_cog(IpcRoutes(bot))

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

    @commands.Cog.listener()
    async def on_member_join(self, member: discord.Member):
        guild_settings = await self.settings_service.get(member.guild.id)
        welcome_channel = member.guild.get_channel(guild_settings.welcome_channel_id)

        placeholder_values = {
            "member_name": member.name,
            "member_mention": member.mention,
            "guild_name": member.guild.name,
        }

        welcome_message = guild_settings.welcome_message.format(**placeholder_values)

        await welcome_channel.send(welcome_message)

    @commands.Cog.listener()
    async def on_member_remove(self, member: discord.Member):
        guild_settings = await self.settings_service.get(member.guild.id)
        leave_channel = member.guild.get_channel(guild_settings.leave_channel_id)

        placeholder_values = {"member_name": member.name, "guild_name": member.guild.name}
        leave_message = guild_settings.leave_message.format(**placeholder_values)

        await leave_channel.send(leave_message)

    @discord.slash_command()
    @commands.is_owner()
    async def synccommands(self, ctx: discord.ApplicationContext):
        await self.bot.sync_commands()
        await ctx.respond("Commands has been synchronized", ephemeral=True)


def setup(bot: commands.Bot):
    bot.add_cog(MainCog(bot))

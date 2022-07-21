import discord
from discord.ext import commands

from services import SettingsService


class MemberIsBlacklisted(commands.CommandError):
    """test"""


class BaseCog(commands.Cog):
    def __init__(self) -> None:
        super().__init__()
        self.settings_service = SettingsService()

    async def cog_before_invoke(self, ctx: discord.ApplicationContext) -> None:
        guild_settings = await self.settings_service.get(ctx.guild_id)

        if str(ctx.author.id) in guild_settings.blacklist:
            raise MemberIsBlacklisted()

        return await super().cog_before_invoke(ctx)

    async def cog_command_error(self, ctx: discord.ApplicationContext, error: Exception) -> None:
        if isinstance(error, MemberIsBlacklisted):
            await ctx.respond(
                f"You cannot execute any commands on this server because you have been blacklisted. "
                f"Please contact an administrator.",
                ephemeral=True,
            )

            return

        return await super().cog_command_error(ctx, error)

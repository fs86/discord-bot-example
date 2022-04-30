import discord
from discord.commands import Option
from discord.ext import commands

from core import Config

from .warn_manager import WarnManager


class WarnCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.warn_manager = WarnManager()

    # @discord.slash_command(guild_ids=[Config().bot.dev_server_id])
    # async def warn(
    #     self,
    #     ctx: discord.ApplicationContext,
    #     member: Option(discord.Member, "Benutzer, welcher verwarnt werden soll"),
    #     reason: Option(str, "Begründung der Verwarung", required=False),
    # ):
    #     reason = reason or "<Keine Begründung angegeben>"
    #     await self.warn_manager.add_warning(ctx.guild_id, member.id, reason)
    #     await ctx.respond(f"{member} wurde verwarnt\r\nBegründung: {reason}", ephemeral=True)

    @commands.command()
    async def warn(self, ctx: commands.Context, member: discord.Member, *, reason: str = None):
        reason = reason or "<Keine Begründung angegeben>"
        await self.warn_manager.add_warning(ctx.guild.id, member.id, reason)
        await ctx.channel.send(f"{member} wurde verwarnt\r\nBegründung: {reason}")

    # @discord.slash_command(guild_ids=[Config().bot.dev_server_id])
    # async def warninfo(
    #     self,
    #     ctx: discord.ApplicationContext,
    #     member: Option(discord.Member, "Member", required=False),
    # ):
    #     member = member or ctx.author
    #     warnings = await self.warn_manager.get_warnings(ctx.guild.id, member.id)
    #     title, description = "", ""

    #     if warnings:
    #         title = f"{member.name} hat {len(warnings)} Verwarnungen"

    #         for i, warning in enumerate(warnings):
    #             number = str(i + 1).zfill(2)
    #             description += f"`{number}` {warning['reason']}\r\n"
    #     else:
    #         title = f"{member.name} dosn't have any warnings"

    #     embed = discord.Embed(title=title, description=description)
    #     await ctx.respond(embed=embed, ephemeral=True)

    @commands.command()
    async def warninfo(self, ctx: commands.Context, member: discord.Member = None):
        member = member or ctx.author
        warnings = await self.warn_manager.get_warnings(ctx.guild.id, member.id)
        title, description = "", ""

        if warnings:
            title = f"{member.name} hat {len(warnings)} Verwarnungen"

            for i, warning in enumerate(warnings):
                number = str(i + 1).zfill(2)
                description += f"`{number}` {warning.reason}\r\n"
        else:
            title = f"{member.name} dosn't have any warnings"

        embed = discord.Embed(title=title, description=description)
        await ctx.channel.send(embed=embed)

    @discord.slash_command(guild_ids=[Config().bot.dev_server_id])
    async def removewarn(
        self,
        ctx: discord.ApplicationContext,
        member: Option(discord.Member, "Member"),
        warn_to_remove,
    ):
        warn_count, warns_removed = await self.warn_manager.remove_warning(
            ctx.guild.id, member.id, warn_to_remove
        )

        warning_text_1 = "Verwarnung" if warns_removed == 1 else "Verwarnungen"
        warning_text_2 = "Verwarnung" if warn_count == 1 else "Verwarnungen"

        await ctx.respond(
            f"{warns_removed} {warning_text_1} wurden entfernt. {member} hat noch {warn_count} {warning_text_2}.",
            ephemeral=True,
        )


def setup(bot: commands.Bot):
    bot.add_cog(WarnCog(bot))

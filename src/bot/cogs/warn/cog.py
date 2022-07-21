import discord
from discord import option
from discord.ext import commands

from cogs.base_cog import BaseCog
from core import Config
from services import WarnService


class WarnCog(BaseCog):
    # def __init__(self, bot: commands.Bot):
    #     self.bot = bot
    #     self.warn_service = WarnService()

    def __init__(self, bot: commands.Bot) -> None:
        super().__init__()
        self.bot = bot
        self.warn_service = WarnService()

    @discord.slash_command(guild_ids=[Config().bot.dev_server_id])
    @option("member", description="Benutzer, welcher verwarnt werden soll")
    @option("reason", description="Begründung der Verwarung", default="<Keine Begründung angegeben>")
    async def warn(self, ctx: discord.ApplicationContext, member: discord.Member, reason: str):
        await self.warn_service.add_warning(
            guild_id=ctx.guild_id,
            member_id=member.id,
            member_ref=f"{member}",
            created_by_id=ctx.author.id,
            created_by_ref=f"{ctx.author}",
            reason=reason,
        )

        await ctx.respond(f"{member} wurde verwarnt\r\nBegründung: {reason}", ephemeral=True)

    @discord.slash_command(guild_ids=[Config().bot.dev_server_id])
    @option("member", description="Member", requried=False)
    async def warninfo(self, ctx: discord.ApplicationContext, member: discord.Member):
        member = member or ctx.author
        warnings = await self.warn_service.get_warnings(ctx.guild.id, member.id)
        title, description = "", ""

        if warnings:
            title = f"{member.name} hat {len(warnings)} Verwarnungen"

            for i, warning in enumerate(warnings):
                number = str(i + 1).zfill(2)
                description += f"`{number}` {warning['reason']}\r\n"
        else:
            title = f"{member.name} wurde noch nicht verwarnt"

        embed = discord.Embed(title=title, description=description)
        await ctx.respond(embed=embed, ephemeral=True)

    @discord.slash_command(guild_ids=[Config().bot.dev_server_id])
    @option("member", description="Member")
    async def removewarn(self, ctx: discord.ApplicationContext, member: discord.Member, warn_to_remove):
        warn_count, warns_removed = await self.warn_service.remove_warning(ctx.guild.id, member.id, warn_to_remove)

        warning_text_1 = "Verwarnung" if warns_removed == 1 else "Verwarnungen"
        warning_text_2 = "Verwarnung" if warn_count == 1 else "Verwarnungen"

        await ctx.respond(
            f"{warns_removed} {warning_text_1} wurden entfernt. {member} hat noch {warn_count} {warning_text_2}.",
            ephemeral=True,
        )


def setup(bot: commands.Bot):
    bot.add_cog(WarnCog(bot))

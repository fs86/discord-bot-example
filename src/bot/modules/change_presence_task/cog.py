import random

import discord
from discord.ext import commands, tasks


class ChangePresenceTaskCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.game_list = [
            "Minesweeper",
            "Day of the Tentacle",
            "Maniac Mansion",
            "The Lost Vikings",
            "Turrican",
            "Turrican 2: The Final Fight",
            "Turrican 3: Payment Day",
            "The Secret of Monkey Island",
            "Monkey Island 2: LeChuck’s Revenge",
            "The Curse of Monkey Island",
            "Prince of Persia",
            "Another World",
            "Alien Breed",
        ]

        self.change_activity_task.start()

    @commands.Cog.listener()
    async def on_connect(self):
        await self.change_presence()

    @tasks.loop(minutes=5)
    async def change_activity_task(self):
        activity = discord.Game(random.choice(self.game_list))
        await self.change_presence(activity)

    @change_activity_task.before_loop
    async def before_change_activity_task(self):
        await self.bot.wait_until_ready()

    async def change_presence(self, activity: discord.BaseActivity = None):
        await self.bot.change_presence(activity=activity, status=discord.Status.online)


def setup(bot: commands.Bot):
    bot.add_cog(ChangePresenceTaskCog(bot))

import asyncio

import discord
from discord.ext import commands
from uvicorn import Config as ApiConfig
from uvicorn import Server as ApiServer

import api
from bot import Bot
from core import Config, mongodb
from models.warn import Warn, WarnDetails

bot = Bot(
    command_prefix=commands.when_mentioned_or(Config().bot.prefix),
    intents=discord.Intents.all(),
    auto_sync_commands=True,
    case_insensitive=True,
    owner_id=Config().bot.owner_id,
)

if __name__ == "__main__":
    api_config = ApiConfig(app=api.app, loop=bot.loop)
    api_server = ApiServer(api_config)

    tasks = [
        bot.loop.create_task(bot.start(Config().bot.token)),
        bot.loop.create_task(mongodb.configure(autoload_models=True)),
        bot.loop.create_task(api_server.serve()),
    ]

    bot.loop.run_until_complete(asyncio.gather(*tasks, return_exceptions=False))

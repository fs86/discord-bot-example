import os

from discord.ext import commands

from core.config import Config


def load(
    client: commands.Bot,
    skip: list[str] = None,
):
    disabled_cogs = Config().bot.disabled_cogs if "disabled_cogs" in Config().bot else []

    cogs_loaded = []
    for folder in os.listdir("cogs"):
        if folder not in disabled_cogs and os.path.exists(os.path.join("cogs", folder, "cog.py")):
            if folder in skip:
                continue

            client.load_extension(f"cogs.{folder}.cog")
            cogs_loaded.append(folder)

    print(f"Cogs loaded: {', '.join(cogs_loaded)}")

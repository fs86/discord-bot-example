import os

from discord.ext import commands

from core.config import Config


def load(
    client: commands.Bot,
    root_directory: str,
    cog_file_name: str = "cog",
    skip: list[str] = None,
):
    disabled_cogs = Config().bot.disabled_cogs if "disabled_cogs" in Config().bot else []

    cogs_loaded = []
    for folder in os.listdir(root_directory):
        if folder not in disabled_cogs and os.path.exists(os.path.join(root_directory, folder, f"{cog_file_name}.py")):
            if folder in skip:
                continue

            client.load_extension(f"{root_directory}.{folder}.{cog_file_name}")
            cogs_loaded.append(folder)

    print(f"Cogs loaded: {', '.join(cogs_loaded)}")

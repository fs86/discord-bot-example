from discord.ext import commands, ipc

from core import Config, cogloader
from services import SettingsService


class Bot(commands.Bot):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.__ipc_server = None

        api_enabled = Config().api.enabled
        skip = ["ipc_routes"] if not api_enabled else []

        cogloader.load(self, root_directory="cogs", cog_file_name="cog", skip=skip)

        if api_enabled:
            self.__ipc_server = ipc.Server(self, secret_key=Config().ipc.secret_key)
            self.__ipc_server.start()

    async def on_ipc_error(self, endpoint, error):
        print(endpoint, "raised", error)

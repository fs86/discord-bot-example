from discord.ext import ipc

from core import Config


class IpcFactory:
    @staticmethod
    def get_client() -> ipc.Client:
        return ipc.Client(secret_key=Config().ipc.secret_key)

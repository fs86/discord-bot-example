from discord.ext import ipc

from core import Config

ipc_client = ipc.Client(secret_key=Config().ipc.secret_key)

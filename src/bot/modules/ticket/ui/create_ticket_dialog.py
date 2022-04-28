import discord

from ui.base_dialog import BaseDialog


class CreateTicketDialog(BaseDialog):
    def __init__(self, callback, *args, **kwargs) -> None:
        super().__init__(callback, *args, **kwargs)

        self.add_item(discord.ui.InputText(label="Short Input"))
        self.add_item(discord.ui.InputText(label="Long Input", style=discord.InputTextStyle.long))

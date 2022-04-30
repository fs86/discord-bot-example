from typing import Callable, Optional

import discord

from ui import Dialog, DialogResult


class CreateTicketDialog(Dialog):
    def __init__(
        self,
        callback: Callable[[DialogResult], None],
        params: Optional[dict] = None,
        *args,
        **kwargs
    ) -> None:
        super().__init__(callback, params, *args, **kwargs)

        self.add_item(discord.ui.InputText(label="Short Input"))
        self.add_item(discord.ui.InputText(label="Long Input", style=discord.InputTextStyle.long))

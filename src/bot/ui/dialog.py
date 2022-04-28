from typing import Callable, List

import discord


class MissingDialogCallbackException(Exception):
    """An Exception raised when no callback was provided."""


class DialogResult:
    __interaction: discord.Interaction
    __dialog_values: List[discord.InputText]

    def __init__(
        self, interaction: discord.Interaction, dialog_values: List[discord.InputText]
    ) -> None:
        self.__interaction = interaction
        self.__dialog_values = dialog_values

    @property
    def interaction(self):
        return self.__interaction

    @property
    def dialog_values(self):
        return self.__dialog_values


class Dialog(discord.ui.Modal):
    callback_fn: Callable[[DialogResult], None]

    def __init__(self, callback: Callable[[DialogResult], None], *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

        if not callback:
            raise MissingDialogCallbackException("A dialog callback must be specified.")

        self.callback_fn = callback

    async def callback(self, interaction: discord.Interaction):
        await self.callback_fn(DialogResult(interaction, self.children))

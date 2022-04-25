from fastapi_discord import DiscordOAuthClient

from core import Config

__oauth_config = Config().oauth
discord_oauth = DiscordOAuthClient(
    __oauth_config.client_id,
    __oauth_config.client_secret,
    __oauth_config.redirect_uri,
    tuple(__oauth_config.scopes),
)

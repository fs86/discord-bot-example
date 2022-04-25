from fastapi_discord import DiscordOAuthClient

from core import Config

# Check out https://github.com/tokusumi/fastapi-cloudauth for OAuth2 authentication.
# When using PyJWT, dont forget to install PyJWT["crypto"].

__oauth_config = Config().oauth
discord_oauth = DiscordOAuthClient(
    __oauth_config.client_id,
    __oauth_config.client_secret,
    __oauth_config.redirect_uri,
    tuple(__oauth_config.scopes),
)

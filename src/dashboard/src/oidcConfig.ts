import { AuthProviderProps } from 'react-oidc-context';
import { resetUrl } from '@helpers';

function getUserinfoEndpoint() {
  return import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/account`
    : 'https://discord.com/api/users/@me';
}

export const oidcConfig: AuthProviderProps = {
  authority: 'https://discord.com/',
  client_id: String(import.meta.env.VITE_DC_CLIENT_ID),
  redirect_uri: window.location.origin,
  scope: 'identify email guilds',
  loadUserInfo: true,
  metadata: {
    authorization_endpoint: 'https://discord.com/api/oauth2/authorize',
    token_endpoint: 'https://discord.com/api/oauth2/token',
    revocation_endpoint: 'https://discord.com/api/oauth2/token/revoke',
    userinfo_endpoint: getUserinfoEndpoint(),
    // Discord does not provide a end session endpoint so we set this to the app url.
    end_session_endpoint: window.location.origin,
  },
  onRemoveUser: () => resetUrl(),
  onSigninCallback: () => resetUrl(),
};

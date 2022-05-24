import axios from 'axios';
import { User } from 'oidc-client-ts';

function getAccessToken() {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:https://discord.com/:${import.meta.env.VITE_DC_CLIENT_ID}`
  );

  if (!oidcStorage) {
    throw new Error('Invalid access token');
  }

  return User.fromStorageString(oidcStorage).access_token;
}

export function registerAxiosInterceptors() {
  axios.interceptors.request.use(
    (request) => {
      const accessToken = getAccessToken();
      request.headers = request.headers || {};
      request.headers['Authorization'] = `Bearer ${accessToken}`;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

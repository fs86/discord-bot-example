import { useRoutes } from 'react-router-dom';
import { Home } from '@pages';
import { NotFound } from '@pages/common';
import { Guilds } from '@pages/GuildSettings';

export function Routes() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/guilds', element: <Guilds /> },
    { path: '*', element: <NotFound /> },
  ]);

  return routes;
}

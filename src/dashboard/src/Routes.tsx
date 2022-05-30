import { ReactNode } from 'react';
import { useRoutes } from 'react-router-dom';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { Home } from '@pages';
import { GuildSettings } from '@pages';
import { NotFound } from '@pages/common';

function when(
  condition: boolean,
  component: JSX.Element,
  fallback: JSX.Element = <NotFound />
): ReactNode {
  return condition ? component : fallback;
}

export function Routes() {
  const { selectedGuild } = useGuildSelection();

  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/guild', element: when(selectedGuild !== undefined, <GuildSettings />) },
    { path: '*', element: <NotFound /> },
  ]);

  return routes;
}

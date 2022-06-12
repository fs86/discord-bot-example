import { ReactNode } from 'react';
import { useRoutes } from 'react-router-dom';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { GuildSettingsPage, NotFound, OverviewPage } from '@pages';

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
    { path: '/', element: <OverviewPage /> },
    { path: '/guild', element: when(selectedGuild !== undefined, <GuildSettingsPage />) },
    { path: '*', element: <NotFound /> },
  ]);

  return routes;
}

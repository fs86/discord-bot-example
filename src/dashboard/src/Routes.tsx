import { ReactNode } from 'react';
import { useRoutes } from 'react-router-dom';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { GuildSelectionPage, GuildSettingsPage, NotFound, OverviewPage } from '@pages';

function when(
  condition: boolean,
  component: JSX.Element,
  fallback: JSX.Element = <NotFound />
): ReactNode {
  return condition ? component : fallback;
}

function requiresSelectedGuild(component: JSX.Element) {
  const { selectedGuild } = useGuildSelection();
  return selectedGuild ? component : <GuildSelectionPage />;
}

export function Routes() {
  const routes = useRoutes([
    { path: '/', element: requiresSelectedGuild(<OverviewPage />) },
    { path: '/guild', element: requiresSelectedGuild(<GuildSettingsPage />) },
    { path: '*', element: <NotFound /> },
  ]);

  return routes;
}

import { useRoutes } from 'react-router-dom';
import { Home } from '@pages';
import { NotFound } from '@pages/common';

export function Routes() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '*', element: <NotFound /> },
  ]);

  return routes;
}

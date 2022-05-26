import { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { registerAxiosInterceptors } from '@helpers';

import App from './App';
import { oidcConfig } from './oidcConfig';

registerAxiosInterceptors();

const queryClient = new QueryClient();

// Workaround for https://github.com/tannerlinsley/react-query/issues/3476
declare module 'react-query/types/react/QueryClientProvider' {
  // eslint-disable-next-line no-unused-vars
  interface QueryClientProviderProps {
    children?: ReactNode;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <AuthProvider {...oidcConfig}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </AuthProvider>
);

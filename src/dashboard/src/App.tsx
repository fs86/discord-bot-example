import { useAuth } from 'react-oidc-context';
import { GuildSelectionContextProvider } from '@context-providers/GuildSelectionContext';
import { LandingPage } from '@pages/LandingPage';

import { GlobalStyles } from './GlobalStyles';
import { Layout } from './Layout';
import { Routes } from './Routes';

function App() {
  const { isAuthenticated, isLoading, error } = useAuth();
  if (isLoading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Oops... {error.message}</>;
  }

  return (
    <GlobalStyles appName="Dashboard">
      {isAuthenticated ? (
        <GuildSelectionContextProvider>
          <Layout>
            <Routes />
          </Layout>
        </GuildSelectionContextProvider>
      ) : (
        <LandingPage />
      )}
    </GlobalStyles>
  );
}

export default App;

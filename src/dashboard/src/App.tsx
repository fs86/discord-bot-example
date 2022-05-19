import { useAuth } from 'react-oidc-context';
import { LandingPage } from '@pages/LandingPage';

import { GlobalStyles } from './theming/GlobalStyles';
import { Layout } from './theming/Layout';
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
        <Layout>
          <Routes />
        </Layout>
      ) : (
        <LandingPage />
      )}
    </GlobalStyles>
  );
}

export default App;

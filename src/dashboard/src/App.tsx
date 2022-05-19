import { useAuth } from 'react-oidc-context';
import { LandingPage } from '@pages/LandingPage';
import { ThemeProvider } from 'styled-components';

import { Layout } from './Layout';
import { Routes } from './Routes';
import { theme } from './Theme';

function App() {
  const { isAuthenticated, isLoading, error } = useAuth();
  if (isLoading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Oops... {error.message}</>;
  }

  return (
    <ThemeProvider theme={theme}>
      {isAuthenticated ? (
        <Layout>
          <Routes />
        </Layout>
      ) : (
        <LandingPage />
      )}
    </ThemeProvider>
  );
}

export default App;

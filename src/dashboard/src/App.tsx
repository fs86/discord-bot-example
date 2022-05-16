import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useQuery } from 'react-query';
import { theme } from '@layouts/DefaultTheme';
import { LandingPage } from '@pages/LandingPage';
import { getGuilds } from '@services/accountService';
import { Guild } from '@viewmodels/discord';
import { ThemeProvider } from 'styled-components';

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
    <ThemeProvider theme={theme}>{isAuthenticated ? <Routes /> : <LandingPage />}</ThemeProvider>
  );
}

export default App;

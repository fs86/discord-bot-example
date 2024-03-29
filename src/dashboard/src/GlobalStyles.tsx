import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { theme } from './Theme';

interface StylesProps {
  appName: string;
  children?: ReactNode;
}

const GlobalStyle = createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.foreground};
  }

  html,
  body {
    margin: 0;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export function GlobalStyles({ appName, children }: StylesProps) {
  return (
    <>
      <Helmet>
        <title>{appName}</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
}

import { ReactNode } from 'react';
import styled from 'styled-components';

interface LandingPageLayoutProps {
  children: ReactNode;
}

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  text-align: center;
  padding-top: 4rem;

  h1 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  & > * {
    margin: 0 auto;
  }
`;

export function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return <Wrapper>{children}</Wrapper>;
}

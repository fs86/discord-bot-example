import { ReactNode } from 'react';
import { useAuth } from 'react-oidc-context';
import { DiscordProfileButton } from '@components';
import { ScrollContainer } from '@components/common/ScrollContainer';
import { getNavigationItems, Header, Navigation } from '@components/layout';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  height: 100vh;
`;

const Main = styled.main`
  display: grid;
  overflow-y: auto;
  grid-template-columns: min-content 1fr;
`;

const Content = styled(ScrollContainer)`
  background-color: ${({ theme }) => theme.colors.content.background};
  color: ${({ theme }) => theme.colors.foreground};
  padding: 1.5rem;
  overflow-y: auto;

  h1 {
    margin-top: 0;
  }
`;

export function Layout({ children }: LayoutProps) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <Wrapper>
      <Header title="Dashboard" actionBarContent={<DiscordProfileButton size={32} />} />
      <Main>
        <Navigation items={getNavigationItems()} />
        <Content>{children}</Content>
      </Main>
    </Wrapper>
  );
}

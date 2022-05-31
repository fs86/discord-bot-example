import { ReactNode, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { DiscordProfileButton, GuildSelection, Link } from '@components';
import { Navigation, NavigationToggleButton } from '@components/layout';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  height: 100vh;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.header.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 0 1rem;
  font-weight: 500;
  color: #fff;
`;

const HeaderContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content) 1fr;
  white-space: nowrap;
  align-items: center;
  line-height: 1;
  gap: 20px;
`;

const HeaderAppName = styled.div`
  font-size: 18pt;
  display: flex;
`;

const HeaderActionBar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 12pt;
`;

const Main = styled.main`
  display: grid;
  overflow-y: auto;
  grid-template-columns: min-content 1fr;
  /* grid-template-columns: 3.125rem 1fr;

  ${up('xl')} {
    grid-template-columns: 16rem 1fr;
  } */
`;

// const Navigation = styled.nav`
//   background-color: ${({ theme }) => theme.colors.navigation.background};
//   color: ${({ theme }) => theme.colors.foreground};
//   padding: 0.375rem;
// `;

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.content.background};
  color: ${({ theme }) => theme.colors.foreground};
  padding: 1.5rem;
  overflow-y: auto;

  h1 {
    margin-top: 0;
  }
`;

const StyledLink = styled(Link)`
  margin-bottom: 4px;
`;

export function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { isLoading } = useAuth();

  function toggleNavigation() {
    setCollapsed(!collapsed);
  }

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <Wrapper>
      <Header>
        <HeaderContent>
          <HeaderAppName>
            <StyledLink to="/" disableHover>
              Dashboard
            </StyledLink>
          </HeaderAppName>
          <GuildSelection
            label="Server:"
            labelPosition="left"
            placeholder="Klicke hier, um einen Server auszuwählen"
          />
          <HeaderActionBar>
            <DiscordProfileButton size={32} />
          </HeaderActionBar>
        </HeaderContent>
      </Header>
      <Main>
        <Navigation />
        <Content>{children}</Content>
      </Main>
    </Wrapper>
  );
}

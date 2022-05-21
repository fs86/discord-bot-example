import { ReactElement } from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { ChartBar, Home, Wrench } from '@styled-icons/fa-solid';
import styled, { css } from 'styled-components';

interface NavigationProps {
  collapsed: boolean;
}

const Wrapper = styled.div<{ width: number }>`
  background-color: ${({ theme }) => theme.colors.navigation.background};
  color: ${({ theme }) => theme.colors.foreground};
  width: ${({ width }) => width}px;
  padding-top: 1rem;
  transition: 0.3s;
  margin: 0;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledLink = styled(NavLink)<{ $isActive?: boolean }>`
  display: grid;
  grid-template-columns: 50px 1fr;
  /* padding: 1rem 0; */
  padding: 1rem 0;
  white-space: nowrap;
  transition: 0.3s;
  color: ${({ theme }) => theme.colors.foreground};

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `};

  svg {
    justify-self: center;
  }
`;

interface NavItemProps {
  to: string;
  icon: ReactElement;
  children: string;
}

function NavItem({ to, icon, children }: NavItemProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <StyledLink to={to} $isActive={match !== null}>
      {icon}
      {children}
    </StyledLink>
  );
}

export function Navigation({ collapsed }: NavigationProps) {
  const iconSize = 24;
  const width = collapsed ? 50 : 200;

  return (
    <Wrapper width={width}>
      <StyledList>
        <NavItem icon={<Home size={iconSize} />} to="/">
          Home
        </NavItem>
        <NavItem icon={<ChartBar size={iconSize} />} to="/guilds">
          Servereinstellungen
        </NavItem>
        <NavItem icon={<Wrench size={iconSize} />} to="/test2">
          Test2
        </NavItem>
      </StyledList>
    </Wrapper>
  );
}

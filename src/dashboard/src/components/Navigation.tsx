import { ReactElement, useState } from 'react';
import { ChartBar, Home, Wrench } from '@styled-icons/fa-solid';
import styled from 'styled-components';

import { Link } from './Link';

interface NavigationProps {}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.navigation.background};
  color: ${({ theme }) => theme.colors.foreground};
  padding-top: 1rem;
  margin: 0;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: 50px 1fr;
  padding: 1rem 0.5rem;
  white-space: nowrap;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.navigation.itemHoveredBackground};

    svg {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

interface NavItemProps {
  to: string;
  icon: ReactElement;
  children: string;
}

function NavItem({ to, icon, children }: NavItemProps) {
  return (
    <StyledLink to={to} disableHover>
      {icon}
      {children}
    </StyledLink>
  );
}

export function Navigation({}: NavigationProps) {
  const [collapsed, setCollapsed] = useState(false);
  const iconSize = 24;

  return (
    <Wrapper>
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

import { ReactElement } from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { ChartBar, Home, Wrench } from '@styled-icons/fa-solid';
import { Tooltip } from 'antd';
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
  display: block;
  padding: 1rem 0;
  white-space: nowrap;
  transition: 0.3s;
  color: ${({ theme }) => theme.colors.foreground};

  &:hover {
    background-color: ${({ theme }) => theme.colors.navigation.itemHoveredBackground};
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `};

  svg {
    justify-self: center;
  }
`;

const StyledTooltip = styled(Tooltip)`
  display: grid;
  grid-template-columns: 50px 1fr;
`;

interface NavItemProps {
  to: string;
  icon: ReactElement;
  text: string;
}

export function Navigation({ collapsed }: NavigationProps) {
  const iconSize = 24;
  const width = collapsed ? 50 : 200;

  function NavItem({ to, icon, text }: NavItemProps) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    const tooltipText = collapsed ? text : undefined;

    return (
      <StyledLink to={to} $isActive={match !== null}>
        <StyledTooltip placement="right" title={tooltipText}>
          {icon}
          {text}
        </StyledTooltip>
      </StyledLink>
    );
  }

  return (
    <Wrapper width={width}>
      <StyledList>
        <NavItem icon={<Home size={iconSize} />} to="/" text="Home" />
        <NavItem icon={<ChartBar size={iconSize} />} to="/guilds" text="Servereinstellungen" />
        <NavItem icon={<Wrench size={iconSize} />} to="/test2" text="Test2" />
      </StyledList>
    </Wrapper>
  );
}

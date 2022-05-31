import { useState } from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { Tooltip } from 'antd';
import styled, { css } from 'styled-components';

import { getNavigationItems, NavItemType } from './Navigation.items';
import { NavigationToggleButton } from './NavigationToggleButton';

const Wrapper = styled.div<{ width: number }>`
  display: grid;
  grid-template-rows: 1fr 50px;
  background-color: ${({ theme }) => theme.colors.navigation.background};
  color: ${({ theme }) => theme.colors.foreground};
  width: ${({ width }) => width}px;
  padding-top: 1rem;
  transition: 0.3s;
  margin: 0;
`;

const StyledList = styled.ul`
  list-style-type: none;
  border-bottom: 3px solid ${({ theme }) => theme.colors.background};
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

const StyledNavigationToggleButton = styled(NavigationToggleButton)<{ pos?: string }>`
  width: 50px;
  justify-self: end;
  transition: 0.3s;
`;

export function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  const width = collapsed ? 50 : 200;

  function toggleNavigation() {
    setCollapsed(!collapsed);
  }

  function NavItem({ to, icon, text, visible = true }: NavItemType) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    const tooltipText = collapsed ? text : undefined;

    if (!visible) {
      return null;
    }

    return (
      <StyledLink to={to} $isActive={match !== null}>
        <StyledTooltip placement="right" title={tooltipText}>
          {icon}
          {!collapsed && text}
        </StyledTooltip>
      </StyledLink>
    );
  }

  const toggleButtonPos = collapsed ? 'start' : 'end';

  return (
    <Wrapper width={width}>
      <StyledList>
        {getNavigationItems().map((navItem) => (
          <NavItem {...navItem} key={navItem.to.replace(/[^a-zA-Z0-9]/g, '_')} />
        ))}
      </StyledList>
      <StyledNavigationToggleButton
        collapsed={collapsed}
        pos={toggleButtonPos}
        onClick={toggleNavigation}
      />
    </Wrapper>
  );
}

import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { Tooltip } from 'antd';
import styled, { css } from 'styled-components';

import { getNavigationItems, NavItemType } from './Navigation.items';

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

export function Navigation({ collapsed }: NavigationProps) {
  const width = collapsed ? 50 : 200;

  function NavItem({ to, icon, text, showWhen = true }: NavItemType) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    const tooltipText = collapsed ? text : undefined;

    if (!showWhen) {
      return null;
    }

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
        {getNavigationItems().map((navItem) => (
          <NavItem {...navItem} key={navItem.to} />
        ))}
      </StyledList>
    </Wrapper>
  );
}

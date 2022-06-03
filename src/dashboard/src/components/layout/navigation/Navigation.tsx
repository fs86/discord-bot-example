import { ReactElement, useState } from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { ScrollContainer } from '@components/common/ScrollContainer';
import { Tooltip } from 'antd';
import styled, { css } from 'styled-components';

import { NavigationToggleButton } from './NavigationToggleButton';

export interface NavItemType {
  to: string;
  icon: ReactElement;
  text: string;
  visible?: boolean;
}

interface NavigationProps {
  items: NavItemType[];
  width?: number;
}

const Wrapper = styled.div<{ width: number }>`
  display: grid;
  grid-template-rows: 1fr 50px;
  background-color: ${({ theme }) => theme.colors.navigation.background};
  color: ${({ theme }) => theme.colors.foreground};
  width: ${({ width }) => width}px;
  overflow: hidden;
  transition: 0.3s;
  margin: 0;
`;

const Content = styled(ScrollContainer)`
  height: 100%;
  padding-top: 1rem;
`;

const ToggleButtonWrapper = styled.div`
  border-top: 3px solid ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: end;
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

  span[role='img'] {
    font-size: 24px;
  }
`;

const StyledTooltip = styled(Tooltip)`
  display: grid;
  grid-template-columns: 50px 1fr;
`;

const StyledNavigationToggleButton = styled(NavigationToggleButton)<{ pos?: string }>`
  width: 50px;
  height: 50px;
  justify-self: end;
  transition: 0.3s;
`;

export function Navigation({ items, width = 200 }: NavigationProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navWidth = collapsed ? 50 : width;

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
      <StyledTooltip placement="right" title={tooltipText}>
        <StyledLink to={to} $isActive={match !== null}>
          {icon}
          {!collapsed && text}
        </StyledLink>
      </StyledTooltip>
    );
  }

  const toggleButtonPos = collapsed ? 'start' : 'end';

  return (
    <Wrapper width={navWidth}>
      <Content scrollbar="hidden">
        <StyledList>
          {items.map((navItem) => (
            <NavItem {...navItem} key={navItem.to.replace(/[^a-zA-Z0-9]/g, '_')} />
          ))}
        </StyledList>
      </Content>
      <ToggleButtonWrapper>
        <StyledNavigationToggleButton
          collapsed={collapsed}
          pos={toggleButtonPos}
          onClick={toggleNavigation}
        />
      </ToggleButtonWrapper>
    </Wrapper>
  );
}

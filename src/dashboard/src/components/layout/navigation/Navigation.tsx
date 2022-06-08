import { ReactElement, useState } from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { ScrollContainer } from '@components/common';
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
  collapsedWidth?: number;
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
  white-space: nowrap;
  transition: 0.3s;
  color: ${({ theme }) => theme.colors.foreground};
  height: 50px;
  align-items: center;

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

const StyledTooltip = styled(Tooltip)<{ collapsedWidth: number }>`
  display: grid;
  grid-template-columns: ${({ collapsedWidth }) => collapsedWidth}px 1fr;
`;

const StyledNavigationToggleButton = styled(NavigationToggleButton)<{ collapsedWidth: number }>`
  width: ${({ collapsedWidth }) => collapsedWidth}px;
  height: 50px;
  justify-self: end;
  transition: 0.3s;
`;

export function Navigation({ items, collapsedWidth = 50, width = 200 }: NavigationProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navWidth = collapsed ? collapsedWidth : width;

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
      <StyledTooltip collapsedWidth={collapsedWidth} placement="right" title={tooltipText}>
        <StyledLink to={to} $isActive={match !== null}>
          {icon}
          {!collapsed && text}
        </StyledLink>
      </StyledTooltip>
    );
  }

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
          collapsedWidth={collapsedWidth}
          onClick={toggleNavigation}
        />
      </ToggleButtonWrapper>
    </Wrapper>
  );
}

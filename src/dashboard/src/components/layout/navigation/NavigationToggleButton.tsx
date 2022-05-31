import {
  MenuFoldOutlined as AntdMenuFoldOutlined,
  MenuUnfoldOutlined as AntdMenuUnfoldOutlined,
} from '@ant-design/icons';
import { LinkButton } from '@components/LinkButton';
import styled, { css } from 'styled-components';

interface NavigationToggleButtonProps {
  collapsed: boolean;
  onClick: () => void;
}

const iconStyles = css`
  font-size: 24px;
`;

const MenuFoldOutlined = styled(AntdMenuFoldOutlined)`
  ${iconStyles}
`;

const MenuUnfoldOutlined = styled(AntdMenuUnfoldOutlined)`
  ${iconStyles}
`;

export function NavigationToggleButton({ collapsed, onClick }: NavigationToggleButtonProps) {
  return (
    <LinkButton onClick={onClick}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </LinkButton>
  );
}

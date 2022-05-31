import {
  MenuFoldOutlined as AntdMenuFoldOutlined,
  MenuUnfoldOutlined as AntdMenuUnfoldOutlined,
} from '@ant-design/icons';
import { LinkButton } from '@components/LinkButton';
import styled, { css } from 'styled-components';

interface NavigationToggleButtonProps {
  collapsed: boolean;
  onClick: () => void;
  className?: string;
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

export function NavigationToggleButton({
  collapsed,
  onClick,
  className,
}: NavigationToggleButtonProps) {
  return (
    <LinkButton onClick={onClick} className={className}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </LinkButton>
  );
}

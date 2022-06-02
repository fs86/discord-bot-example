import {
  HomeOutlined as AntdHomeOutlined,
  ToolOutlined as AntdToolOutlined,
} from '@ant-design/icons';
import { useGuildSelection } from '@context-providers';
import styled, { css } from 'styled-components';

import { NavItemType } from './Navigation';

const iconStyle = css`
  font-size: 24px;
`;

const HomeOutlined = styled(AntdHomeOutlined)`
  ${iconStyle}
`;

const ToolOutlined = styled(AntdToolOutlined)`
  ${iconStyle}
`;

export function getNavigationItems(): NavItemType[] {
  const { selectedGuild } = useGuildSelection();
  const iconSize = 24;

  return [
    { icon: <HomeOutlined />, to: '/', text: 'Home' },
    {
      icon: <ToolOutlined />,
      to: '/guild',
      text: 'Servereinstellungen',
      visible: selectedGuild !== undefined,
    },
  ];
}

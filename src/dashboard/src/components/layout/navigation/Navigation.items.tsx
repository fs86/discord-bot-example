import { HomeOutlined, ToolOutlined } from '@ant-design/icons';
import { useGuildSelection } from '@context-providers';

import { NavItemType } from './Navigation';

export function getNavigationItems(): NavItemType[] {
  const { selectedGuild } = useGuildSelection();

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

import { useGuildSelection } from '@context-providers';
import { ChartBar, Home } from '@styled-icons/fa-solid';

import { NavItemType } from './Navigation';

export function getNavigationItems(): NavItemType[] {
  const { selectedGuild } = useGuildSelection();
  const iconSize = 24;

  return [
    {
      icon: <Home size={iconSize} />,
      to: '/',
      text: 'Home',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/guild',
      text: 'Servereinstellungen',
      visible: selectedGuild !== undefined,
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/dummy',
      text: 'DUMMY',
    },
  ];
}

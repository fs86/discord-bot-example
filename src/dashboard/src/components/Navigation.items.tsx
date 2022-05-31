import { ReactElement } from 'react';
import { useGuildSelection } from '@context-providers';
import { ChartBar, Home } from '@styled-icons/fa-solid';

export interface NavItemType {
  to: string;
  icon: ReactElement;
  text: string;
  showWhen?: boolean;
}

export function getNavigationItems(): NavItemType[] {
  const { selectedGuild } = useGuildSelection();
  const iconSize = 24;

  return [
    {
      icon: <Home size={iconSize} />,
      to: '/',
      text: 'Home',
      showWhen: selectedGuild !== undefined,
    },
    {
      icon: <ChartBar size={iconSize} />,
      to: '/guild',
      text: 'Servereinstellungen',
      showWhen: selectedGuild !== undefined,
    },
  ];
}

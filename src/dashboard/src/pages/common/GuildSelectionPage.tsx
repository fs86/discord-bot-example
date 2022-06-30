import { useEffect } from 'react';
import { useGuildSelection } from '@context-providers';

export function GuildSelectionPage() {
  const { selectedGuild, showGuildSelection } = useGuildSelection();

  useEffect(() => {
    showGuildSelection && showGuildSelection();
  }, [selectedGuild]);

  return null;
}

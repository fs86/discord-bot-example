import { useMemo } from 'react';
import { useGuildSelection } from '@context-providers';

export function GuildSelectionPage() {
  const { selectedGuild, showGuildSelection } = useGuildSelection();

  useMemo(() => {
    showGuildSelection && showGuildSelection();
  }, [selectedGuild]);

  return null;
}

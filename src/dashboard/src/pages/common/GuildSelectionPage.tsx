import { useMemo } from 'react';
import { useGuildSelection } from '@context-providers';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  padding-top: 4rem;
  font-size: 18pt;
`;

export function GuildSelectionPage() {
  const { selectedGuild, showGuildSelection } = useGuildSelection();

  useMemo(() => {
    showGuildSelection();
  }, [selectedGuild]);

  return null;
}

import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { getGuilds } from '@services/guildService';
import { Guild } from '@viewmodels/discord';

import { Select, SelectProps } from './Select';

type ServerSelectionProps = Omit<SelectProps<Guild>, 'data' | 'valueField' | 'textField'>;

export function GuildSelection({ width, ...props }: ServerSelectionProps) {
  const { data } = useQuery('getGuilds', getGuilds);
  const { selectedGuild, setSelectedGuild } = useGuildSelection();

  function handleOnChange(guild: Guild) {
    setSelectedGuild(guild);
    console.log('onChange');
  }

  useEffect(() => {
    console.log(selectedGuild);
  }, [selectedGuild]);

  return (
    <Select
      data={data}
      valueField="id"
      textField="name"
      width={width}
      onChange={handleOnChange}
      defaultValue={selectedGuild}
      {...props}
    />
  );
}

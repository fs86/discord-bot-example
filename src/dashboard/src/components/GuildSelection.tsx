import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { getGuilds } from '@services/guildService';
import { Guild } from '@viewmodels/discord';

import { Select, SelectProps } from './Select';

type ServerSelectionProps = Omit<SelectProps<Guild>, 'data' | 'valueField' | 'textField'>;

export function GuildSelection({ width = 200, ...props }: ServerSelectionProps) {
  const { data } = useQuery('getGuilds', getGuilds, { onSuccess: onGuildsLoaded });
  const { selectedGuild, setSelectedGuild } = useGuildSelection();

  function onGuildsLoaded(data: Guild[]) {
    console.log(data);
  }

  function handleOnChange(guild: Guild) {
    setSelectedGuild(guild);
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
      borderless
      {...props}
    />
  );
}

import { useQuery } from 'react-query';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { getGuilds } from '@services/guildService';
import { Guild } from '@viewmodels/discord';

import { Select, SelectProps } from './Select';

type ServerSelectionProps = Omit<SelectProps<Guild>, 'data' | 'valueField' | 'textField'>;

export function GuildSelection({ width = 200, ...props }: ServerSelectionProps) {
  const { data } = useQuery('getGuilds', getGuilds);
  const { setSelectedGuild } = useGuildSelection();

  function handleOnChange(guild: Guild) {
    setSelectedGuild(guild);
  }

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

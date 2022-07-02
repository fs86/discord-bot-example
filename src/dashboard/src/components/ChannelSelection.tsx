import { useQuery } from 'react-query';
import { Select, SelectProps } from '@components';
import { useGuildSelection } from '@context-providers';
import { getGuildChannels } from '@services/guildService';
import { GuildChannel } from '@viewmodels';

interface ChannelSelectionProps
  extends Omit<SelectProps<number, GuildChannel>, 'data' | 'valueField' | 'textField'> {
  guildId?: string;
}

export function ChannelSelection({ guildId, ...props }: ChannelSelectionProps) {
  const { selectedGuild } = useGuildSelection();

  const { data } = useQuery(['getGuildChannels', selectedGuild?.id], function () {
    return selectedGuild?.id ? getGuildChannels(selectedGuild?.id) : undefined;
  });

  return <Select valueField="id" textField="name" data={data} {...props} />;
}

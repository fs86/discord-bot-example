import { useQuery } from 'react-query';
import { getGuilds } from '@services/botService';
import { Guild } from '@viewmodels/discord';

import { Select } from './Select';

interface ServerSelectionProps {}

// eslint-disable-next-line no-empty-pattern
export function ServerSelection({}: ServerSelectionProps) {
  const { isLoading, data } = useQuery('getGuilds', getGuilds, { onSuccess: onGuildsLoaded });

  function onGuildsLoaded(data: Guild[]) {
    console.log(data);
  }

  return <Select data={data} valueField="id" textField="name" placeholder="test" />;
}

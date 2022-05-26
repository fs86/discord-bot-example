import { useQuery } from 'react-query';
import { getGuilds } from '@services/botService';
import { Guild } from '@viewmodels/discord';

import { Select } from './Select';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ServerSelectionProps {}

// eslint-disable-next-line no-empty-pattern
export function ServerSelection({}: ServerSelectionProps) {
  const { data } = useQuery('getGuilds', getGuilds, { onSuccess: onGuildsLoaded });

  function onGuildsLoaded(data: Guild[]) {
    console.log(data);
  }

  return (
    <Select
      data={data}
      valueField="id"
      textField="name"
      label="Server:"
      labelPosition="left"
      placeholder="Klicke hier um einen Server auszuwählen"
      width={200}
      borderless
    />
  );
}

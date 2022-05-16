import { useQuery } from 'react-query';
import { Select } from '@components/Select';
import { TextInput } from '@components/TextInput';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getGuilds } from '@services/botService';
import styled from 'styled-components';

export function Guilds() {
  const { isLoading, data } = useQuery('getGuilds', getGuilds, { onSuccess: onGuildsLoaded });

  function onGuildsLoaded(data: { id: string; name: string }[]) {
    console.log(data);
  }

  return (
    <DefaultLayout>
      <>
        <h1>Servereinstellungen</h1>

        {isLoading && <>Daten werden geladen ...</>}

        {!isLoading && (
          <>
            <Select name="guilds" id="guilds">
              {data?.map((guild) => (
                <option value={guild.id}>{guild.name}</option>
              ))}
            </Select>
            <br />
            <TextInput />
          </>
        )}
      </>
    </DefaultLayout>
  );
}

import { useQuery } from 'react-query';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getGuilds } from '@services/botService';
import styled from 'styled-components';

export function Guilds() {
  const { isLoading, data } = useQuery('getGuilds', getGuilds, { onSuccess: onGuildsLoaded });

  function onGuildsLoaded(data: { id: string; name: string }[]) {
    debugger;
    console.log(data);
  }

  const Select = styled.select`
    background-color: ${({ theme }) => theme.colors.background};
  `;

  return (
    <DefaultLayout>
      <>
        <h1>Servereinstellungen</h1>

        {isLoading && <>Daten werden geladen ...</>}

        {!isLoading && (
          <>
            <select name="guilds" id="guilds">
              {data?.map((guild) => (
                <option value={guild.id}>{guild.name}</option>
              ))}
            </select>
          </>
        )}
      </>
    </DefaultLayout>
  );
}

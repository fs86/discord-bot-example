import { useQuery } from 'react-query';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getGuilds } from '@services/botService';
import styled from 'styled-components';

export function Guilds() {
  const { isLoading, data } = useQuery('getGuilds', getGuilds, { onSuccess: onGuildsLoaded });

  function onGuildsLoaded(data: { id: string; name: string }[]) {
    console.log(data);
  }

  const Select = styled.select`
    background-color: ${({ theme }) => theme.colors.background};
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.foreground};
    height: 2rem;
  `;

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
          </>
        )}
      </>
    </DefaultLayout>
  );
}

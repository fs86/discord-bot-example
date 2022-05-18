import { useQuery } from 'react-query';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getGuilds } from '@services/botService';
import { Button, Select } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  width: 120px;
`;

export function Guilds() {
  const { isLoading, data } = useQuery('getGuilds', getGuilds, { onSuccess: onGuildsLoaded });
  const { Option } = Select;

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
            <Button type="primary">Primary Button</Button>
            <StyledSelect>
              {data?.map((guild) => (
                <Option value={guild.id}>{guild.name}</Option>
              ))}
            </StyledSelect>
          </>
        )}
      </>
    </DefaultLayout>
  );
}

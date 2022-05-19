import { useQuery } from 'react-query';
import { Button, Select } from '@components';
import { getGuilds } from '@services/botService';
import { Guild } from '@viewmodels/discord';
import { Input } from 'antd';

export function Guilds() {
  const { isLoading, data } = useQuery('getGuilds', getGuilds, { onSuccess: onGuildsLoaded });

  function onGuildsLoaded(data: Guild[]) {
    console.log(data);
  }

  function handleOnClick() {
    console.log('Click!');
  }

  function handleOnChange(guild: Guild) {
    debugger;
  }

  return (
    <>
      <h1>Servereinstellungen</h1>

      {isLoading && <>Daten werden geladen ...</>}

      {!isLoading && (
        <>
          {/* <Button type="primary" onClick={handleOnClick}>
            Primary Button
          </Button> */}
          <Select data={data} valueField="id" textField="name" onChange={handleOnChange} />
          {/* <Input addonBefore="First name" /> */}
        </>
      )}
    </>
  );
}

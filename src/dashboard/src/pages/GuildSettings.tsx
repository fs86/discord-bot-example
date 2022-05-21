import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Select } from '@components';
import { getGuilds, updateGuild } from '@services/botService';
import { Guild } from '@viewmodels/discord';
import { Input, Tabs } from 'antd';
import styled from 'styled-components';

const SaveButton = styled(Button)`
  margin-top: 1rem;
`;

export function Guilds() {
  const { isLoading, data } = useQuery('getGuilds', getGuilds, { onSuccess: onGuildsLoaded });
  const [selectedGuild, setSelectedGuild] = useState<Guild>();
  const [botPrefix, setBotPrefix] = useState('');
  const { TabPane } = Tabs;

  function onGuildsLoaded(data: Guild[]) {
    console.log(data);
  }

  function handleOnChange(guild: Guild) {
    setSelectedGuild(guild);
  }

  function handleOnPrefixChange(event: ChangeEvent<HTMLInputElement>) {
    setBotPrefix(event.target.value);
  }

  async function handleOnSaveClick() {
    if (selectedGuild?.id) {
      await updateGuild(selectedGuild?.id, botPrefix);
    }
  }

  return (
    <>
      <h1>Servereinstellungen</h1>

      {isLoading && <>Daten werden geladen ...</>}

      {!isLoading && (
        <>
          <Select data={data} valueField="id" textField="name" onChange={handleOnChange} />

          {selectedGuild && (
            <>
              <Tabs>
                <TabPane tab="Willkommen" key="welcomeSettings">
                  <Input addonBefore="Willkommens-Kanal:" />
                </TabPane>
                <TabPane tab="Allgemeine Einstellungen" key="commonSettings">
                  <Input addonBefore="Prefix:" onChange={handleOnPrefixChange} />
                  <SaveButton type="primary" onClick={handleOnSaveClick}>
                    Speichern
                  </SaveButton>
                </TabPane>
              </Tabs>
            </>
          )}
        </>
      )}
    </>
  );
}

import { ChangeEvent, useState } from 'react';
import { Button } from '@components';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { updateGuild } from '@services/botService';
import { Input, Tabs } from 'antd';
import styled from 'styled-components';

const SaveButton = styled(Button)`
  margin-top: 1rem;
`;

export function Guilds() {
  const { selectedGuild } = useGuildSelection();
  const [botPrefix, setBotPrefix] = useState('');
  const { TabPane } = Tabs;

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
  );
}

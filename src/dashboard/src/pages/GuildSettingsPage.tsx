import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Button } from '@components';
import { FormField, NotImplemented } from '@components/common';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { getGuildSettings, updateGuildSettings } from '@services/guildService';
import { GuildSettings } from '@viewmodels';
import { Input, Tabs } from 'antd';
import styled from 'styled-components';

const SaveButton = styled(Button)`
  margin-top: 1rem;
`;

export function GuildSettingsPage() {
  const { t } = useTranslation('guildSettings');
  const { selectedGuild } = useGuildSelection();
  const { data } = useQuery(
    ['getGuilds', selectedGuild?.id],
    () => (selectedGuild?.id ? getGuildSettings(selectedGuild?.id) : undefined),
    { onSuccess: onGuildSettingsLoaded }
  );

  function onGuildSettingsLoaded(data: GuildSettings) {
    debugger;
    console.log(data);
  }

  //const [botPrefix, setBotPrefix] = useState('');
  // const [guildSettings, setGuildSettings] = useState<GuildSettings>();
  const { TabPane } = Tabs;

  // function handleOnPrefixChange(event: ChangeEvent<HTMLInputElement>) {
  //   setBotPrefix(event.target.value);
  // }

  // async function handleOnSaveClick() {
  //   if (selectedGuild?.id) {
  //     await updateGuildSettings(selectedGuild?.id, { botPrefix: botPrefix });
  //   }
  // }

  return (
    <>
      <h1>{t('pageTitle')}</h1>

      {selectedGuild && (
        <>
          <Tabs>
            <TabPane tab={t('tabs.general.title')} key="general">
              <FormField>
                <Input
                  addonBefore={t('tabs.general.botPrefixLabel')}
                  // onChange={handleOnPrefixChange}
                />
              </FormField>
              <FormField>
                <Input addonBefore={t('tabs.general.botDisplayName')} />
              </FormField>
            </TabPane>
            <TabPane tab={t('tabs.roles.title')} key="roles">
              <NotImplemented />
            </TabPane>
          </Tabs>
          <SaveButton type="primary" onClick={() => console.log('test')}>
            {t('saveButton')}
          </SaveButton>
        </>
      )}
    </>
  );
}

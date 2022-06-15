import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Button } from '@components';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { getGuildSettings, updateGuildSettings } from '@services/guildService';
import { GuildSettings } from '@viewmodels';
import { Tabs } from 'antd';
import styled from 'styled-components';

import { GuildSettingsPageBotTab } from './GuildSettingsPageBotTab';
import { GuildSettingsPageRolesTab } from './GuildSettingsPageRolesTab';

const SaveButton = styled(Button)`
  margin-top: 1rem;
`;

export function GuildSettingsPage() {
  const { t } = useTranslation('guildSettings');
  const { selectedGuild } = useGuildSelection();
  const [guildSettings, setGuildSettings] = useState<GuildSettings>({});

  useQuery(
    ['getGuilds', selectedGuild?.id],
    () => (selectedGuild?.id ? getGuildSettings(selectedGuild?.id) : undefined),
    { onSuccess: onGuildSettingsLoaded }
  );

  function onGuildSettingsLoaded(data: GuildSettings) {
    setGuildSettings(data);
  }

  function update(prop: string, value: string) {
    setGuildSettings((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  }

  function handleOnSaveClick() {
    if (selectedGuild && guildSettings) {
      updateGuildSettings(selectedGuild?.id, guildSettings);
    }
  }

  const { TabPane } = Tabs;

  return (
    <>
      <h1>{t('pageTitle')}</h1>

      {selectedGuild && (
        <>
          <Tabs>
            <TabPane tab={t('tabs.bot.title')} key="bot">
              <GuildSettingsPageBotTab
                guildSettings={guildSettings}
                onChange={(event) => update(event.target.name, event.target.value)}
              />
            </TabPane>
            <TabPane tab={t('tabs.roles.title')} key="roles">
              <GuildSettingsPageRolesTab guildSettings={guildSettings} />
            </TabPane>
          </Tabs>
          <SaveButton type="primary" onClick={handleOnSaveClick}>
            {t('saveButton')}
          </SaveButton>
        </>
      )}
    </>
  );
}

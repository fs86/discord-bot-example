import { useState } from 'react';
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
  const [guildSettings, setGuildSettings] = useState<GuildSettings>();

  // useQuery(
  //   ['getGuilds', selectedGuild?.id],
  //   () => (selectedGuild?.id ? getGuildSettings(selectedGuild?.id) : undefined),
  //   { onSuccess: onGuildSettingsLoaded }
  // );

  useQuery(
    ['getGuilds', selectedGuild?.id],
    function () {
      return selectedGuild?.id ? getGuildSettings(selectedGuild?.id) : undefined;
    },
    { onSuccess: onGuildSettingsLoaded }
  );

  function onGuildSettingsLoaded(data: GuildSettings) {
    setGuildSettings(data);
  }

  function updateGuildSettingsState(prop: string, value: string) {
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
            <TabPane tab={t('tabs.general.title')} key="general">
              <FormField>
                <Input
                  addonBefore={t('tabs.general.botPrefixLabel')}
                  onChange={(event) => updateGuildSettingsState('botPrefix', event.target.value)}
                  value={guildSettings?.botPrefix}
                />
              </FormField>
              <FormField>
                <Input
                  addonBefore={t('tabs.general.botDisplayName')}
                  onChange={(event) =>
                    updateGuildSettingsState('botDisplayName', event.target.value)
                  }
                  value={guildSettings?.botDisplayName}
                />
              </FormField>
            </TabPane>
            <TabPane tab={t('tabs.roles.title')} key="roles">
              <NotImplemented />
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

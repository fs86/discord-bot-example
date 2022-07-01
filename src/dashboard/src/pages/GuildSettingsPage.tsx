import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Button } from '@components';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { getGuildSettings, updateGuildSettings } from '@services/guildService';
import { GuildSettings } from '@viewmodels';
import { Tabs } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';

import { GuildSettingsPageBotTab } from './GuildSettingsPageBotTab';
import { GuildSettingsPageRolesTab } from './GuildSettingsPageRolesTab';

const SaveButton = styled(Button)`
  margin-top: 1rem;
`;

const GuildSettingsForm = styled.form``;

export function GuildSettingsPage() {
  const { t } = useTranslation('guildSettingsPage');
  const { selectedGuild } = useGuildSelection();
  const [guildSettings, setGuildSettings] = useState<GuildSettings>({});

  const { isLoading } = useQuery(
    ['getGuilds', selectedGuild?.id],
    () => (selectedGuild?.id ? getGuildSettings(selectedGuild?.id) : undefined),
    { onSuccess: onGuildSettingsLoaded }
  );

  async function handleOnSubmit(values: GuildSettings) {
    console.log(values);
    selectedGuild && (await updateGuildSettings(selectedGuild.id, values));
  }

  function onGuildSettingsLoaded(data: GuildSettings) {
    console.log('onGuildSettingsLoaded', data);
    setGuildSettings(data);
  }

  const { TabPane } = Tabs;

  return (
    <>
      <h1>{t('pageTitle')}</h1>

      {selectedGuild && !isLoading && (
        <Formik
          initialValues={
            {
              botPrefix: guildSettings?.botPrefix,
              botNickname: guildSettings?.botNickname,
              welcomeChannelId: guildSettings?.welcomeChannelId,
              welcomeMessage: guildSettings?.welcomeMessage,
              leaveChannelId: guildSettings?.leaveChannelId,
              leaveMessage: guildSettings?.leaveMessage,
            } as GuildSettings
          }
          onSubmit={handleOnSubmit}
        >
          {({ values, handleSubmit, handleChange, setFieldValue }) => {
            return (
              <GuildSettingsForm onSubmit={handleSubmit}>
                <Tabs>
                  <TabPane tab={t('tabs.bot.title')} key="bot">
                    <GuildSettingsPageBotTab
                      values={values}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  </TabPane>
                  <TabPane tab={t('tabs.roles.title')} key="roles">
                    <GuildSettingsPageRolesTab guildSettings={values} />
                  </TabPane>
                </Tabs>
                <SaveButton type="primary" submit>
                  {t('saveButton')}
                </SaveButton>
              </GuildSettingsForm>
            );
          }}
        </Formik>
      )}
    </>
  );
}

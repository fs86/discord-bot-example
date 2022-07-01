import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Button, Input, LinkButton, Select } from '@components';
import { UserMessageDialog } from '@components/UserMessageDialog';
import { useGuildSelection } from '@context-providers';
import { getGuildSettings, updateGuildSettings } from '@services/guildService';
import { GuildSettings } from '@viewmodels';
import { Formik } from 'formik';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const SaveButton = styled(Button)`
  margin-top: 1rem;
`;

const channels = [
  {
    id: 123,
    name: '123',
  },
  {
    id: 234,
    name: '234',
  },
];

export function GuildSettingsPageBotTab() {
  const { t } = useTranslation('guildSettingsPageBotTab');
  const { selectedGuild } = useGuildSelection();
  const [guildSettings, setGuildSettings] = useState<GuildSettings>();
  const [welcomeMessageDialogVisible, setWelcomeMessageDialogVisible] = useState(false);
  const [leaveMessageDialogVisible, setLeaveMessageDialogVisible] = useState(false);
  const welcomeChannel = channels.find((channel) => channel.id === guildSettings?.welcomeChannelId);
  const leaveChannel = channels.find((channel) => channel.id === guildSettings?.leaveChannelId);

  const { isLoading } = useQuery(
    ['getGuilds', selectedGuild?.id],
    () => (selectedGuild?.id ? getGuildSettings(selectedGuild?.id) : undefined),
    { onSuccess: onGuildSettingsLoaded }
  );

  async function handleOnSubmit(values: GuildSettings) {
    selectedGuild && (await updateGuildSettings(selectedGuild.id, values));
  }

  function onGuildSettingsLoaded(data: GuildSettings) {
    setGuildSettings(data);
  }

  return (
    <>
      {guildSettings && (
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
          {({ values: guildSettings, handleSubmit, handleChange, setFieldValue, dirty }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Wrapper>
                  <div>
                    <h2>{t('general.title')}</h2>
                    <Input
                      id="botPrefix"
                      addonBefore={t('general.prefixLabel')}
                      onChange={handleChange}
                      value={guildSettings?.botPrefix}
                    />
                    <Input
                      id="botNickname"
                      addonBefore={t('general.nicknameLabel')}
                      value={guildSettings?.botNickname}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <h2>{t('welcome.title')}</h2>
                    <Select
                      id="welcomeChannelId"
                      data={channels}
                      addonBefore={t('welcome.channelLabel')}
                      placeholder={t('welcome.channelPlaceholder')}
                      valueField="id"
                      textField="name"
                      onChange={(value) => setFieldValue('welcomeChannelId', value)}
                      value={welcomeChannel?.id}
                    />
                    <LinkButton onClick={() => setWelcomeMessageDialogVisible(true)}>
                      {t('welcome.dialog.linkText')}
                    </LinkButton>
                    <UserMessageDialog
                      title={t('welcome.dialog.title')}
                      visible={welcomeMessageDialogVisible}
                    />
                    <h2>{t('leave.title')}</h2>
                    <Select
                      id="leaveChannelId"
                      data={channels}
                      addonBefore={t('leave.channelLabel')}
                      placeholder={t('leave.channelPlaceholder')}
                      valueField="id"
                      textField="name"
                      onChange={(value) => setFieldValue('leaveChannelId', value)}
                      value={leaveChannel?.id}
                    />
                    <LinkButton onClick={() => setLeaveMessageDialogVisible(true)}>
                      {t('leave.dialog.linkText')}
                    </LinkButton>
                    <UserMessageDialog
                      title={t('leave.dialog.title')}
                      visible={leaveMessageDialogVisible}
                    />
                  </div>
                </Wrapper>
                <SaveButton type="primary" disabled={!dirty} submit>
                  {t('saveButton')}
                </SaveButton>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
}

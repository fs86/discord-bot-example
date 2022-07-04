import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Button, Input, LinkButton } from '@components';
import { ChannelSelection } from '@components/ChannelSelection';
import { UserMessageDialog } from '@components/UserMessageDialog';
import { useGuildSelection } from '@context-providers';
import { getGuildSettings, updateGuildSettings } from '@services/guildService';
import { GuildSettings } from '@viewmodels';
import { message } from 'antd';
import { Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
`;

const SaveButton = styled(Button)`
  margin-top: 1rem;
`;

export function GuildSettingsPageBotTab() {
  const { t } = useTranslation('guildSettingsPageBotTab');
  const { selectedGuild } = useGuildSelection();
  const [messageDialogVisible, setMessageDialogVisible] = useState({
    welcome: false,
    leave: false,
  });

  const { isLoading, data: guildSettings } = useQuery(['getGuildSettings', selectedGuild], () =>
    selectedGuild?.id ? getGuildSettings(selectedGuild?.id) : undefined
  );

  async function handleOnSubmit(
    settings: GuildSettings,
    formikHelpers: FormikHelpers<GuildSettings>
  ) {
    if (!selectedGuild) {
      return;
    }

    const result = await updateGuildSettings(selectedGuild.id, settings);

    if (result.status === 200) {
      formikHelpers.resetForm();
      message.success(t('successMessage', { guildName: selectedGuild?.name }));
    } else {
      message.error(t('errorMessage', { guildName: selectedGuild?.name }));
    }
  }

  function showEditMessageDialog(type: keyof typeof messageDialogVisible, visible = true) {
    setMessageDialogVisible((prevState) => ({
      ...prevState,
      [type]: visible,
    }));
  }

  return (
    <>
      {!isLoading && (
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
            console.log(guildSettings);
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
                    <ChannelSelection
                      id="welcomeChannelId"
                      guildId={selectedGuild?.id}
                      addonBefore={t('welcome.channelLabel')}
                      placeholder={t('welcome.channelPlaceholder')}
                      value={guildSettings.welcomeChannelId}
                      onChange={(value) => setFieldValue('welcomeChannelId', value)}
                    />
                    <LinkButton onClick={() => showEditMessageDialog('welcome')}>
                      {t('welcome.dialog.linkText')}
                    </LinkButton>
                    <UserMessageDialog
                      title={t('welcome.dialog.title')}
                      visible={messageDialogVisible.welcome}
                      value={guildSettings.welcomeMessage}
                      onCancel={() => showEditMessageDialog('welcome', false)}
                      onOk={(value) => {
                        setFieldValue('welcomeMessage', value);
                        showEditMessageDialog('welcome', false);
                      }}
                    />
                    <h2>{t('leave.title')}</h2>
                    <ChannelSelection
                      id="leaveChannelId"
                      guildId={selectedGuild?.id}
                      addonBefore={t('leave.channelLabel')}
                      placeholder={t('leave.channelPlaceholder')}
                      value={guildSettings.leaveChannelId}
                      onChange={(value) => setFieldValue('leaveChannelId', value)}
                    />
                    <LinkButton onClick={() => showEditMessageDialog('leave')}>
                      {t('leave.dialog.linkText')}
                    </LinkButton>
                    <UserMessageDialog
                      title={t('leave.dialog.title')}
                      visible={messageDialogVisible.leave}
                      value={guildSettings.leaveMessage}
                      onCancel={() => showEditMessageDialog('leave', false)}
                      onOk={(value) => {
                        setFieldValue('leaveMessage', value);
                        showEditMessageDialog('leave', false);
                      }}
                    />
                  </div>
                </Wrapper>
                <Buttons>
                  <SaveButton type="primary" disabled={!dirty} submit>
                    {t('saveButton')}
                  </SaveButton>
                </Buttons>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, LinkButton, Select } from '@components';
import { UserMessageDialog } from '@components/UserMessageDialog';
import { GuildSettings } from '@viewmodels';
import { FormikProps } from 'formik';
import styled from 'styled-components';

type GuildSettingsPageGeneralTabProps = Pick<
  FormikProps<GuildSettings>,
  'values' | 'handleChange' | 'setFieldValue'
>;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
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

export function GuildSettingsPageBotTab({
  values: guildSettings,
  handleChange,
  setFieldValue,
}: GuildSettingsPageGeneralTabProps) {
  const { t } = useTranslation('guildSettingsPage');
  const [welcomeMessageDialogVisible, setWelcomeMessageDialogVisible] = useState(false);
  const [leaveMessageDialogVisible, setLeaveMessageDialogVisible] = useState(false);
  const welcomeChannel = channels.find((channel) => channel.id === guildSettings.welcomeChannelId);
  const leaveChannel = channels.find((channel) => channel.id === guildSettings.leaveChannelId);

  return (
    <Wrapper>
      <div>
        <h2>{t('tabs.bot.generalSectionTitle')}</h2>
        <Input
          name="botPrefix"
          addonBefore={t('tabs.bot.botPrefixLabel')}
          onChange={handleChange}
          value={guildSettings?.botPrefix}
        />
        <Input
          name="botNickname"
          addonBefore="Nickname"
          value={guildSettings?.botNickname}
          onChange={handleChange}
        />
      </div>
      <div>
        <h2>{t('tabs.bot.welcomeSectionTitle')}</h2>
        <Select
          id="welcomeChannelId"
          data={channels}
          addonBefore="Channel"
          placeholder="Channel"
          valueField="id"
          textField="name"
          onChange={(value) => setFieldValue('welcomeChannelId', value)}
          value={welcomeChannel?.id}
        />
        <LinkButton onClick={() => setWelcomeMessageDialogVisible(true)}>
          Nachricht bearbeiten
        </LinkButton>
        <UserMessageDialog
          title={t('tabs.bot.welcomeMessageDialogTitle')}
          visible={welcomeMessageDialogVisible}
        />
        <h2>Abschiedsnachricht</h2>
        <Select
          id="leaveChannelId"
          data={channels}
          addonBefore="Channel"
          placeholder="Channel"
          valueField="id"
          textField="name"
          onChange={(value) => setFieldValue('leaveChannelId', value)}
          value={leaveChannel?.id}
        />
        <LinkButton onClick={() => setLeaveMessageDialogVisible(true)}>
          Nachricht bearbeiten
        </LinkButton>
        <UserMessageDialog
          title={t('tabs.bot.leaveMessageDialogTitle')}
          visible={leaveMessageDialogVisible}
        />
      </div>
    </Wrapper>
  );
}

import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, InputNumber, LinkButton, Select, TextArea } from '@components';
import { UserMessageDialog } from '@components/UserMessageDialog';
import { GuildSettings } from '@viewmodels';
import styled from 'styled-components';

interface GuildSettingsPageGeneralTabProps {
  guildSettings: GuildSettings;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const channels = [
  {
    id: 12345,
    name: 'test1',
  },
  {
    id: 23456,
    name: 'test2',
  },
];

export function GuildSettingsPageBotTab({
  guildSettings,
  onChange,
}: GuildSettingsPageGeneralTabProps) {
  const { t } = useTranslation('guildSettingsPage');
  const [welcomeMessageDialogVisible, setWelcomeMessageDialogVisible] = useState(false);
  const [leaveMessageDialogVisible, setLeaveMessageDialogVisible] = useState(false);

  function showWelcomeMessageDialog() {
    setWelcomeMessageDialogVisible(true);
  }

  function showLeaveMessageDialog() {
    setLeaveMessageDialogVisible(true);
  }

  return (
    <Wrapper>
      <div>
        <h2>{t('tabs.bot.generalSectionTitle')}</h2>
        <Input
          name="botPrefix"
          addonBefore={t('tabs.bot.botPrefixLabel')}
          onChange={onChange}
          value={guildSettings?.botPrefix}
        />
        <Input name="botNickname" addonBefore="Nickname" onChange={onChange} />
      </div>
      <div>
        <h2>{t('tabs.bot.welcomeSectionTitle')}</h2>
        <Select
          data={channels}
          addonBefore="Channel"
          placeholder="Channel"
          valueField="id"
          textField="name"
        />
        <LinkButton onClick={showWelcomeMessageDialog}>Nachricht bearbeiten</LinkButton>
        <UserMessageDialog
          title={t('tabs.bot.welcomeMessageDialogTitle')}
          visible={welcomeMessageDialogVisible}
        />
        <h2>Abschiedsnachricht</h2>
        <Select
          data={channels}
          addonBefore="Channel"
          placeholder="Channel"
          valueField="id"
          textField="name"
        />
        <LinkButton onClick={showLeaveMessageDialog}>Nachricht bearbeiten</LinkButton>
        <UserMessageDialog
          title={t('tabs.bot.leaveMessageDialogTitle')}
          visible={leaveMessageDialogVisible}
        />
      </div>
    </Wrapper>
  );
}

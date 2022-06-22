import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, InputNumber, Select, TextArea } from '@components';
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
        <h2>Verwarnungen</h2>
        <InputNumber name="maxWarnCount" addonBefore="Max. Anzahl" min={2} max={10} />
        <InputNumber
          name="warnBanDuration"
          addonBefore="Dauer des Bans"
          addonAfter="Minuten"
          min={30}
          max={10080}
        />
        <TextArea
          label="Nachicht"
          rows={5}
          value="Hallo {user},&#13;&#10;Du wurdest verwarnt und hast nun insgesamt {warn_count} Verwarnungen.&#13;&#10;Begründung: {reason}"
        />
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
        <TextArea label={t('tabs.bot.welcomeMessageLabel')} rows={5} />
        <h2>Abschiedsnachricht</h2>
        <Select
          data={channels}
          addonBefore="Channel"
          placeholder="Channel"
          valueField="id"
          textField="name"
        />
        <TextArea label="Abschiedsnachricht" rows={5} />
      </div>
    </Wrapper>
  );
}

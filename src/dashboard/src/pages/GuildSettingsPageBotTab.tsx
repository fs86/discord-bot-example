import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Select, TextArea } from '@components';
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
  const { t } = useTranslation('guildSettings');

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
      </div>
      <div>
        <h2>{t('tabs.bot.welcomeSectionTitle')}</h2>
        {/* <FormField>
          <InputNumber
            addonBefore={t('tabs.bot.activityIntervalLabel')}
            addonAfter={t('tabs.bot.activityIntervalSuffix')}
            min={1}
            max={30}
          />
        </FormField>
        <TextArea label={t('tabs.bot.activityStatusLabel')} rows={5} /> */}
        <Select
          data={channels}
          addonBefore="Channel"
          placeholder="Channel"
          valueField="id"
          textField="name"
        />

        <TextArea label={t('tabs.bot.welcomeMessageLabel')} rows={5} />
      </div>
    </Wrapper>
  );
}

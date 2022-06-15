import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, InputNumber, TextArea } from '@components';
import { FormField } from '@components/common';
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
        <Input
          name="ticketCategory"
          addonBefore={t('tabs.bot.ticketCategoryLabel')}
          onChange={onChange}
          value={guildSettings?.ticketCategory}
        />
      </div>
      <div>
        <h2>{t('tabs.bot.activitySelectionTitle')}</h2>
        <FormField>
          <InputNumber
            addonBefore={t('tabs.bot.activityIntervalLabel')}
            addonAfter={t('tabs.bot.activityIntervalSuffix')}
            min={1}
            max={30}
          />
        </FormField>
        <TextArea label={t('tabs.bot.activityStatusLabel')} />
      </div>
    </Wrapper>
  );
}

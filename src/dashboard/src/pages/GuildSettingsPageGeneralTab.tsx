import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField } from '@components/common';
import { GuildSettings } from '@viewmodels';
import { Input } from 'antd';

interface GuildSettingsPageGeneralTabProps {
  guildSettings: GuildSettings;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function GuildSettingsPageGeneralTab({
  guildSettings,
  onChange,
}: GuildSettingsPageGeneralTabProps) {
  const { t } = useTranslation('guildSettings');

  return (
    <>
      <FormField>
        <Input
          name="botPrefix"
          addonBefore={t('tabs.general.botPrefixLabel')}
          onChange={onChange}
          value={guildSettings?.botPrefix}
        />
      </FormField>
      <FormField>
        <Input
          name="ticketCategory"
          addonBefore={t('tabs.general.ticketCategoryLabel')}
          onChange={onChange}
          value={guildSettings?.ticketCategory}
        />
      </FormField>
    </>
  );
}

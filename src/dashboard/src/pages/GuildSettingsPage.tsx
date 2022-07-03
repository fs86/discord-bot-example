import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';

import { GuildSettingsPageBotTab } from './GuildSettingsPageBotTab';
import { GuildSettingsPageRolesTab } from './GuildSettingsPageRolesTab';

export function GuildSettingsPage() {
  const { t } = useTranslation('guildSettingsPage');
  const { TabPane } = Tabs;

  return (
    <>
      <h1>{t('pageTitle')}</h1>

      <Tabs>
        <TabPane tab={t('tabs.bot')} key="bot">
          <GuildSettingsPageBotTab />
        </TabPane>
        <TabPane tab={t('tabs.roles')} key="roles">
          <GuildSettingsPageRolesTab />
        </TabPane>
      </Tabs>
    </>
  );
}

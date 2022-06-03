import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@components';
import { FormField, NotImplemented } from '@components/common';
import { useGuildSelection } from '@context-providers/GuildSelectionContext';
import { updateGuild } from '@services/guildService';
import { Input, Tabs } from 'antd';
import styled from 'styled-components';

const SaveButton = styled(Button)`
  margin-top: 1rem;
`;

export function GuildSettings() {
  const { t } = useTranslation('guildSettings');
  const { selectedGuild } = useGuildSelection();
  const [botPrefix, setBotPrefix] = useState('');
  const { TabPane } = Tabs;

  function handleOnPrefixChange(event: ChangeEvent<HTMLInputElement>) {
    setBotPrefix(event.target.value);
  }

  async function handleOnSaveClick() {
    if (selectedGuild?.id) {
      await updateGuild(selectedGuild?.id, { botPrefix: botPrefix });
    }
  }

  return (
    <>
      <h1>{t('pageTitle')}</h1>

      {selectedGuild && (
        <>
          <Tabs>
            <TabPane tab={t('tabs.general.title')} key="general">
              <FormField>
                <Input
                  addonBefore={t('tabs.general.botPrefixLabel')}
                  onChange={handleOnPrefixChange}
                />
              </FormField>
              <FormField>
                <Input addonBefore={t('tabs.general.botDisplayName')} />
              </FormField>
            </TabPane>
            <TabPane tab={t('tabs.roles.title')} key="roles">
              <NotImplemented />
            </TabPane>
          </Tabs>
          <SaveButton type="primary" onClick={handleOnSaveClick}>
            {t('saveButton')}
          </SaveButton>
        </>
      )}
    </>
  );
}

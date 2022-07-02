import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Alert, Dialog } from '@components';
import { useGuildSelection } from '@context-providers';
import { getGuilds } from '@services/guildService';
import { Guild } from '@viewmodels/discord';
import styled from 'styled-components';

import { Select } from './Select';

interface GuildSelectionDialogProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const StyledAlert = styled(Alert)`
  margin-bottom: 1rem;
`;

export function GuildSelectionDialog({ visible, onCancel, onOk }: GuildSelectionDialogProps) {
  const { t } = useTranslation('guildSelectionDialog');
  const { data } = useQuery('getGuilds', getGuilds);
  const { selectedGuild, setSelectedGuild } = useGuildSelection();
  const [localSelectedGuild, setLocalSelectedGuild] = useState(selectedGuild);

  const forceUserInput = selectedGuild === undefined;

  function handleOnChange(_value: string, guild: Guild) {
    setLocalSelectedGuild(guild);
  }

  function handleOnCancel() {
    setLocalSelectedGuild(selectedGuild);
    onCancel && onCancel();
  }

  function handleOnOk() {
    localSelectedGuild && setSelectedGuild(localSelectedGuild);
    onOk && onOk();
  }

  const okButtonDisabled = forceUserInput && localSelectedGuild == undefined;
  const cancelButtonDisabled = forceUserInput;
  const maskClosable = !forceUserInput;

  return (
    <Dialog
      title={t('title')}
      visible={visible}
      onCancel={handleOnCancel}
      onOk={handleOnOk}
      okText={t('buttons.ok')}
      cancelText={t('buttons.cancel')}
      okButtonDisabled={okButtonDisabled}
      cancelButtonDisabled={cancelButtonDisabled}
      closeOnClickOutside={maskClosable}
      showCloseButton={!cancelButtonDisabled}
      destroyOnClose
    >
      <StyledAlert closable type="info" message={t('infotext')} />
      <Select
        data={data}
        valueField="id"
        textField="name"
        onChange={handleOnChange}
        value={localSelectedGuild?.id}
        placeholder={t('placeholder')}
        inline
      />
    </Dialog>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useGuildSelection } from '@context-providers';
import { getGuilds } from '@services/guildService';
import { Guild } from '@viewmodels/discord';
import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

import { Select } from './Select';

interface GuildSelectionDialogProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const Modal = styled(AntdModal)`
  .ant-modal-close {
    display: none;
  }
`;

export function GuildSelectionDialog({ visible, onCancel, onOk }: GuildSelectionDialogProps) {
  const { t } = useTranslation('guildSelectionDialog');
  const { data } = useQuery('getGuilds', getGuilds);
  const { selectedGuild, setSelectedGuild } = useGuildSelection();
  const [localSelectedGuild, setLocalSelectedGuild] = useState<Guild>();

  function handleOnChange(guild: Guild) {
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

  return (
    <Modal
      title={t('title')}
      visible={visible}
      onCancel={handleOnCancel}
      onOk={handleOnOk}
      okText={t('buttons.ok')}
      cancelText={t('buttons.cancel')}
    >
      <Select
        data={data}
        valueField="id"
        textField="name"
        onChange={handleOnChange}
        value={localSelectedGuild}
        placeholder={t('placeholder')}
      />
    </Modal>
  );
}

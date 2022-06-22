import { useEffect, useState } from 'react';
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

  useEffect(() => {
    console.log('INIT');
  }, []);

  return (
    <Modal
      title="Bitte wähle einen Server aus"
      visible={visible}
      onCancel={handleOnCancel}
      onOk={handleOnOk}
    >
      <Select
        data={data}
        valueField="id"
        textField="name"
        onChange={handleOnChange}
        value={localSelectedGuild}
        placeholder="Discord Server"
      />
    </Modal>
  );
}

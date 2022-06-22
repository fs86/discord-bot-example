import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

import { GuildSelection } from './GuildSelection';

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
  return (
    <Modal title="Bitte wähle einen Server aus" visible={visible} onCancel={onCancel} onOk={onOk}>
      <GuildSelection placeholder="Discord Server" inline />
    </Modal>
  );
}

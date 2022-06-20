import { Modal } from 'antd';

import { GuildSelection } from './GuildSelection';

interface GuildSelectionDialogProps {
  visible: boolean;
}

export function GuildSelectionDialog({ visible }: GuildSelectionDialogProps) {
  return (
    <Modal visible={visible}>
      <GuildSelection />
    </Modal>
  );
}

import { Modal } from 'antd';
import styled from 'styled-components';

import { TextArea } from './TextArea';

interface UserMessageDialogProps {
  title?: string;
  value?: string;
  visible?: boolean;
  className?: string;
}

const UserProperty = styled.div`
  display: flex;
  line-height: 22px;
  gap: 0.3rem;
`;

const Placeholder = styled.span`
  font-family: 'Courier New', Courier, monospace;
  background-color: #464646;
  border-radius: 3px;
`;

const Description = styled.span``;

export function UserMessageDialog({ title, value, visible }: UserMessageDialogProps) {
  return (
    <Modal title={title} closable={false} visible={visible} width={800}>
      <TextArea rows={10} value={value} />
      <UserProperty>
        <Placeholder>{'{name}'}</Placeholder>
        <Description>Name des Members</Description>
      </UserProperty>
    </Modal>
  );
}

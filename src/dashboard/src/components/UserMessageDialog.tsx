import { useState } from 'react';
import styled from 'styled-components';

import { Dialog } from './Dialog';
import { TextArea } from './TextArea';

interface UserMessageDialogProps {
  title?: string;
  value?: string;
  visible?: boolean;
  className?: string;
  onCancel?: () => void;
  onOk?: (value?: string) => void;
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

export function UserMessageDialog({
  title,
  value,
  visible,
  onCancel,
  onOk,
}: UserMessageDialogProps) {
  const [message, setMessage] = useState(value);

  function handleOnCancel() {
    onCancel && onCancel();
  }

  function handleOnOk() {
    onOk && onOk(message);
  }

  return (
    <Dialog title={title} visible={visible} onCancel={handleOnCancel} onOk={handleOnOk} width={800}>
      <TextArea rows={10} value={message} onChange={(event) => setMessage(event.target.value)} />
      <UserProperty>
        <Placeholder>{'{name}'}</Placeholder>
        <Description>Name des Members</Description>
      </UserProperty>
    </Dialog>
  );
}

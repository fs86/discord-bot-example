import { ReactNode } from 'react';
import { Alert as AntdAlert } from 'antd';
import styled from 'styled-components';

interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  closable?: boolean;
  message?: string;
  description?: ReactNode;
  className?: string;
}

const StyledAlert = styled(AntdAlert)`
  padding: 8px 11px;
`;

export function Alert({ ...props }: AlertProps) {
  return <StyledAlert {...props} />;
}

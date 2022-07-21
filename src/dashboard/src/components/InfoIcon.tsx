import { ReactNode } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { Popover } from './Popover';

interface InfoIconProps {
  title?: string;
  content?: ReactNode;
  size?: number;
  className?: string;
}

const StyledInfoCircleOutlined = styled(InfoCircleOutlined)<{ size?: number }>`
  font-size: ${({ size }) => (size ? `${size}px` : 'inherit')};
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export function InfoIcon({ title, content, size, className }: InfoIconProps) {
  return (
    <Popover title={title} content={content} className={className}>
      <StyledInfoCircleOutlined size={size} />
    </Popover>
  );
}

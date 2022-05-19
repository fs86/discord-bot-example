import { MouseEventHandler, ReactNode } from 'react';
import { Button as AntdButton } from 'antd';

interface ButtonProps {
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
}

// eslint-disable-next-line no-empty-pattern
export function Button({ type, onClick, children }: ButtonProps) {
  return (
    <AntdButton type={type} onClick={onClick}>
      {children}
    </AntdButton>
  );
}

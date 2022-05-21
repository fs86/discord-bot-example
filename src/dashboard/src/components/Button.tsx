import { MouseEventHandler, ReactNode } from 'react';
import { Button as AntdButton } from 'antd';

interface ButtonProps {
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  className?: string;
}

// eslint-disable-next-line no-empty-pattern
export function Button({ type, onClick, children, ...props }: ButtonProps) {
  return (
    <AntdButton type={type} onClick={onClick} {...props}>
      {children}
    </AntdButton>
  );
}

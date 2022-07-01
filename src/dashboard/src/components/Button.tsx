import { MouseEventHandler, ReactNode } from 'react';
import { Button as AntdButton } from 'antd';

interface ButtonProps {
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  submit?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({ type, onClick, children, submit = false, ...props }: ButtonProps) {
  const htmlType = submit ? 'submit' : 'button';

  return (
    <AntdButton type={type} htmlType={htmlType} onClick={onClick} {...props}>
      {children}
    </AntdButton>
  );
}

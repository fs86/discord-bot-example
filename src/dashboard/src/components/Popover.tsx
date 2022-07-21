import { ReactNode } from 'react';
import { Popover as AntdPopover } from 'antd';

interface PopoverProps {
  title?: string;
  content?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Popover({ title, content, children, className }: PopoverProps) {
  return (
    <AntdPopover content={content} title={title} className={className}>
      {children}
    </AntdPopover>
  );
}

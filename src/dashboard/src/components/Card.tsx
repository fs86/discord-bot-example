import { ReactNode } from 'react';
import { Card as AntdCard } from 'antd';

interface CardProps {
  children: ReactNode;
  title?: string;
  bordered?: boolean;
  className?: string;
}

export function Card({ children, title, bordered = false, className }: CardProps) {
  return (
    <AntdCard title={title} bordered={bordered} className={className}>
      {children}
    </AntdCard>
  );
}

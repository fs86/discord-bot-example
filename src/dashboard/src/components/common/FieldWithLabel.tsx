import { ReactNode } from 'react';
import styled from 'styled-components';

export interface FieldWithLabelProps {
  id?: string;
  label?: string;
  width?: number;
  children: ReactNode;
  className?: string;
}

const Wrapper = styled.div<{ width: number }>`
  display: grid;
  grid-template-rows: repeat(2, min-content);

  > {
    width: 100%;
  }
`;

const Label = styled.label``;

export function FieldWithLabel({
  id,
  label,
  width = 120,
  children,
  ...props
}: FieldWithLabelProps) {
  return (
    <Wrapper width={width} {...props}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </Wrapper>
  );
}

import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface FieldWithLabelProps {
  id?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
  inline?: boolean;
  width?: number;
  children: ReactNode;
  className?: string;
}

const Wrapper = styled.div<{ width: number; labelPosition: 'top' | 'left'; inline: boolean }>`
  display: grid;
  width: ${({ width }) => width}px;
  align-items: center;
  width: 100%;

  ${({ labelPosition }) =>
    labelPosition === 'left' &&
    css`
      label {
        margin-right: 5px;
      }
    `}

  ${({ labelPosition }) =>
    labelPosition === 'top' &&
    css`
      grid-template-rows: repeat(2, min-content);
    `}

  ${({ labelPosition }) =>
    labelPosition === 'left' &&
    css`
      grid-template-columns: min-content 1fr;
    `}

  > {
    width: 100%;
  }
`;

const Label = styled.label``;

export function FieldWithLabel({
  id,
  label,
  labelPosition = 'top',
  inline = false,
  width = 120,
  children,
  ...props
}: FieldWithLabelProps) {
  return (
    <Wrapper width={width} labelPosition={labelPosition} inline={inline} {...props}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </Wrapper>
  );
}

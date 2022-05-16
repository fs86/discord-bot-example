import { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

import { FormField } from './common/FormField';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const StyledSelect = styled.select``;

// eslint-disable-next-line no-empty-pattern
export function Select({ children, ...props }: SelectProps) {
  return (
    <FormField>
      <StyledSelect {...props}>{children}</StyledSelect>
    </FormField>
  );
}

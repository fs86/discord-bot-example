import { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

import { FormField } from './common/FormField';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const StyledSelect = styled.select``;

export function Select({ children, ...props }: SelectProps) {
  return (
    <FormField>
      <StyledSelect {...props}>{children}</StyledSelect>
    </FormField>
  );
}

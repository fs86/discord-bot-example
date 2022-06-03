import { ReactNode } from 'react';
import styled from 'styled-components';

interface FormFieldProps {
  children: ReactNode;
  className?: string;
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

export function FormField({ children, className }: FormFieldProps) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

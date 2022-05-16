import { ReactNode } from 'react';
import styled from 'styled-components';

interface FormFieldProps {
  children: ReactNode;
  className?: string;
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

export function FormField({ children }: FormFieldProps) {
  return <h1>{children}</h1>;
}

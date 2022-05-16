import { ReactNode } from 'react';
import { hexToRGBA } from '@helpers';
import styled from 'styled-components';

interface FormFieldProps {
  children: ReactNode;
  className?: string;
}

const Wrapper = styled.div`
  display: inline-flex;
  padding: 3px;
  background-color: transparent;
  border-radius: 4px;
  margin-bottom: 1rem;
  transition: 0.3s;

  &:focus-within {
    background-color: ${({ theme }) => hexToRGBA(theme.colors.primary, 0.5)};
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 0.4rem;

  > * {
    border: none;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};

    &:focus {
      outline: none;
    }
  }
`;

export function FormField({ children }: FormFieldProps) {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}

import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ underline: boolean }>`
  padding: 0;
  border: 0;
  background: none;
  line-height: 1;
  color: ${({ theme }) => theme.colors.foreground};
  border-bottom: ${({ underline, theme }) =>
    underline ? `1px dashed ${theme.colors.foreground}` : 'none'};

  font-size: inherit;
  font-family: inherit;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export interface LinkButtonProps {
  onClick: () => void;
  underline?: boolean;
  children: ReactNode;
  className?: string;
}

export function LinkButton({ onClick, underline = false, children, className }: LinkButtonProps) {
  return (
    <StyledButton onClick={onClick} underline={underline} className={className}>
      {children}
    </StyledButton>
  );
}

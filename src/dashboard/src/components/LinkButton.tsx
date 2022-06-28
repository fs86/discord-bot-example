import { ReactNode } from 'react';
import styled from 'styled-components';

export interface LinkButtonProps {
  onClick: () => void;
  underline?: boolean;
  children: ReactNode;
  inline?: boolean;
  className?: string;
}

const StyledButton = styled.button<{ underline: boolean; inline?: boolean }>`
  padding: 0;
  border: 0;
  background: none;
  line-height: 1;
  color: ${({ theme }) => theme.colors.foreground};
  border-bottom: ${({ underline, theme }) =>
    underline ? `1px solid ${theme.colors.foreground}` : 'none'};

  margin-bottom: ${({ inline }) => (inline ? 0 : '1rem')};

  font-size: inherit;
  font-family: inherit;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export function LinkButton({
  onClick,
  underline = false,
  inline = false,
  children,
  className,
}: LinkButtonProps) {
  return (
    <StyledButton onClick={onClick} underline={underline} inline={inline} className={className}>
      {children}
    </StyledButton>
  );
}

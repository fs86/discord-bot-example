import { ReactNode } from 'react';
import styled from 'styled-components';

interface ScrollContainerProps {
  children: ReactNode;
  autoHide?: boolean;
  className?: string;
}

const Wrapper = styled.div<{ autoHide: boolean }>`
  overflow-y: auto;
  scrollbar-width: thin;

  &:hover {
    &::-webkit-scrollbar {
      display: block;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
    display: ${({ autoHide }) => (autoHide ? 'none' : 'block')};
  }

  &::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: #77787b;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #656669;
  }

  &::-webkit-scrollbar-thumb:active {
    background: #434448;
  }

  &::-webkit-scrollbar-track {
    background: #1f2226;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

export function ScrollContainer({ children, autoHide = false, className }: ScrollContainerProps) {
  return (
    <Wrapper className={className} autoHide={autoHide}>
      {children}
    </Wrapper>
  );
}

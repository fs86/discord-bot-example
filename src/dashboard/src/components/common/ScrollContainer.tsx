import { ReactNode } from 'react';
import styled from 'styled-components';

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
}

const Wrapper = styled.div`
  overflow-y: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
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

export function ScrollContainer({ children, className }: ScrollContainerProps) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

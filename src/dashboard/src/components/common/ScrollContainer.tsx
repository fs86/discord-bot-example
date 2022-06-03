import { ReactNode } from 'react';
import styled from 'styled-components';

type ScrollbarBehavior = 'visible' | 'hidden' | 'hideOnBlur';

interface ScrollContainerProps {
  children: ReactNode;
  scrollbar?: ScrollbarBehavior;
  className?: string;
}

const Wrapper = styled.div<{ scrollbar: ScrollbarBehavior }>`
  overflow-y: auto;
  scrollbar-width: ${({ scrollbar }) => (scrollbar == 'hidden' ? 'none' : 'thin')};

  &:hover {
    &::-webkit-scrollbar {
      display: ${({ scrollbar }) => (scrollbar == 'hidden' ? 'none' : 'block')};
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
    display: ${({ scrollbar }) =>
      scrollbar === 'hidden' || scrollbar === 'hideOnBlur' ? 'none' : 'block'};
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

export function ScrollContainer({
  children,
  scrollbar = 'visible',
  className,
}: ScrollContainerProps) {
  return (
    <Wrapper scrollbar={scrollbar} className={className}>
      {children}
    </Wrapper>
  );
}

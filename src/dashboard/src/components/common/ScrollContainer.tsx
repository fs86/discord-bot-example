import { ReactNode } from 'react';
import styled from 'styled-components';

import { scrollBarStyle } from './shared-styles/scrollBarStyle';

type ScrollbarBehavior = 'visible' | 'hidden' | 'hideOnBlur';

interface ScrollContainerProps {
  children: ReactNode;
  scrollbar?: ScrollbarBehavior;
  className?: string;
}

const Wrapper = styled.div<{ scrollbar: ScrollbarBehavior }>`
  overflow-y: auto;
  scrollbar-width: ${({ scrollbar }) => (scrollbar == 'hidden' ? 'none' : 'thin')};
  ${scrollBarStyle}

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

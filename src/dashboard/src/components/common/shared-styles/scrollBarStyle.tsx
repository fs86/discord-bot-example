import { css } from 'styled-components';

export const scrollBarStyle = css`
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

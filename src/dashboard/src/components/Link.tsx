import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface LinkProps extends RouterLinkProps {
  disableHover?: boolean;
  className?: string;
}

const StyledLink = styled(RouterLink)<{ $disableHover: boolean }>`
  color: ${({ theme }) => theme.colors.foreground};
  font-family: inherit;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground} !important;
  }

  ${({ $disableHover }) =>
    !$disableHover &&
    css`
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    `};
`;

export function Link({ disableHover = false, ...props }: LinkProps) {
  return <StyledLink $disableHover={disableHover} {...props} />;
}

import { ButtonHTMLAttributes } from 'react';
import { useAuth } from 'react-oidc-context';
import styled from 'styled-components';

import { DiscordIcon } from './DiscordIcon';

const StyledDiscordIcon = styled(DiscordIcon)`
  margin-right: 0.5rem;
`;

const StyledDiscordButton = styled.button`
  display: flex;
  background-color: rgb(88, 101, 242);
  font-weight: 600;
  align-items: center;
  height: 38px;
  border: none;
  font-size: 14px;
  color: #fff;
  transition: 0.3s;
  border-radius: 3px;
  padding: 0 15px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: rgb(71, 82, 196);
  }
`;

export function DiscordLoginButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { clearStaleState, signinRedirect } = useAuth();

  async function handleOnClick() {
    await clearStaleState();
    await signinRedirect();
  }

  return (
    <StyledDiscordButton onClick={handleOnClick} {...props}>
      <StyledDiscordIcon />
      {children}
    </StyledDiscordButton>
  );
}

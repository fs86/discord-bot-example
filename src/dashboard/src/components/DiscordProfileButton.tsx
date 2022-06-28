import { useAuth } from 'react-oidc-context';
import { Link, LinkButton } from '@components';
import styled from 'styled-components';

interface DiscordProfileButtonProps {
  size: number;
}

const Wrapper = styled.div<{ size: number }>`
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: ${({ size }) => size / 2}px;
  transition: display 0.3s;
  cursor: pointer;

  &:hover .content {
    display: block;
  }

  &:hover .avatar {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Content = styled.div`
  display: none;
  padding-right: 10px;
  white-space: nowrap;
`;

const Avatar = styled.div<{ size: number; avatarUrl?: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  background-image: ${({ avatarUrl }) => (avatarUrl ? `url('${avatarUrl}')` : 'none')};

  background-position: right;
  background-repeat: no-repeat;
  background-size: contain;

  border: 2px solid ${({ theme }) => theme.colors.header.background};
  border-radius: ${({ size }) => size / 2}px;
  transition: 0.3s;
  cursor: pointer;
`;

export function DiscordProfileButton({ size }: DiscordProfileButtonProps) {
  const { removeUser, clearStaleState, signoutRedirect, user } = useAuth();

  const avatarUrl = user?.profile.avatar
    ? `https://cdn.discordapp.com/avatars/${user.profile.id}/${user.profile.avatar}.png`
    : `https://cdn.discordapp.com/embed/avatars/1.png`;

  async function handleOnLogoutClick() {
    await removeUser();
    await clearStaleState();
    await signoutRedirect();
  }

  return (
    <Wrapper size={size}>
      <Content className="content">
        <Link to="/@me">Account Info</Link>&nbsp;|&nbsp;
        <LinkButton onClick={handleOnLogoutClick} inline>
          Log out
        </LinkButton>
      </Content>
      <Avatar className="avatar" size={size} avatarUrl={avatarUrl} />
    </Wrapper>
  );
}

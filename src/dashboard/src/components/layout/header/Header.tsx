import { ReactNode } from 'react';
import { Link, LinkButton } from '@components';
import { useGuildSelection } from '@context-providers';
import styled from 'styled-components';

interface HeaderProps {
  title?: string;
  actionBarContent: ReactNode;
}

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.header.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  align-items: center;
  line-height: 1;
  padding: 0 1rem;
  font-weight: 500;
  gap: 20px;
  color: #fff;
`;

const HomeLink = styled(Link)`
  display: flex;
  font-size: 18pt;
  margin-bottom: 4px;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 12pt;
`;

const GuildSelectionBar = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
`;

const GuildSelectionLabel = styled.label`
  margin-right: 0.5rem;
`;

export function Header({ title, actionBarContent }: HeaderProps) {
  const { selectedGuild, showGuildSelection } = useGuildSelection();

  return (
    <StyledHeader>
      <HomeLink to="/" disableHover>
        {title}
      </HomeLink>
      <GuildSelectionBar>
        {selectedGuild && (
          <>
            <GuildSelectionLabel htmlFor="guildSelection">Guild:</GuildSelectionLabel>
            <LinkButton onClick={showGuildSelection} inline>
              {selectedGuild?.name}
            </LinkButton>
          </>
        )}
      </GuildSelectionBar>
      <ActionBar>{actionBarContent}</ActionBar>
    </StyledHeader>
  );
}

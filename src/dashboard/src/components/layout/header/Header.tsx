import { ReactNode } from 'react';
import { GuildSelection, Link } from '@components';
import styled from 'styled-components';

interface HeaderProps {
  title?: string;
  actionBarContent: ReactNode;
}

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(2, min-content) 1fr;
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

export function Header({ title, actionBarContent }: HeaderProps) {
  return (
    <StyledHeader>
      <HomeLink to="/" disableHover>
        {title}
      </HomeLink>
      <GuildSelection
        label="Server:"
        labelPosition="left"
        placeholder="Klicke hier, um einen Server auszuwählen"
      />
      <ActionBar>{actionBarContent}</ActionBar>
    </StyledHeader>
  );
}

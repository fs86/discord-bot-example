import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, min-content);
  border: 1px solid yellow;
  border-radius: 3px;
  white-space: pre-line;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  font-size: 14pt;
  padding: 0 6px;
  background-color: rgba(255, 255, 0, 0.2);
`;

const Content = styled.div`
  padding: 3px 6px;
  background-color: rgba(255, 255, 0, 0.1);
`;

const Footer = styled.div`
  padding: 3px 6px;
  background-color: rgba(255, 255, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 0, 0.2);
`;

const StyledLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export function NotImplemented() {
  const { t } = useTranslation('notImplemented');
  const Separator = () => <> | </>;

  return (
    <Wrapper>
      <Header>{t('header')}</Header>
      <Content>{(t('content', { returnObjects: true }) as string[]).join(' ')}</Content>
      <Footer>
        <StyledLink href={t('docs.link')} target="_blank">
          {t('docs.label')}
        </StyledLink>
        <Separator />
        <StyledLink href={t('discord.link')} target="_blank">
          {t('discord.label')}
        </StyledLink>
      </Footer>
    </Wrapper>
  );
}

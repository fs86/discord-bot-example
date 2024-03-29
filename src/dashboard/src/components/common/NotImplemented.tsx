import { useTranslation } from 'react-i18next';
import { Alert } from '@components';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const StyledLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export function NotImplemented() {
  const { t } = useTranslation('notImplemented');

  return (
    <Wrapper>
      <Alert
        closable
        type="info"
        message={t('header')}
        description={
          <>
            {(t('content', { returnObjects: true }) as string[]).join(' ')}
            <br />
            <StyledLink href={t('github.link')} target="_blank">
              {t('github.label')}
            </StyledLink>
            {' | '}
            <StyledLink href={t('discord.link')} target="_blank">
              {t('discord.label')}
            </StyledLink>
            {' | '}
            <StyledLink href={t('docs.link')} target="_blank">
              {t('docs.label')}
            </StyledLink>
          </>
        }
      />
    </Wrapper>
  );
}

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
            <StyledLink href={t('discord.link')} target="_blank">
              {t('discord.label')}
            </StyledLink>
          </>
        }
      />
    </Wrapper>
  );
}

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DiscordLoginButton } from '@components';
import { resetUrl } from '@helpers';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  text-align: center;
  padding-top: 4rem;

  h1 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  & > * {
    margin: 0 auto;
  }
`;

export function LandingPage() {
  const { t } = useTranslation('landingPage');

  useMemo(() => {
    resetUrl();
  }, []);

  return (
    <Wrapper>
      <h1>{import.meta.env.VITE_LANDING_PAGE_TITLE ?? 'Dashboard'}</h1>
      <DiscordLoginButton>{t('loginButton')}</DiscordLoginButton>
    </Wrapper>
  );
}

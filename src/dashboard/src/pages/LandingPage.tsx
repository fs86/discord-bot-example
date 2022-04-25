import { useMemo } from 'react';
import { DiscordLoginButton } from '@components';
import { resetUrl } from '@helpers';
import { LandingPageLayout } from '@layouts/LandingPageLayout';

export function LandingPage() {
  useMemo(() => {
    resetUrl();
  }, []);

  return (
    <LandingPageLayout>
      <h1>{process.env.REACT_APP_LANDING_PAGE_TITLE ?? 'Dashboard'}</h1>
      <DiscordLoginButton>Sign in with Discord</DiscordLoginButton>
    </LandingPageLayout>
  );
}

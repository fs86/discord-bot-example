import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  border: 2px solid yellow;
  border-radius: 5px;
  white-space: pre-line;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  font-size: 14pt;
  padding: 0 6px;
  background-color: rgba(255, 255, 0, 0.2);
  border-bottom: 1px solid yellow;
`;

const Content = styled.div`
  padding: 6px;
  background-color: rgba(255, 255, 0, 0.1);
`;

export function NotImplemented() {
  const { t } = useTranslation('notImplemented');

  return (
    <Wrapper>
      <Header>{t('header')}</Header>
      <Content>{(t('content', { returnObjects: true }) as string[]).join(' ')}</Content>
    </Wrapper>
  );
}

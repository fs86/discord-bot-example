/* eslint-disable react/no-unescaped-entities */
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  justify-items: center;
  margin-top: 4rem;
  gap: 1rem;
`;

const ErrorCode = styled.div`
  font-family: 'Courier New', Arial;
`;

const ErrorText = styled.p`
  display: block;
  text-align: center;
`;

export function NotFound() {
  const { t } = useTranslation('notFound');

  return (
    <Wrapper>
      <ErrorCode>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.o&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.oooo.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.o
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;.d88&nbsp;&nbsp;&nbsp;&nbsp;d8P'`Y8b&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.d88
        <br />
        &nbsp;&nbsp;.d'888&nbsp;&nbsp;&nbsp;888&nbsp;&nbsp;&nbsp;&nbsp;888&nbsp;&nbsp;&nbsp;.d'888
        <br />
        .d'&nbsp;&nbsp;888&nbsp;&nbsp;&nbsp;888&nbsp;&nbsp;&nbsp;&nbsp;888&nbsp;.d'&nbsp;&nbsp;888
        <br />
        88ooo888oo&nbsp;888&nbsp;&nbsp;&nbsp;&nbsp;888&nbsp;88ooo888oo
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;888&nbsp;&nbsp;&nbsp;`88b&nbsp;&nbsp;d88'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;888
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;o888o&nbsp;&nbsp;&nbsp;`Y8bd8P'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o888o
      </ErrorCode>
      <ErrorText>{t('errorMessage')}</ErrorText>
    </Wrapper>
  );
}

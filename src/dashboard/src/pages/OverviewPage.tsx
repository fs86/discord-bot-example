import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JoinLeaveRatioChart, MessagesChart } from '@components/charts';
import { NotImplemented } from '@components/common';
import { useGuildSelection } from '@context-providers';
import styled from 'styled-components';

import { getJoinLeaveRatioMockData } from './OverviewPage.mock';

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 500px);
  text-align: center;
  gap: 2rem;
`;

export function OverviewPage() {
  const { t } = useTranslation('overviewPage');
  const { selectedGuild, showGuildSelection } = useGuildSelection();
  const [joinLeaveRatioData, setJoinLeaveRatioData] = useState(getJoinLeaveRatioMockData());

  useEffect(() => {
    setJoinLeaveRatioData(getJoinLeaveRatioMockData());
  }, [selectedGuild]);

  return (
    <>
      <h1>{t('pageTitle')}</h1>
      <NotImplemented />

      <button onClick={showGuildSelection}>Select Guild</button>

      <ChartContainer>
        <JoinLeaveRatioChart
          title={t('charts.joinLeaveRatio.title')}
          data={joinLeaveRatioData}
          lines={{
            joins: { name: t('charts.joinLeaveRatio.lines.joins') },
            leaves: { name: t('charts.joinLeaveRatio.lines.leaves') },
          }}
        />
        <MessagesChart title={t('charts.messages.title')} />
      </ChartContainer>
    </>
  );
}

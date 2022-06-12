import { useTranslation } from 'react-i18next';
import { JoinLeaveRatioChart, MessagesChart } from '@components/charts';
import { NotImplemented } from '@components/common';
import { DateTime } from 'luxon';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  text-align: center;
  gap: 2rem;
`;

const now = DateTime.now();

function getDate(subtractDays: number) {
  return now.minus({ days: subtractDays }).toFormat('dd.MM.');
}

const joinLeaveStats = [
  { day: getDate(6), joins: 98, leaves: 2 },
  { day: getDate(5), joins: 82, leaves: 12 },
  { day: getDate(4), joins: 45, leaves: 12 },
  { day: getDate(3), joins: 78, leaves: 45 },
  { day: getDate(2), joins: 14, leaves: 52 },
  { day: getDate(1), joins: 130, leaves: 19 },
  { day: getDate(0), joins: 92, leaves: 9 },
];

export function OverviewPage() {
  const { t } = useTranslation('home');

  return (
    <>
      <h1>{t('pageTitle')}</h1>
      <NotImplemented />
      <ChartContainer>
        <JoinLeaveRatioChart
          title={t('charts.joinLeaveRatio.title')}
          data={joinLeaveStats}
          lines={{
            joins: { dataKey: 'joins', name: t('charts.joinLeaveRatio.lines.joins') },
            leaves: { dataKey: 'leaves', name: t('charts.joinLeaveRatio.lines.leaves') },
          }}
        />
        <MessagesChart title={t('charts.messages.title')} />
      </ChartContainer>
    </>
  );
}

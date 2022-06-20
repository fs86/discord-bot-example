import { useTranslation } from 'react-i18next';
import { JoinLeaveRatioChart, MessagesChart } from '@components/charts';
import { NotImplemented } from '@components/common';
import { getRandomInt } from '@helpers';
import { DateTime } from 'luxon';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 500px);
  text-align: center;
  gap: 2rem;
`;

const now = DateTime.now();

function getDate(subtractDays: number) {
  return now.minus({ days: subtractDays }).toFormat('dd.MM.');
}

const joinLeaveStats = Array.from({ length: 7 }, (_x, i) => {
  return { day: getDate(i), joins: getRandomInt(0, 200), leaves: getRandomInt(0, 200) };
}).reverse();

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
            joins: { name: t('charts.joinLeaveRatio.lines.joins') },
            leaves: { name: t('charts.joinLeaveRatio.lines.leaves') },
          }}
        />
        <MessagesChart title={t('charts.messages.title')} />
      </ChartContainer>
    </>
  );
}

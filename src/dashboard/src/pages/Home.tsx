import { useTranslation } from 'react-i18next';
import { JoinLeaveRatioChart } from '@components/charts';
import { NotImplemented } from '@components/common';
import { DateTime } from 'luxon';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  text-align: center;
`;

const now = DateTime.now();

function getDate(subtractDays: number) {
  return now.minus({ days: subtractDays }).toFormat('dd.MM.');
}

const joinLeaveStats = [
  { day: getDate(6), joins: 2400, leaves: 4000 },
  { day: getDate(5), joins: 1398, leaves: 3000 },
  { day: getDate(4), joins: 9800, leaves: 2000 },
  { day: getDate(3), joins: 3908, leaves: 2780 },
  { day: getDate(2), joins: 4800, leaves: 1890 },
  { day: getDate(1), joins: 3800, leaves: 2390 },
  { day: getDate(0), joins: 4300, leaves: 3490 },
];

export function Home() {
  const { t } = useTranslation('home');

  return (
    <>
      <h1>{t('pageTitle')}</h1>
      <NotImplemented />
      <ChartContainer>
        <JoinLeaveRatioChart title={t('charts.joinLeaveRatio.title')} data={joinLeaveStats} />
      </ChartContainer>
    </>
  );
}

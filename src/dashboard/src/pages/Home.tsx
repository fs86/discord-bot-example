import { useTranslation } from 'react-i18next';
import { NotImplemented } from '@components/common';
import { DateTime } from 'luxon';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
`;

const now = DateTime.now();

function getDate(minus = 0) {
  return now.minus({ days: minus }).toFormat('dd.MM.');
}

const leaveJoinStats = [
  { day: getDate(6), joins: 2400, leaves: 4000 },
  { day: getDate(5), joins: 1398, leaves: 3000 },
  { day: getDate(4), joins: 9800, leaves: 2000 },
  { day: getDate(3), joins: 3908, leaves: 2780 },
  { day: getDate(2), joins: 4800, leaves: 1890 },
  { day: getDate(1), joins: 3800, leaves: 2390 },
  { day: getDate(), joins: 4300, leaves: 3490 },
];

export function Home() {
  const { t } = useTranslation('home');

  return (
    <>
      <h1>{t('pageTitle')}</h1>
      <NotImplemented />
      <ChartContainer>
        <div>
          <h3>Join / Leave Verhalten der letzten 7 Tage</h3>
          <LineChart
            data={leaveJoinStats}
            height={300}
            width={500}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="joins" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="leaves" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </ChartContainer>
    </>
  );
}

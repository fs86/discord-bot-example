import { Card } from '@components';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type JoinLeaveDataItem = {
  day: string;
  joins: number;
  leaves: number;
};

interface JoinLeaveRatioChartProps {
  title?: string;
  data: JoinLeaveDataItem[];
}

export function JoinLeaveRatioChart({ title, data }: JoinLeaveRatioChartProps) {
  return (
    <Card title={title} bordered={false}>
      <LineChart data={data} height={300} width={500} margin={{ left: -15 }}>
        <CartesianGrid stroke="#575757" strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="joins" name="Joins" stroke="#82ca9d" activeDot={{ r: 6 }} />
        <Line
          type="monotone"
          dataKey="leaves"
          name="Leaves"
          stroke="#8884d8"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </Card>
  );
}

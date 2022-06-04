import { Card } from '@components';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

interface DataItem {
  day: string;
  joins: number;
  leaves: number;
}

interface LineDefinition {
  dataKey: string;
  name: string;
}

interface JoinLeaveRatioChartProps {
  title?: string;
  data: DataItem[];
  lines: { joins: LineDefinition; leaves: LineDefinition };
  width?: number;
  height?: number;
}

export function JoinLeaveRatioChart({
  title,
  data,
  lines,
  width = 500,
  height = 300,
}: JoinLeaveRatioChartProps) {
  return (
    <Card title={title} bordered={false}>
      <LineChart data={data} height={height} width={width} margin={{ left: -30 }}>
        <CartesianGrid stroke="#575757" strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={lines.joins.dataKey}
          name={lines.joins.name}
          stroke="#82ca9d"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey={lines.leaves.dataKey}
          name={lines.leaves.name}
          stroke="#8884d8"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </Card>
  );
}

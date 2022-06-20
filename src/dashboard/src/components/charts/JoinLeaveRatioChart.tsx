import { Line } from 'react-chartjs-2';
import { Card } from '@components';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

interface DataItem {
  day: string;
  joins: number;
  leaves: number;
}

interface LineDefinition {
  name: string;
}

interface JoinLeaveRatioChartProps {
  title?: string;
  data: DataItem[];
  lines: { joins: LineDefinition; leaves: LineDefinition };
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function JoinLeaveRatioChart({ title, lines, data }: JoinLeaveRatioChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const lineData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        label: lines.joins.name,
        data: data.map((d) => d.leaves),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: lines.leaves.name,
        data: data.map((d) => d.joins),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Card title={title} bordered={false}>
      <Line options={options} data={lineData} />
    </Card>
  );
}

import { Card } from '@components';

interface MessagesChartProps {
  title?: string;
  width?: number;
  height?: number;
}

export function MessagesChart({ title, width = 500, height = 300 }: MessagesChartProps) {
  return (
    <Card title={title}>
      <h1>:-)</h1>
    </Card>
  );
}

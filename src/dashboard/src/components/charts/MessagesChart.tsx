import { Card } from '@components';

interface MessagesChartProps {
  title?: string;
}

export function MessagesChart({ title }: MessagesChartProps) {
  return (
    <Card title={title}>
      <h1>:-)</h1>
    </Card>
  );
}

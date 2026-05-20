import { View } from 'react-native';

interface BarChartProps {
  data: number[];
  maxHeight?: number;
  barWidth?: number;
  gap?: number;
  color?: string;
}

export function BarChart({
  data,
  maxHeight = 100,
  barWidth = 12,
  gap = 4,
  color = '#6366f1',
}: BarChartProps) {
  const max = Math.max(...data, 1);

  return (
    <View className="flex-row items-end" style={{ gap }}>
      {data.map((value, i) => (
        <View
          key={i}
          style={{
            width: barWidth,
            height: (value / max) * maxHeight,
            backgroundColor: color,
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );
}

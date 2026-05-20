import QRCodeSVG from 'react-native-qrcode-svg';
import { View } from 'react-native';

interface QRCodeProps {
  value: string;
  size?: number;
}

export function QRCode({ value, size = 200 }: QRCodeProps) {
  return (
    <View className="items-center justify-center rounded-xl bg-white p-4">
      <QRCodeSVG value={value} size={size} />
    </View>
  );
}

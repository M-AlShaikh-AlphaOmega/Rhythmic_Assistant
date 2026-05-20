import { Text, View } from 'react-native';
import type { TabScreenProps } from '../../../app/navigation/types';

export function SettingsScreen(_props: TabScreenProps<'Settings'>) {
  return (
    <View className="flex-1 bg-white px-6">
      <Text className="mt-16 text-3xl font-bold text-gray-900">Settings</Text>
    </View>
  );
}

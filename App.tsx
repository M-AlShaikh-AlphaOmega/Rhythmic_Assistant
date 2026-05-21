// Theme registration must be imported before any component that uses Unistyles.
import './src/theme/unistyles';

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>AlShaikh</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

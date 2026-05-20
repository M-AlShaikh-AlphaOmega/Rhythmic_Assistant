import "./global.css";
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { Providers } from './src/app/providers';
import { useAppFonts } from './src/shared/hooks/useAppFonts';

export default function App() {
  const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <Providers>
      <RootNavigator />
      <StatusBar style="auto" />
    </Providers>
  );
}

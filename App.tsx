// Theme registration must be imported before any component that uses Unistyles.
import './src/theme/unistyles';

import { NavigationContainer } from '@react-navigation/native';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UnistylesRuntime } from 'react-native-unistyles';

import { useBigTextMode } from './src/features/rhythmicGait/store';
import { RhythmicGaitNavigator } from './src/features/rhythmicGait/navigation/RhythmicGaitNavigator';

enableScreens();

// Subscribes to the bigTextMode preference and switches the active Unistyles
// theme between 'default' and 'big'. Lives at the app root so every styled
// component picks up the new size scale without per-component code.
function ThemeBridge() {
  const bigTextMode = useBigTextMode();
  useEffect(() => {
    UnistylesRuntime.setTheme(bigTextMode ? 'big' : 'default');
  }, [bigTextMode]);
  return null;
}

// Minimal loading view shown while Plus Jakarta Sans is loading on cold launch.
// Prevents the entire UI from flashing the system fallback font for ~200–400ms.
function FontLoadingView() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F7F9',
      }}
    >
      <ActivityIndicator size="large" color="#A41E37" />
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <FontLoadingView />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeBridge />
      <NavigationContainer>
        <RhythmicGaitNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

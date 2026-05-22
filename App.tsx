// Theme registration must be imported before any component that uses Unistyles.
import './src/theme/unistyles';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
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

export default function App() {
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

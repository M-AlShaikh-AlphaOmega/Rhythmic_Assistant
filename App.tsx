// Theme registration must be imported before any component that uses Unistyles.
import './src/theme/unistyles';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RhythmicGaitNavigator } from './src/features/rhythmicGait/navigation/RhythmicGaitNavigator';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RhythmicGaitNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

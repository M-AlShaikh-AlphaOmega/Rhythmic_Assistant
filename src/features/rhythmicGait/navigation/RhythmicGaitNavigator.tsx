import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RhythmicGaitRoutes, RhythmicGaitParamList } from '../../../shared/constants/routes';
import CountdownScreen from '../screens/CountdownScreen';
import HomeScreen from '../screens/HomeScreen';
import RescueScreen from '../screens/RescueScreen';
import ResultScreen from '../screens/ResultScreen';
import RunningScreen from '../screens/RunningScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RhythmicGaitParamList>();

// Feature navigator for Rhythmic Gait Assistant.
// All screens use their own header (or no header), so the native header is hidden globally.
// gestureEnabled is disabled on Running, Rescue, and Result — those screens must exit
// via their own explicit controls, never via a swipe-back gesture.
export function RhythmicGaitNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={RhythmicGaitRoutes.Home}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={RhythmicGaitRoutes.Home} component={HomeScreen} />
      <Stack.Screen name={RhythmicGaitRoutes.Settings} component={SettingsScreen} />
      <Stack.Screen
        name={RhythmicGaitRoutes.Rescue}
        component={RescueScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={RhythmicGaitRoutes.Countdown} component={CountdownScreen} />
      <Stack.Screen
        name={RhythmicGaitRoutes.Running}
        component={RunningScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name={RhythmicGaitRoutes.Result}
        component={ResultScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

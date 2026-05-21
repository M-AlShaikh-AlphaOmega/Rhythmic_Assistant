import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RhythmicGaitRoutes, RhythmicGaitParamList } from '../../../shared/constants/routes';
import CountdownScreen from '../screens/CountdownScreen';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';
import RunningScreen from '../screens/RunningScreen';

const Stack = createNativeStackNavigator<RhythmicGaitParamList>();

// Feature navigator for Rhythmic Gait Assistant.
// All screens use the custom ScreenHeader component, so the native header is hidden globally.
// gestureEnabled is disabled on Running and Result — users must use Stop / Done to exit those screens.
export function RhythmicGaitNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={RhythmicGaitRoutes.Home}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={RhythmicGaitRoutes.Home} component={HomeScreen} />
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

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AssessmentScreen } from '../../features/assessment/screens/AssessmentScreen';
import { HistoryScreen } from '../../features/history/screens/HistoryScreen';
import { SettingsScreen } from '../../features/settings/screens/SettingsScreen';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Assessment" component={AssessmentScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

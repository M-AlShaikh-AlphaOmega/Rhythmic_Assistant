import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ScreenHeader } from '../../../shared/components/ScreenHeader';

// Placeholder — replaced in TASK 7 (RGA-024).
export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Rhythmic Gait Assistant" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.label}>Home</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.app,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.family.sans,
  },
}));

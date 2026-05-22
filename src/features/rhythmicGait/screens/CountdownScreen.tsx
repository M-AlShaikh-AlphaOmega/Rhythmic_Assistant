import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { CountdownBadge, ScreenHeader } from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { useCountdown } from '../hooks';
import { useCountdownValue, useCurrentPace, useSessionPhase, useSessionStore } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// Countdown screen (RA-3) — 3-second "Get ready" count-in before the session starts.
// The useCountdown hook drives the store's tickCountdown at 1 Hz.
// Auto-transitions to Running when the store phase becomes 'running'.
export default function CountdownScreen() {
  const navigation = useNavigation<NavProp>();
  const phase = useSessionPhase();
  const countdownValue = useCountdownValue();
  const pace = useCurrentPace();
  const reset = useSessionStore(s => s.reset);

  useCountdown();

  useEffect(() => {
    if (phase === 'running') {
      navigation.replace(RhythmicGaitRoutes.Running);
    }
  }, [phase, navigation]);

  const handleBack = () => {
    reset();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Rhythmic Gait Assistant" onBack={handleBack} />
      <View style={styles.content}>
        <Text style={styles.readyLabel}>Get ready…</Text>
        <CountdownBadge value={countdownValue} />
        <Text style={styles.subtitle}>Starting {pace.label} rhythm…</Text>
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
    gap: theme.spacing.s6,
  },
  readyLabel: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.secondary,
  },
  subtitle: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
}));

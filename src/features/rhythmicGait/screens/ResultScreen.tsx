import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  Button,
  ResultHeroCard,
  ScreenHeader,
  SectionCard,
  StatRow,
} from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import {
  getCueById,
  useLastResult,
  useSessionStore,
} from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// Session result screen (RA-5) — celebratory summary after a session ends.
// "Done" resets the store and returns to Home; "Walk again" restarts with the same config.
export default function ResultScreen() {
  const navigation = useNavigation<NavProp>();
  const result = useLastResult();
  const reset = useSessionStore(s => s.reset);
  const startRunning = useSessionStore(s => s.startRunning);

  // Guard: if there is no result (unexpected landing), return to Home.
  useEffect(() => {
    if (result === undefined) {
      reset();
      navigation.popToTop();
    }
  }, [result, reset, navigation]);

  const handleDone = useCallback(() => {
    reset();
    navigation.popToTop();
  }, [reset, navigation]);

  const handleWalkAgain = useCallback(() => {
    startRunning();
    navigation.navigate(RhythmicGaitRoutes.Running);
  }, [startRunning, navigation]);

  if (result === undefined) return null;

  const cueLabel = getCueById(result.cue).label;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Rhythmic Gait Assistant" onBack={handleDone} />
      <View style={styles.content}>
        <SectionCard>
          <ResultHeroCard
            emoji="🎉"
            title="Session complete!"
            subtitle="Great walk. Your rhythm is getting stronger."
          />
        </SectionCard>

        <SectionCard>
          <StatRow
            label="Pace"
            value={`${result.paceIcon} ${result.paceLabel}`}
            showDivider
          />
          <StatRow label="Cue used" value={cueLabel} showDivider />
          <StatRow label="Duration" value={`${result.durationMinutes} min`} showDivider />
          <StatRow label="BPM" value={`${result.bpm} steps/min`} />
        </SectionCard>

        <View style={styles.buttonRow}>
          <View style={styles.buttonFlex}>
            <Button variant="secondary" label="Done" onPress={handleDone} fullWidth />
          </View>
          <View style={styles.buttonFlex}>
            <Button variant="primary" label="Walk again" onPress={handleWalkAgain} fullWidth />
          </View>
        </View>
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
    padding: theme.spacing.s4,
    gap: theme.spacing.s4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.s3,
  },
  buttonFlex: {
    flex: 1,
  },
}));

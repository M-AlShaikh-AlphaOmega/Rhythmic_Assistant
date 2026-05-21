import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  Button,
  ListOption,
  OptionTile,
  PillToggleGroup,
  ScreenHeader,
  SectionCard,
  ToggleRow,
} from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { HeroBanner } from '../components/HeroBanner';
import { useSessionRouteGuard } from '../navigation/useSessionRouteGuard';
import { CUES, DURATIONS, PACES, useSessionConfig, useSessionStore } from '../store';
import type { CueId, DurationMinutes, PaceId } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

const CUE_ICON: Record<CueId, 'musical-notes' | 'pulse' | 'layers'> = {
  audio: 'musical-notes',
  vibration: 'pulse',
  combined: 'layers',
};

// Home screen (RA-H1) — session configuration surface.
// Composes cue tiles, pace rows, duration pills, and preference toggles.
// "Start walking" commits the config to the store and navigates forward.
export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const config = useSessionConfig();
  const setConfig = useSessionStore(s => s.setConfig);
  const start = useSessionStore(s => s.start);

  useSessionRouteGuard();

  const handleStart = useCallback(() => {
    start();
    if (config.countInEnabled) {
      navigation.navigate(RhythmicGaitRoutes.Countdown);
    } else {
      navigation.navigate(RhythmicGaitRoutes.Running);
    }
  }, [start, config.countInEnabled, navigation]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Rhythmic Gait Assistant" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <HeroBanner />

        <SectionCard title="Choose your cue">
          <View style={styles.cueRow}>
            {CUES.map(cue => (
              <OptionTile
                key={cue.id}
                iconName={CUE_ICON[cue.id]}
                title={cue.label}
                description={cue.description}
                selected={config.cue === cue.id}
                onPress={() => setConfig({ cue: cue.id as CueId })}
              />
            ))}
          </View>
        </SectionCard>

        <SectionCard title="Pick a pace">
          {PACES.map(pace => (
            <ListOption
              key={pace.id}
              emoji={pace.icon}
              title={pace.label}
              bpm={`${pace.bpm} BPM`}
              description={pace.description}
              rightLabel={pace.rhythmSummary}
              selected={config.paceId === pace.id}
              onPress={() => setConfig({ paceId: pace.id as PaceId })}
            />
          ))}
        </SectionCard>

        <SectionCard title="Duration">
          <PillToggleGroup
            options={DURATIONS.map(d => ({ value: String(d.value), label: d.label }))}
            value={String(config.durationMinutes)}
            onChange={v => setConfig({ durationMinutes: Number(v) as DurationMinutes })}
          />
        </SectionCard>

        <SectionCard title="Preferences">
          <ToggleRow
            title="3-second count-in"
            description="A short calm countdown before music begins."
            value={config.countInEnabled}
            onValueChange={v => setConfig({ countInEnabled: v })}
          />
          <ToggleRow
            title="End chime"
            description="A gentle sound when the session finishes."
            value={config.endChimeEnabled}
            onValueChange={v => setConfig({ endChimeEnabled: v })}
          />
        </SectionCard>

        <Button label="Start walking" onPress={handleStart} fullWidth />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.app,
  },
  scroll: {
    padding: theme.spacing.s4,
    gap: theme.spacing.s4,
    paddingBottom: theme.spacing.s8,
  },
  cueRow: {
    flexDirection: 'row',
    gap: theme.spacing.s3,
  },
}));

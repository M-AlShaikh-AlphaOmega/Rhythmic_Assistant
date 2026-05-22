import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  ListOption,
  OptionTile,
  PillToggleGroup,
  ScreenHeader,
  SectionCard,
  ToggleRow,
} from '../../../shared/components';
import { RhythmicGaitParamList } from '../../../shared/constants/routes';
import { t } from '../../../shared/i18n';
import { CUES, DURATIONS, PACES, usePreferences, useSessionConfig, useSessionStore } from '../store';
import type { CueId, DurationMinutes, HapticStrength, PaceId } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// Cue icons reused from the previous Home screen design.
const CUE_ICON: Record<CueId, 'musical-notes' | 'flash' | 'layers'> = {
  audio: 'musical-notes',
  vibration: 'flash',
  combined: 'layers',
};

// Three discrete volume buckets — avoids pulling in a slider dependency.
const VOLUME_OPTIONS = [
  { value: '0.4', label: t('settings.volume.low') },
  { value: '0.7', label: t('settings.volume.medium') },
  { value: '1', label: t('settings.volume.high') },
];

const HAPTIC_OPTIONS: { value: HapticStrength; label: string }[] = [
  { value: 'soft', label: t('settings.haptic.soft') },
  { value: 'medium', label: t('settings.haptic.medium') },
  { value: 'strong', label: t('settings.haptic.strong') },
];

// Settings screen — every configurable option lives here, freeing the Home screen
// to be just two giant buttons. Low-traffic surface, so density is OK.
export default function SettingsScreen() {
  const navigation = useNavigation<NavProp>();
  const { theme } = useUnistyles();
  const config = useSessionConfig();
  const preferences = usePreferences();
  const setConfig = useSessionStore(s => s.setConfig);
  const setPreferences = useSessionStore(s => s.setPreferences);

  // Round persisted volume to the nearest bucket for the toggle group.
  const volumeBucket =
    preferences.volume >= 0.85 ? '1' : preferences.volume >= 0.55 ? '0.7' : '0.4';

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('settings.title')} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SectionCard title={t('home.cue.sectionTitle')}>
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

        <SectionCard title={t('home.pace.sectionTitle')}>
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

        <SectionCard title={t('home.duration.sectionTitle')}>
          <PillToggleGroup
            options={DURATIONS.map(d => ({ value: String(d.value), label: d.label }))}
            value={String(config.durationMinutes)}
            onChange={v => setConfig({ durationMinutes: Number(v) as DurationMinutes })}
          />
        </SectionCard>

        <SectionCard title={t('settings.volume.sectionTitle')}>
          <View style={styles.sectionStack}>
            <PillToggleGroup
              options={VOLUME_OPTIONS}
              value={volumeBucket}
              onChange={v => setPreferences({ volume: Number(v) })}
            />
            <PillToggleGroup
              options={HAPTIC_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
              value={preferences.hapticStrength}
              onChange={v => setPreferences({ hapticStrength: v as HapticStrength })}
            />
          </View>
        </SectionCard>

        <SectionCard title={t('home.preferences.sectionTitle')}>
          <ToggleRow
            title={t('home.preferences.countIn.title')}
            description={t('home.preferences.countIn.description')}
            value={config.countInEnabled}
            onValueChange={v => setConfig({ countInEnabled: v })}
            showDivider
          />
          <ToggleRow
            title={t('home.preferences.endChime.title')}
            description={t('home.preferences.endChime.description')}
            value={config.endChimeEnabled}
            onValueChange={v => setConfig({ endChimeEnabled: v })}
          />
        </SectionCard>

        <SectionCard title={t('settings.emergency.sectionTitle')}>
          <TextInput
            value={preferences.emergencyContact ?? ''}
            onChangeText={v =>
              setPreferences({ emergencyContact: v.length === 0 ? undefined : v })
            }
            placeholder={t('settings.emergency.placeholder')}
            placeholderTextColor={theme.colors.text.tertiary}
            keyboardType="phone-pad"
            accessibilityLabel={t('settings.emergency.title')}
            style={[
              styles.input,
              {
                borderColor: theme.colors.border.default,
                color: theme.colors.text.primary,
                backgroundColor: theme.colors.bg.surface,
                fontFamily: theme.typography.family.regular,
                fontSize: theme.typography.size.body,
              },
            ]}
          />
        </SectionCard>
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
  sectionStack: {
    gap: theme.spacing.s3,
  },
  input: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.s4,
    paddingVertical: theme.spacing.s3,
  },
}));

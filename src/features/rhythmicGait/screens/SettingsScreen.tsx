import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ComponentProps, useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  DashedActionTile,
  ListOption,
  OptionTile,
  PillToggleGroup,
  ScreenHeader,
  SectionCard,
  SteppedSlider,
  ToggleRow,
} from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { t } from '../../../shared/i18n';
import { SessionFooter } from '../components/SessionFooter';
import { SettingsSummaryChip } from '../components/SettingsSummaryChip';
import {
  CUES,
  DURATIONS,
  PACES,
  getCueById,
  getPaceById,
  usePreferences,
  useSessionConfig,
  useSessionStore,
} from '../store';
import type { CueId, DurationMinutes, HapticStrength, PaceId } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;
type IoniconName = ComponentProps<typeof Ionicons>['name'];

type CueVisual = { icon: IoniconName; label: string; description: string };
type PaceVisual = { icon: IoniconName; iconBackgroundKey: 'success' | 'primary' | 'warn' };

// Maps a CueId to its display label/description/icon for the cue tile row.
const CUE_VISUALS: Record<CueId, CueVisual> = {
  audio: {
    icon: 'musical-notes',
    label: t('settings.cue.audio.label'),
    description: t('settings.cue.audio.description'),
  },
  vibration: {
    icon: 'flash',
    label: t('settings.cue.vibration.label'),
    description: t('settings.cue.vibration.description'),
  },
  combined: {
    icon: 'layers',
    label: t('settings.cue.combined.label'),
    description: t('settings.cue.combined.description'),
  },
};

// Maps each PaceId to its leading-icon visual identity. Background/foreground
// resolve at render time from the theme to keep raw colors out of the screen.
const PACE_VISUALS: Record<PaceId, PaceVisual> = {
  gentle: { icon: 'leaf-outline', iconBackgroundKey: 'success' },
  steady: { icon: 'heart-outline', iconBackgroundKey: 'primary' },
  energizing: { icon: 'flame-outline', iconBackgroundKey: 'warn' },
};

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

// Returns the discrete volume bucket value ('0.4' | '0.7' | '1') closest to the persisted volume.
const bucketFromVolume = (volume: number): string =>
  volume >= 0.85 ? '1' : volume >= 0.55 ? '0.7' : '0.4';

// Returns the display label ("Low" | "Medium" | "High") for a bucket value.
const labelFromVolumeBucket = (bucket: string): string =>
  VOLUME_OPTIONS.find(o => o.value === bucket)?.label ?? '';

const labelFromHaptic = (strength: HapticStrength): string =>
  HAPTIC_OPTIONS.find(o => o.value === strength)?.label ?? '';

// Formats a Date as "HH:MM" using the user's local time.
const formatEndTime = (date: Date): string => {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
};

// Settings screen — all session-configurable options live here.
// Sticky red footer at the bottom previews the live config and starts the walk.
export default function SettingsScreen() {
  const navigation = useNavigation<NavProp>();
  const { theme } = useUnistyles();
  const config = useSessionConfig();
  const preferences = usePreferences();
  const setConfig = useSessionStore(s => s.setConfig);
  const setPreferences = useSessionStore(s => s.setPreferences);
  const start = useSessionStore(s => s.start);

  const [contactEditorOpen, setContactEditorOpen] = useState(
    preferences.emergencyContact !== undefined && preferences.emergencyContact.length > 0,
  );

  const pace = getPaceById(config.paceId);
  const cue = getCueById(config.cue);
  const volumeBucket = bucketFromVolume(preferences.volume);

  const endsAtLabel = useMemo(() => {
    const end = new Date(Date.now() + config.durationMinutes * 60 * 1000);
    return `${t('settings.duration.endsAt')} ${formatEndTime(end)}`;
  }, [config.durationMinutes]);

  const summaryPrimary = `${pace.label} · ${pace.bpm} BPM · ${config.durationMinutes} min`;
  const summarySecondary = `${cue.label} ${t('settings.summary.cue')} · ${labelFromVolumeBucket(volumeBucket)} ${t('settings.summary.volume')} · ${labelFromHaptic(preferences.hapticStrength)} ${t('settings.summary.buzz')}`;

  const paceBackgrounds: Record<PaceVisual['iconBackgroundKey'], { bg: string; fg: string }> = {
    success: { bg: theme.colors.success.surface, fg: theme.colors.success.base },
    primary: { bg: theme.colors.brand.primarySoft, fg: theme.colors.brand.primary },
    warn: { bg: theme.colors.warn.pausedSurface, fg: theme.colors.warn.paused },
  };

  const handleStart = useCallback(() => {
    start();
    navigation.navigate(
      config.countInEnabled ? RhythmicGaitRoutes.Countdown : RhythmicGaitRoutes.Running,
    );
  }, [start, config.countInEnabled, navigation]);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('settings.title')}
        onBack={() => navigation.goBack()}
        rightAction={{
          iconName: 'help-circle-outline',
          // TODO: open help / FAQ screen.
          onPress: () => undefined,
          accessibilityLabel: 'Help',
        }}
        bottomSlot={<SettingsSummaryChip primary={summaryPrimary} secondary={summarySecondary} />}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SectionCard
          title={t('settings.cue.sectionTitle')}
          headerRight={<Text style={styles.headerHint}>{t('settings.cue.sectionSubtitle')}</Text>}
        >
          <View style={styles.cueRow}>
            {CUES.map(c => {
              const visual = CUE_VISUALS[c.id];
              return (
                <OptionTile
                  key={c.id}
                  iconName={visual.icon}
                  title={visual.label}
                  description={visual.description}
                  selected={config.cue === c.id}
                  onPress={() => setConfig({ cue: c.id })}
                />
              );
            })}
          </View>
        </SectionCard>

        <SectionCard
          title={t('home.pace.sectionTitle')}
          headerRight={
            <View style={styles.bpmPill}>
              <Text style={styles.bpmPillText}>{`${pace.bpm} BPM`}</Text>
            </View>
          }
        >
          {PACES.map(p => {
            const visual = PACE_VISUALS[p.id];
            const palette = paceBackgrounds[visual.iconBackgroundKey];
            return (
              <ListOption
                key={p.id}
                iconName={visual.icon}
                iconBackground={palette.bg}
                iconColor={palette.fg}
                title={p.label}
                bpm={`${p.bpm} BPM`}
                description={p.description}
                selected={config.paceId === p.id}
                selectedLabel={t('settings.pace.selectedLabel')}
                onPress={() => setConfig({ paceId: p.id })}
              />
            );
          })}
        </SectionCard>

        <SectionCard
          title={t('home.duration.sectionTitle')}
          headerRight={
            <View style={styles.endsRow}>
              <Ionicons name="time-outline" size={14} color={theme.colors.text.secondary} />
              <Text style={styles.endsText}>{endsAtLabel}</Text>
            </View>
          }
        >
          <PillToggleGroup
            variant="stacked"
            options={DURATIONS.map(d => ({
              value: String(d.value),
              label: String(d.value),
              subLabel: 'min',
            }))}
            value={String(config.durationMinutes)}
            onChange={v => setConfig({ durationMinutes: Number(v) as DurationMinutes })}
          />
        </SectionCard>

        <SectionCard
          title={t('settings.volume.sectionTitle')}
          headerRight={
            <Ionicons name="volume-high-outline" size={18} color={theme.colors.text.secondary} />
          }
        >
          <SteppedSlider
            label={t('settings.volume.title')}
            iconName="musical-notes"
            options={VOLUME_OPTIONS}
            value={volumeBucket}
            onChange={v => setPreferences({ volume: Number(v) })}
          />
          <SteppedSlider
            label={t('settings.haptic.title')}
            iconName="flash"
            options={HAPTIC_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
            value={preferences.hapticStrength}
            onChange={v => setPreferences({ hapticStrength: v as HapticStrength })}
          />
        </SectionCard>

        <SectionCard title={t('home.preferences.sectionTitle')}>
          <ToggleRow
            title={t('home.preferences.countIn.title')}
            description={t('home.preferences.countIn.description')}
            value={config.countInEnabled}
            onValueChange={v => setConfig({ countInEnabled: v })}
            iconName="hourglass-outline"
            iconTint="primary"
            showDivider
          />
          <ToggleRow
            title={t('home.preferences.endChime.title')}
            description={t('home.preferences.endChime.description')}
            value={config.endChimeEnabled}
            onValueChange={v => setConfig({ endChimeEnabled: v })}
            iconName="notifications-outline"
            iconTint="primary"
            showDivider
          />
          <ToggleRow
            title={t('settings.preferences.hapticTap.title')}
            description={t('settings.preferences.hapticTap.description')}
            value={preferences.hapticOnTap}
            onValueChange={v => setPreferences({ hapticOnTap: v })}
            iconName="finger-print-outline"
            iconTint="muted"
          />
        </SectionCard>

        <SectionCard
          title={t('settings.emergency.sectionTitle')}
          headerRight={
            <View style={styles.optionalPill}>
              <Text style={styles.optionalPillText}>{t('settings.emergency.optional')}</Text>
            </View>
          }
        >
          <Text style={styles.emergencySubtitle}>{t('settings.emergency.subtitle')}</Text>
          {contactEditorOpen ? (
            <TextInput
              value={preferences.emergencyContact ?? ''}
              onChangeText={v =>
                setPreferences({ emergencyContact: v.length === 0 ? undefined : v })
              }
              placeholder={t('settings.emergency.placeholder')}
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="phone-pad"
              accessibilityLabel={t('settings.emergency.title')}
              autoFocus
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
          ) : (
            <DashedActionTile
              iconName="person-add-outline"
              label={t('settings.emergency.addContact')}
              onPress={() => setContactEditorOpen(true)}
            />
          )}
        </SectionCard>
      </ScrollView>

      <SessionFooter
        overline={t('settings.footer.readyTitle')}
        summary={`${pace.label} · ${config.durationMinutes} min`}
        ctaLabel={t('settings.footer.startCta')}
        onPress={handleStart}
      />
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
    paddingBottom: theme.spacing.s9,
  },
  cueRow: {
    flexDirection: 'row',
    gap: theme.spacing.s3,
  },
  headerHint: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  bpmPill: {
    paddingHorizontal: theme.spacing.s3,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.brand.primarySoft,
  },
  bpmPillText: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.primary,
  },
  endsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s1,
  },
  endsText: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  optionalPill: {
    paddingHorizontal: theme.spacing.s2,
    paddingVertical: 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.border.subtle,
  },
  optionalPillText: {
    fontSize: 10,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
    letterSpacing: 0.4,
  },
  emergencySubtitle: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  input: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.s4,
    paddingVertical: theme.spacing.s3,
  },
}));

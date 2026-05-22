import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AudioVisualizer } from './AudioVisualizer';

export type BpmAudioCueCardProps = {
  bpm: number;
  bpmUnit: string;
  cueLabel: string;
  cueHint: string;
  active: boolean;
};

// Wide split card pairing a large BPM readout with the active audio-cue caption
// and live visualizer. Used on the Running screen to surface the rhythm at-a-glance.
export const BpmAudioCueCard = ({
  bpm,
  bpmUnit,
  cueLabel,
  cueHint,
  active,
}: BpmAudioCueCardProps) => {
  const { theme } = useUnistyles();

  return (
    <View
      style={styles.card}
      accessibilityRole="text"
      accessibilityLabel={`${bpm} ${bpmUnit}, ${cueLabel}`}
    >
      <View style={styles.bpmCell}>
        <Text style={styles.bpmValue}>{bpm}</Text>
        <Text style={styles.bpmUnit}>{bpmUnit}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.cueCell}>
        <View style={styles.cueHeader}>
          <Ionicons
            name="musical-notes"
            size={theme.iconSize.button}
            color={theme.colors.accent.info}
          />
          <Text style={styles.cueLabel}>{cueLabel}</Text>
          <Text style={styles.cueHint} numberOfLines={1}>
            {` · ${cueHint}`}
          </Text>
        </View>
        <AudioVisualizer active={active} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
    gap: theme.spacing.s4,
    ...theme.shadows.sm,
  },
  bpmCell: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 72,
  },
  bpmValue: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.accent.info,
    lineHeight: theme.typography.size.h2 * theme.typography.lineHeight.tight,
  },
  bpmUnit: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.secondary,
    letterSpacing: theme.typography.letterSpacing.overline,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.border.subtle,
  },
  cueCell: {
    flex: 1,
    gap: theme.spacing.s2,
  },
  cueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cueLabel: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.s2,
  },
  cueHint: {
    flexShrink: 1,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
}));

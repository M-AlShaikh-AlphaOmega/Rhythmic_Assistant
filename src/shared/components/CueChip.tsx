import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type CueType = 'audio' | 'vibration' | 'combined';

export type CueChipProps = {
  cue: CueType;
  bpm: number;
};

const CUE_ICON: Record<CueType, 'musical-notes' | 'flash' | 'layers'> = {
  audio: 'musical-notes',
  vibration: 'flash',
  combined: 'layers',
};

const CUE_LABEL: Record<CueType, string> = {
  audio: 'Audio',
  vibration: 'Vibration',
  combined: 'Combined',
};

// Read-only neutral pill showing cue type, followed by plain "· {bpm} BPM" gray text.
export const CueChip = ({ cue, bpm }: CueChipProps) => {
  const { theme } = useUnistyles();

  return (
    <View
      style={styles.row}
      accessibilityRole="text"
      accessibilityLabel={`Cue ${CUE_LABEL[cue]} at ${bpm} BPM`}
    >
      <View style={styles.chip} importantForAccessibility="no-hide-descendants">
        <Ionicons name={CUE_ICON[cue]} size={theme.iconSize.sm} color={theme.colors.text.primary} />
        <Text style={styles.label}>{CUE_LABEL[cue]}</Text>
      </View>
      <Text style={styles.bpm} importantForAccessibility="no-hide-descendants">
        {`· ${bpm} BPM`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: theme.spacing.s2,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.s1,
    paddingHorizontal: theme.spacing.s3,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    backgroundColor: theme.colors.bg.surface,
    gap: theme.spacing.s1,
  },
  label: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.primary,
  },
  bpm: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.secondary,
  },
}));

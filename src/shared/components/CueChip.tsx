import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type CueType = 'audio' | 'vibration' | 'combined';

export type CueChipProps = {
  cue: CueType;
  bpm: number;
};

const CUE_ICON: Record<CueType, 'musical-notes' | 'pulse' | 'layers'> = {
  audio: 'musical-notes',
  vibration: 'pulse',
  combined: 'layers',
};

const CUE_LABEL: Record<CueType, string> = {
  audio: 'Audio',
  vibration: 'Vibration',
  combined: 'Combined',
};

// Read-only pill chip showing cue type and BPM below the session timer ring.
export const CueChip = ({ cue, bpm }: CueChipProps) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.chip}>
      <Ionicons name={CUE_ICON[cue]} size={theme.iconSize.sm} color={theme.colors.accent.info} />
      <Text style={styles.label}>{`${CUE_LABEL[cue]} · ${bpm} BPM`}</Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: theme.spacing.s1,
    paddingHorizontal: theme.spacing.s3,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.accent.infoBorder,
    backgroundColor: theme.colors.accent.infoSurface,
    gap: theme.spacing.s1,
  },
  label: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.accent.info,
  },
}));

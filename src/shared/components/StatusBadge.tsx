import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type StatusBadgeProps = {
  variant: 'active' | 'paused';
};

// Read-only pill badge indicating session active or paused state.
export const StatusBadge = ({ variant }: StatusBadgeProps) => {
  const { theme } = useUnistyles();

  const isActive = variant === 'active';
  const iconName = isActive ? 'play' : 'pause';
  const iconColor = isActive ? theme.colors.accent.info : theme.colors.warn.paused;
  const label = isActive ? 'Active' : 'Paused';

  return (
    <View
      style={[styles.badge, isActive ? styles.activeBadge : styles.pausedBadge]}
      accessibilityRole="text"
      accessibilityLabel={isActive ? 'Session active' : 'Session paused'}
      accessibilityLiveRegion="polite"
    >
      <Ionicons name={iconName} size={theme.iconSize.sm} color={iconColor} />
      <Text style={[styles.label, isActive ? styles.activeLabel : styles.pausedLabel]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.s1,
    paddingHorizontal: theme.spacing.s3,
    borderRadius: theme.radius.full,
    gap: theme.spacing.s1,
  },
  activeBadge: {
    backgroundColor: theme.colors.accent.infoSurface,
  },
  pausedBadge: {
    backgroundColor: theme.colors.warn.pausedSurface,
  },
  label: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.sans,
  },
  activeLabel: {
    color: theme.colors.accent.info,
  },
  pausedLabel: {
    color: theme.colors.warn.paused,
  },
}));

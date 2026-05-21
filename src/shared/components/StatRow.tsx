import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type StatRowProps = {
  label: string;
  value: string;
  showDivider?: boolean;
};

// Single label/value stat row for the session result screen.
export const StatRow = ({ label, value, showDivider = false }: StatRowProps) => (
  <View style={styles.wrapper}>
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    {showDivider && <View style={styles.divider} />}
  </View>
);

const styles = StyleSheet.create(theme => ({
  wrapper: {
    gap: theme.spacing.s0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.s3,
  },
  label: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.secondary,
  },
  value: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.subtle,
  },
}));

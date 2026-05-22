import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type InfoNoticeRowProps = {
  message: string;
};

// Slim white card row with an info icon — used on Home to surface a hint
// ("Phone in pocket, steady surface — you're good to go").
export const InfoNoticeRow = ({ message }: InfoNoticeRowProps) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container} accessibilityRole="text">
      <Ionicons
        name="information-circle-outline"
        size={theme.iconSize.button}
        color={theme.colors.text.secondary}
      />
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s2,
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
  },
  message: {
    flex: 1,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.text.secondary,
  },
}));

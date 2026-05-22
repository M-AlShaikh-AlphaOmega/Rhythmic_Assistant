import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type SupportActionCardProps = {
  iconName?: ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle?: string;
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
};

// Smaller secondary action card — sits below the primary `BigActionButton` on Home.
// Quieter visual weight than a hero button but still one-tap reachable and clearly
// labeled. Used for "Help me start" (rescue) which a typical user only invokes 1–2
// times total, so it shouldn't compete with the everyday "Start walk" action.
export const SupportActionCard = ({
  iconName = 'pulse',
  title,
  subtitle,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: SupportActionCardProps) => {
  const { theme } = useUnistyles();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      testID={testID}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.iconBadge}>
        <Ionicons name={iconName} size={22} color={theme.colors.brand.onPrimary} />
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        {subtitle !== undefined && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.text.tertiary}
        style={styles.chevron}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s4,
    paddingVertical: theme.spacing.s4,
    paddingHorizontal: theme.spacing.s4,
    minHeight: 88,
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.brand.primary,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.border.default,
    borderRightColor: theme.colors.border.default,
    borderBottomColor: theme.colors.border.default,
    ...theme.shadows.sm,
  },
  cardPressed: {
    opacity: 0.85,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    gap: theme.spacing.s1,
  },
  title: {
    fontSize: theme.typography.size.h3,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.regular,
    fontFamily: theme.typography.family.regular,
    color: theme.colors.text.secondary,
  },
  chevron: {
    opacity: 0.7,
  },
}));

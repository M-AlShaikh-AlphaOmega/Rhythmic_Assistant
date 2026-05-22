import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

// Minimum 44dp touch target for the back button — Apple HIG / WCAG 2.5.5.
const BACK_HIT_SIZE = 44;

type RightAction = {
  iconName: ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  accessibilityLabel: string;
};

type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
  rightAction?: RightAction;
  // Optional content rendered inside the header band below the title row.
  // Used by SettingsScreen to embed the live SessionSummary chip.
  bottomSlot?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

// Shared header used on all 5 screens: back chevron left, centered title, safe-area aware.
export const ScreenHeader = ({
  title,
  onBack,
  rightAction,
  bottomSlot,
  style,
}: ScreenHeaderProps) => {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      <View style={styles.row}>
        {onBack !== undefined ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons name="chevron-back" size={22} color={theme.colors.brand.onPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {rightAction !== undefined ? (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={rightAction.onPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel={rightAction.accessibilityLabel}
            accessibilityRole="button"
          >
            <Ionicons name={rightAction.iconName} size={22} color={theme.colors.brand.onPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>

      {bottomSlot !== undefined && <View style={styles.bottomSlot}>{bottomSlot}</View>}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: theme.spacing.s4,
    paddingBottom: theme.spacing.s3,
    backgroundColor: theme.colors.brand.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: BACK_HIT_SIZE,
    height: BACK_HIT_SIZE,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  actionButton: {
    width: BACK_HIT_SIZE,
    height: BACK_HIT_SIZE,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.brand.onPrimary,
    fontFamily: theme.typography.family.semibold,
  },
  spacer: {
    width: BACK_HIT_SIZE,
    height: BACK_HIT_SIZE,
  },
  bottomSlot: {
    marginTop: theme.spacing.s2,
  },
}));

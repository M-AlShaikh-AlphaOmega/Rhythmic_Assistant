import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

// Minimum 44dp touch target for the back button — Apple HIG / WCAG 2.5.5.
const BACK_HIT_SIZE = 44;

type ScreenHeaderProps = {
  title: string;
  onBack: () => void;
};

// Shared header used on all 5 screens: back chevron left, centered title, safe-area aware.
export const ScreenHeader = ({ title, onBack }: ScreenHeaderProps) => {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <Ionicons name="chevron-back" size={22} color={theme.colors.text.primary} />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Right spacer equals back button width to keep title visually centered. */}
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.s4,
    paddingBottom: theme.spacing.s3,
    backgroundColor: theme.colors.bg.app,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.subtle,
  },
  backButton: {
    width: BACK_HIT_SIZE,
    height: BACK_HIT_SIZE,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.typography.size.h3,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.family.semibold,
  },
  spacer: {
    width: BACK_HIT_SIZE,
  },
}));

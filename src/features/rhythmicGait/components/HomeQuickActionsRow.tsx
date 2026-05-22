import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { QuickActionTile } from '../../../shared/components';
import { t } from '../../../shared/i18n';

export type HomeQuickActionsRowProps = {
  onHelpMeStart: () => void;
  onMyProgress?: () => void;
  onSettings: () => void;
};

// Three-up bottom action row on the Home screen.
// "My progress" stays disabled when no handler is provided (placeholder).
export const HomeQuickActionsRow = ({
  onHelpMeStart,
  onMyProgress,
  onSettings,
}: HomeQuickActionsRowProps) => {
  return (
    <View style={styles.row}>
      <QuickActionTile
        icon="help-circle-outline"
        label={t('home.actions.helpMeStart')}
        onPress={onHelpMeStart}
        variant="primary"
        testID="home-action-help"
      />
      <QuickActionTile
        icon="stats-chart-outline"
        label={t('home.actions.myProgress')}
        onPress={onMyProgress}
        testID="home-action-progress"
      />
      <QuickActionTile
        icon="settings-outline"
        label={t('home.actions.settings')}
        onPress={onSettings}
        testID="home-action-settings"
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    gap: theme.spacing.s2,
  },
}));

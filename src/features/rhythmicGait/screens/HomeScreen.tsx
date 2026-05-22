import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { BigActionButton } from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { t } from '../../../shared/i18n';
import { useSessionRouteGuard } from '../navigation/useSessionRouteGuard';
import { useSessionConfig, useSessionStore } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// Home screen — the surface the user sees every time they open the app.
// Two giant buttons (Start walk, Help me start) and a small Settings link.
// All configuration lives in SettingsScreen — never on Home.
export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const config = useSessionConfig();
  const start = useSessionStore(s => s.start);

  useSessionRouteGuard();

  const handleStart = useCallback(() => {
    start();
    if (config.countInEnabled) {
      navigation.navigate(RhythmicGaitRoutes.Countdown);
    } else {
      navigation.navigate(RhythmicGaitRoutes.Running);
    }
  }, [start, config.countInEnabled, navigation]);

  const handleRescue = useCallback(() => {
    navigation.navigate(RhythmicGaitRoutes.Rescue);
  }, [navigation]);

  const handleSettings = useCallback(() => {
    navigation.navigate(RhythmicGaitRoutes.Settings);
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 16 },
      ]}
    >
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{t('home.title')}</Text>
      </View>

      <View style={styles.actions}>
        <BigActionButton
          variant="primary"
          label={t('home.startWalk.label')}
          subLabel={t('home.startWalk.sub')}
          onPress={handleStart}
          testID="home-start-walk"
        />
        <BigActionButton
          variant="rescue"
          label={t('home.rescue.label')}
          subLabel={t('home.rescue.sub')}
          onPress={handleRescue}
          accessibilityHint="Starts a strong vibration to help you start walking"
          testID="home-rescue"
        />
      </View>

      <Pressable
        onPress={handleSettings}
        accessibilityRole="button"
        accessibilityLabel={t('home.settings')}
        hitSlop={16}
        style={styles.settingsLink}
        testID="home-settings"
      >
        <Text style={styles.settingsLabel}>{t('home.settings')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.app,
    paddingHorizontal: theme.spacing.s5,
    justifyContent: 'space-between',
  },
  titleBlock: {
    alignItems: 'center',
    paddingVertical: theme.spacing.s4,
  },
  title: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  actions: {
    gap: theme.spacing.s5,
    justifyContent: 'center',
  },
  settingsLink: {
    alignSelf: 'center',
    paddingVertical: theme.spacing.s3,
    paddingHorizontal: theme.spacing.s4,
  },
  settingsLabel: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.sans,
    color: theme.colors.text.secondary,
    textDecorationLine: 'underline',
  },
}));

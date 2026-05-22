import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { BigActionButton, ScreenHeader } from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { t } from '../../../shared/i18n';
import { useSessionRouteGuard } from '../navigation/useSessionRouteGuard';
import { getCueById, getPaceById, useSessionConfig, useSessionStore } from '../store';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// Home screen — the feature's entry surface inside the wider aCare app.
// Title block, one dominant "Start walk" button, and two quiet text-link
// affordances: "Help me start" (rescue) and the gear icon for Settings.
// Rescue is a rare-use path so it's intentionally de-emphasized; Settings is even rarer.
export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const { theme } = useUnistyles();
  const config = useSessionConfig();
  const start = useSessionStore(s => s.start);
  const pace = getPaceById(config.paceId);
  const cue = getCueById(config.cue);

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
    <View style={styles.container}>
      <ScreenHeader title={t('home.title')} onBack={() => undefined} />

      <View style={styles.content}>
        <View style={styles.settingsRow}>
          <View style={styles.setupPill}>
            <Ionicons name="musical-notes-outline" size={16} color={theme.colors.accent.info} />
            <Text style={styles.setupText} numberOfLines={1}>
              {cue.label} | {pace.label} | {config.durationMinutes} min
            </Text>
          </View>
          <Pressable
            onPress={handleSettings}
            accessibilityRole="button"
            accessibilityLabel={t('home.settings')}
            hitSlop={12}
            style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
            testID="home-settings"
          >
            <Ionicons name="settings-outline" size={23} color={theme.colors.text.primary} />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <BigActionButton
            variant="primary"
            label={t('home.startWalk.label')}
            subLabel={t('home.startWalk.sub')}
            onPress={handleStart}
            testID="home-start-walk"
          />
        </View>

        <Pressable
          onPress={handleRescue}
          accessibilityRole="button"
          accessibilityLabel={t('home.rescue.label')}
          accessibilityHint="Starts a strong vibration to help you start walking"
          hitSlop={12}
          style={({ pressed }) => [styles.rescueLink, pressed && styles.rescueLinkPressed]}
          testID="home-rescue"
        >
          <Text style={styles.rescueLinkText}>{t('home.rescue.label')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.app,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.s5,
    paddingTop: theme.spacing.s2,
    paddingBottom: theme.spacing.s4,
    gap: theme.spacing.s4,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 44,
    gap: theme.spacing.s3,
  },
  setupPill: {
    flex: 1,
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s2,
    paddingHorizontal: theme.spacing.s3,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.accent.infoSurface,
    borderWidth: 1,
    borderColor: theme.colors.accent.infoBorder,
  },
  setupText: {
    flex: 1,
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.text.primary,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    backgroundColor: theme.colors.border.subtle,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  rescueLink: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.s3,
  },
  rescueLinkPressed: {
    opacity: 0.65,
  },
  rescueLinkText: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
}));

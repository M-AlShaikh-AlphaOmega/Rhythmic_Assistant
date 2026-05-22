import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { InfoNoticeRow, ScreenHeader } from '../../../shared/components';
import { RhythmicGaitParamList, RhythmicGaitRoutes } from '../../../shared/constants/routes';
import { t } from '../../../shared/i18n';
import { HomeGreeting } from '../components/HomeGreeting';
import { HomeQuickActionsRow } from '../components/HomeQuickActionsRow';
import { StartWalkHero } from '../components/StartWalkHero';
import { StreakCard } from '../components/StreakCard';
import { TodaysPlanCard } from '../components/TodaysPlanCard';
import { useSessionRouteGuard } from '../navigation/useSessionRouteGuard';
import { getCueById, getPaceById, useSessionConfig, useSessionStore } from '../store';

import type { WeekBarState } from '../../../shared/components';

type NavProp = NativeStackNavigationProp<RhythmicGaitParamList>;

// Static placeholder bars for the streak card — wired to real history later.
const STREAK_BARS: WeekBarState[] = ['full', 'full', 'full', 'partial', 'empty', 'empty', 'empty'];

// Time-bucketed greeting; defaults to morning.
const greetingForHour = (hour: number): string => {
  if (hour < 12) return t('home.greeting.morning');
  if (hour < 18) return t('home.greeting.afternoon');
  return t('home.greeting.evening');
};

// Home screen — the feature's entry surface inside the wider aCare app.
// Composes: greeting header band, Today's plan card, streak card, Start-walk
// hero, info notice, and three bottom quick-action tiles.
export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const config = useSessionConfig();
  const start = useSessionStore(s => s.start);
  const pace = getPaceById(config.paceId);
  const cue = getCueById(config.cue);

  useSessionRouteGuard();

  const greeting = useMemo(() => {
    const name = t('home.greeting.userPlaceholder');
    return `${greetingForHour(new Date().getHours())}, ${name}`;
  }, []);

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

  const durationLabel = `${config.durationMinutes} min`;
  const paceValue = `${pace.bpm} BPM`;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('home.title')}
        bottomSlot={<HomeGreeting greeting={greeting} question={t('home.greeting.question')} />}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TodaysPlanCard
          cueValue={cue.label}
          paceValue={paceValue}
          durationValue={durationLabel}
          onAdjust={handleSettings}
        />

        <StreakCard
          title={t('home.streak.title')}
          subtitle={t('home.streak.subtitle')}
          bars={STREAK_BARS}
        />

        <StartWalkHero
          onPress={handleStart}
          durationLabel={durationLabel}
          tempoLabel={t('home.start.footer.tempo')}
          modeLabel={t('home.start.footer.safe')}
          testID="home-start-walk"
        />

        <InfoNoticeRow message={t('home.notice.phoneInPocket')} />

        <HomeQuickActionsRow
          onHelpMeStart={handleRescue}
          onSettings={handleSettings}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.app,
  },
  scroll: {
    paddingHorizontal: theme.spacing.s4,
    paddingTop: theme.spacing.s4,
    paddingBottom: theme.spacing.s6,
    gap: theme.spacing.s3,
  },
}));

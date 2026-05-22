import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { t } from '../../../shared/i18n';

export type StartWalkHeroProps = {
  onPress: () => void;
  durationLabel: string;
  tempoLabel: string;
  modeLabel: string;
  testID?: string;
};

type FooterChipProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
};

// Single footer "chip" inside the hero — icon + label, separated by a dot.
const FooterChip = ({ icon, label }: FooterChipProps) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={theme.iconSize.sm} color={theme.colors.brand.onPrimary} />
      <Text style={styles.chipLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};

// Big red call-to-action card on the Home screen: status pill (top-right),
// centered play-circle icon, "Start walk" title with subtitle, divider, and a
// footer row of three small chips (duration / tempo / safety mode).
export const StartWalkHero = ({
  onPress,
  durationLabel,
  tempoLabel,
  modeLabel,
  testID,
}: StartWalkHeroProps) => {
  const { theme } = useUnistyles();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('home.startWalk.label')}
      accessibilityHint={t('home.startWalk.sub')}
      testID={testID}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.statusPill}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>{t('home.start.statusReady')}</Text>
      </View>

      <View style={styles.playCircle}>
        <Ionicons name="play" size={32} color={theme.colors.brand.onPrimary} />
      </View>

      <Text style={styles.title}>{t('home.startWalk.label')}</Text>
      <Text style={styles.subtitle}>{t('home.startWalk.sub')}</Text>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <FooterChip icon="time-outline" label={durationLabel} />
        <View style={styles.dot} />
        <FooterChip icon="musical-notes-outline" label={tempoLabel} />
        <View style={styles.dot} />
        <FooterChip icon="shield-checkmark-outline" label={modeLabel} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.s5,
    alignItems: 'center',
    gap: theme.spacing.s2,
  },
  cardPressed: {
    backgroundColor: theme.colors.brand.primaryPressed,
  },
  statusPill: {
    position: 'absolute',
    top: theme.spacing.s4,
    right: theme.spacing.s4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s1,
    paddingVertical: theme.spacing.s1,
    paddingHorizontal: theme.spacing.s2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.brand.primarySoft,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.brand.primary,
  },
  statusText: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.primary,
  },
  playCircle: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 2,
    borderColor: theme.colors.brand.onPrimary,
    marginTop: theme.spacing.s5,
  },
  title: {
    marginTop: theme.spacing.s3,
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.brand.onPrimary,
  },
  subtitle: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.brand.onPrimary,
    opacity: 0.85,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: theme.spacing.s3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s2,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s1,
  },
  chipLabel: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.semibold,
    color: theme.colors.brand.onPrimary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
}));

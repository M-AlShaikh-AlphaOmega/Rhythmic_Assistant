import { consoleAnalytics } from './consoleAnalytics';
import type { AnalyticsService } from './types';

let activeAnalytics: AnalyticsService = consoleAnalytics;

// Returns the active analytics service singleton.
// Tests or future integrations call setAnalytics() to swap the implementation.
export const getAnalytics = (): AnalyticsService => activeAnalytics;

// Replaces the active analytics backend at runtime (e.g. inject PostHog in production).
export const setAnalytics = (service: AnalyticsService): void => {
  activeAnalytics = service;
};

export type { AnalyticsEventName, AnalyticsEventPayload, AnalyticsService } from './types';

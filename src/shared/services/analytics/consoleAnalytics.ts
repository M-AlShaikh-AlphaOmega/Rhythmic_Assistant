import type { AnalyticsEventName, AnalyticsEventPayload, AnalyticsService } from './types';

// Local analytics implementation that logs events to the Metro console.
// Swap with a real provider (PostHog, Amplitude, etc.) by implementing AnalyticsService.
export const consoleAnalytics: AnalyticsService = {
  track<E extends AnalyticsEventName>(event: E, payload: AnalyticsEventPayload[E]): void {
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${event}`, payload);
  },
};

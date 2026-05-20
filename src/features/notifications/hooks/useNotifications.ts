import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import type { Subscription } from 'expo-notifications';

export function useNotifications() {
  const receivedListener = useRef<Subscription | null>(null);
  const responseListener = useRef<Subscription | null>(null);

  useEffect(() => {
    receivedListener.current =
      Notifications.addNotificationReceivedListener(() => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      receivedListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  async function scheduleNotification(
    title: string,
    body: string,
    seconds = 1,
  ) {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
      },
    });
  }

  return { scheduleNotification };
}

import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import type { PropsWithChildren } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function NotificationsProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return <>{children}</>;
}

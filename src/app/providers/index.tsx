import type { PropsWithChildren } from 'react';
import { NotificationsProvider } from './NotificationsProvider';
import { QueryProvider } from './QueryProvider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <NotificationsProvider>{children}</NotificationsProvider>
    </QueryProvider>
  );
}

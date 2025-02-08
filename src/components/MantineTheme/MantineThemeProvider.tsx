import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import './MantineThemeProvider.css';

import { type PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export function MantineThemeProvider({ children }: PropsWithChildren) {
  return (
    <MantineProvider withCssVariables>
      <Notifications zIndex={99999} />
      {children}
    </MantineProvider>
  );
}

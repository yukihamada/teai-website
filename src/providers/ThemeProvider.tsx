'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

type Attribute = 'class' | 'data-theme';

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: Attribute;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  );
}
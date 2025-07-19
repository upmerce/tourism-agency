// src/components/ThemeRegistry.tsx
'use client';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline';

import useMediaQuery from '@mui/material/useMediaQuery';
import { getThemeOptions } from '@/config/theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // Check the user's system preference for dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Create a theme instance based on the preference.
  // useMemo ensures the theme is only recreated when the mode changes.
  const theme = React.useMemo(
    () => createTheme(getThemeOptions(prefersDarkMode ? 'dark' : 'light')),
    [prefersDarkMode],
  );

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
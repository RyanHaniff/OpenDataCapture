import React from 'react';

import { NotificationHub } from '@douglasneuroinformatics/ui';
import { ErrorFallback } from '@open-data-capture/react-core/components/ErrorFallback';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import { Router } from '@/Router';
import { ActiveVisit } from '@/components/ActiveVisit';
import { SuspenseFallback } from '@/components/SuspenseFallback';
import { SetupProvider } from '@/features/setup';
import { queryClient } from '@/services/react-query';

import './services/axios';
import './services/i18n';

export const App = () => {
  return (
    <React.Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ActiveVisit />
          <NotificationHub />
          <SetupProvider>
            <Router />
          </SetupProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

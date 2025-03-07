import React from 'react';

import { NotificationHub } from '@douglasneuroinformatics/ui';
import { ErrorFallback } from '@open-data-capture/react-core/components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';

import { SuspenseFallback } from './components/SuspenseFallback';

const Editor = React.lazy(() => import('./components/Editor').then((module) => ({ default: module.Editor })));

export const App = () => {
  return (
    <React.Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NotificationHub />
        <Editor />
      </ErrorBoundary>
    </React.Suspense>
  );
};

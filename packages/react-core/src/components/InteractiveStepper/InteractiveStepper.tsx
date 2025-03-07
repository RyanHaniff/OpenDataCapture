import { useState } from 'react';

import { Stepper } from '@douglasneuroinformatics/ui';
import { DocumentCheckIcon, PrinterIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import type { Language } from '@open-data-capture/common/core';
import type { InteractiveInstrument } from '@open-data-capture/common/instrument';
import type { Subject } from '@open-data-capture/common/subject';
import { useTranslation } from 'react-i18next';
import type { Promisable } from 'type-fest';

import { withI18nProvider } from '../../utils/with-i18n-provider';
import { InteractiveOverview } from './InteractiveOverview';
import { InteractiveRenderer } from './InteractiveRenderer';
import { InteractiveSummary } from './InteractiveSummary';

type InteractiveStepperProps = {
  instrument: InteractiveInstrument<unknown, Language>;
  onSubmit: (data: unknown) => Promisable<void>;
  subject?: Subject;
};

const InteractiveStepperComponent = ({ instrument, onSubmit, subject }: InteractiveStepperProps) => {
  const [data, setData] = useState<unknown>();
  const { t } = useTranslation('core');

  const handleSubmit = async (data: unknown) => {
    await onSubmit(data);
    setData(data);
  };

  return (
    <Stepper
      steps={[
        {
          element: <InteractiveOverview instrument={instrument} />,
          icon: <DocumentCheckIcon />,
          label: t('steps.overview')
        },
        {
          element: <InteractiveRenderer instrument={instrument} onSubmit={handleSubmit} />,
          icon: <QuestionMarkCircleIcon />,
          label: t('task')
        },
        {
          element: (
            <InteractiveSummary data={data} instrument={instrument} subject={subject} timeCollected={Date.now()} />
          ),
          icon: <PrinterIcon />,
          label: t('steps.summary')
        }
      ]}
    />
  );
};

const InteractiveStepper = withI18nProvider(InteractiveStepperComponent);

export { InteractiveStepper, type InteractiveStepperProps };

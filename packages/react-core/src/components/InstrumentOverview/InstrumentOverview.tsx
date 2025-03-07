import { Button } from '@douglasneuroinformatics/ui';
import type { UnilingualInstrument } from '@open-data-capture/common/instrument';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';

import { InstrumentOverviewItem } from './InstrumentOverviewItem';

type InstrumentOverviewProps = {
  instrument: UnilingualInstrument;
  onBegin: () => void;
};

export const InstrumentOverview = ({ instrument, onBegin }: InstrumentOverviewProps) => {
  const { t } = useTranslation('core');

  return (
    <div className="mb-2">
      <h3 className="text-xl font-semibold">{t('steps.overview')}</h3>
      <div className="mb-8">
        <InstrumentOverviewItem heading={t('description')} text={instrument.details.description} />
        <InstrumentOverviewItem
          heading={t('language')}
          text={match(instrument.language)
            .with('en', () => t('languages.english'))
            .with('fr', () => t('languages.french'))
            .otherwise(() => instrument.language)}
        />
        <InstrumentOverviewItem
          heading={t('estimatedDuration')}
          text={t('minutes', {
            minutes: instrument.details.estimatedDuration
          })}
        />
        <InstrumentOverviewItem heading={t('instructions')} text={instrument.details.instructions} />
      </div>
      <Button className="w-full" label={t('begin')} onClick={onBegin} />
    </div>
  );
};

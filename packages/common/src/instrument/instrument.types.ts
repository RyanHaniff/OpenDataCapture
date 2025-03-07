import type { FormDataType } from '@douglasneuroinformatics/form-types';

import type { Language } from '../core/core.types';
import type { FormInstrument } from './types/form-instrument.types';
import type { InteractiveInstrument } from './types/interactive-instrument.types';

export type InstrumentBundle = {
  bundle: string;
};

export type InstrumentSource = {
  source: string;
};

export type Instrument = FormInstrument | InteractiveInstrument;

export type UnilingualInstrument = FormInstrument<FormDataType, Language> | InteractiveInstrument<unknown, Language>;

export * from './types/base-instrument.types';
export * from './types/form-instrument.types';
export * from './types/interactive-instrument.types';

import swc from '@swc/core';

import { BaseInstrumentTransformer } from './base';

export class InstrumentTransformer extends BaseInstrumentTransformer {
  transpiler = swc;
}

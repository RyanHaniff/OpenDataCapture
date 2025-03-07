import { PencilSquareIcon } from '@heroicons/react/24/solid';
import type { InstrumentKind } from '@open-data-capture/common/instrument';

// import handBrain from '@/assets/hand-brain.png';
import toolBrain from '@/assets/tool-brain.png';

export type InstrumentIconProps = {
  kind: InstrumentKind;
};

export const InstrumentIcon = ({ kind }: InstrumentIconProps) => {
  switch (kind) {
    case 'form':
      return <img alt="tool brain" className="h-10 w-auto rounded-full" src={toolBrain} />;
    // case 'interactive':
    //   return <img alt="tool brain" className="h-10 w-auto rounded-full" src={handBrain} />;
    default:
      return <PencilSquareIcon className="h-8 w-8" />;
  }
};

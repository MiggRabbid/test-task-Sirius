import type { RefObject } from 'react';

import type { IChipsData } from '@/app/types';
import type { TChipVariant } from '@/shared/ui/custom-chip';

export type TChipElementRefs = {
  current: (HTMLButtonElement | null)[];
};

export interface IChipListVisibleRowProps {
  containerRef: RefObject<HTMLDivElement | null>;
  hiddenItemsCount: number;
  isChipClickable: boolean;
  items: IChipsData[];
  // eslint-disable-next-line no-unused-vars
  onChipClick: (id: number) => void;
  onOverflowClick: () => void;
  selectedChipId: number | null;
  selectedVariant: TChipVariant;
  triggerButtonRef: RefObject<HTMLButtonElement | null>;
}

export interface IChipListPopoverContentProps {
  isChipClickable: boolean;
  items: IChipsData[];
  // eslint-disable-next-line no-unused-vars
  onChipClick: (id: number) => void;
  selectedChipId: number | null;
  selectedVariant: TChipVariant;
}

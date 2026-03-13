// Типизация
import type { RefObject } from 'react';
import type { IChipsData } from '@/app/types';
import type { ChipsStatus, TChipVariant } from '@/shared/ui/custom-chip';

export interface IChipListProps {
  isChipClickable: boolean;
  items: IChipsData[];
  selectedVariant: TChipVariant;
}

export type TChipElementRefs = {
  current: (HTMLButtonElement | null)[];
};

export interface IChipListItemViewModel {
  id: number;
  isSelected: boolean;
  label: string;
  status: ChipsStatus;
}

export interface IChipListVisibleRowProps {
  containerRef: RefObject<HTMLDivElement | null>;
  hiddenItemsCount: number;
  isChipClickable: boolean;
  items: IChipListItemViewModel[];
  // eslint-disable-next-line no-unused-vars
  onChipClick: (id: number) => void;
  onOverflowClick: () => void;
  selectedVariant: TChipVariant;
  triggerButtonRef: RefObject<HTMLButtonElement | null>;
}

export interface IChipListPopoverContentProps {
  isChipClickable: boolean;
  items: IChipListItemViewModel[];
  // eslint-disable-next-line no-unused-vars
  onChipClick: (id: number) => void;
  selectedVariant: TChipVariant;
}

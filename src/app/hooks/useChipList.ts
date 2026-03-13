// Библиотеки
import { useState } from 'react';
// Логика
import { chips } from '@/shared/data';
import { ChipsStatus } from '@/shared/ui/custom-chip';
// Типизация
import type { TChipVariant } from '@/shared/ui/custom-chip';

const getDisplayedChips = (isColoredStatusEnabled: boolean) => {
  return chips.map((chip) => ({
    ...chip,
    status: isColoredStatusEnabled ? chip.status : ChipsStatus.default,
  }));
};

export const useChipList = () => {
  const [selectedVariant, setSelectedVariant] = useState<TChipVariant>('filled');
  const [isChipClickable, setIsChipClickable] = useState(true);
  const [isColoredStatusEnabled, setIsColoredStatusEnabled] = useState(false);

  return {
    displayedChips: getDisplayedChips(isColoredStatusEnabled),
    isChipClickable,
    isColoredStatusEnabled,
    selectedVariant,
    setIsChipClickable,
    setIsColoredStatusEnabled,
    setSelectedVariant,
  };
};

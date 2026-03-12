// Типизация
import type { Ref } from 'react';
import type { TChipVariant } from '@/shared/ui/custom-chip';
import type { IChipListItemViewModel } from '../ChipList.types';
// Компоненты
import { CustomChip } from '@/shared/ui/custom-chip';

interface IChipListItemProps {
  chipRef?: Ref<HTMLButtonElement | HTMLDivElement>;
  className?: string;
  isChipClickable: boolean;
  item: IChipListItemViewModel;
  // eslint-disable-next-line no-unused-vars
  onChipClick?: (id: number) => void;
  selectedVariant: TChipVariant;
}

const ChipListItem = ({
  chipRef,
  className,
  isChipClickable,
  item,
  onChipClick,
  selectedVariant,
}: IChipListItemProps) => {
  return (
    <CustomChip
      ref={chipRef}
      clickable={isChipClickable}
      label={item.label}
      status={item.status}
      selected={item.isSelected}
      variant={selectedVariant}
      onClick={onChipClick ? () => onChipClick(item.id) : undefined}
      className={className}
    />
  );
};

export default ChipListItem;

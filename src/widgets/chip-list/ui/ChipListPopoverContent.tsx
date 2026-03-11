import { CustomChip } from '@/shared/ui/custom-chip';

import type { IChipListPopoverContentProps } from '../ChipList.types';

const ChipListPopoverContent = ({
  isChipClickable,
  items,
  onChipClick,
  selectedChipId,
  selectedVariant,
}: IChipListPopoverContentProps) => {
  return (
    <div className="flex max-w-[320px] flex-wrap gap-3">
      {items.map(({ id, text, status }) => (
        <CustomChip
          key={id}
          clickable={isChipClickable}
          label={text}
          status={status}
          selected={selectedChipId === id}
          variant={selectedVariant}
          onClick={() => onChipClick(id)}
        />
      ))}
    </div>
  );
};

export default ChipListPopoverContent;

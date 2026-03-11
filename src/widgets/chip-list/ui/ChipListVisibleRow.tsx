import { CustomChip } from '@/shared/ui/custom-chip';

import type { IChipListVisibleRowProps } from '../ChipList.types';

const ChipListVisibleRow = ({
  containerRef,
  hiddenItemsCount,
  isChipClickable,
  items,
  onChipClick,
  onOverflowClick,
  selectedChipId,
  selectedVariant,
  triggerButtonRef,
}: IChipListVisibleRowProps) => {
  return (
    <div
      ref={containerRef}
      className="flex w-full items-start justify-start gap-3 overflow-hidden"
      data-isChipClickable={isChipClickable ? 'true' : 'false'}
    >
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
      {hiddenItemsCount > 0 && (
        <CustomChip
          ref={triggerButtonRef}
          label="..."
          className="min-w-13 px-4!"
          variant={selectedVariant}
          aria-haspopup="dialog"
          onClick={onOverflowClick}
          clickable
        />
      )}
    </div>
  );
};

export default ChipListVisibleRow;

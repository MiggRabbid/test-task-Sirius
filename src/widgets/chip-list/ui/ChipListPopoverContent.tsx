// Компоненты
import ChipListItem from './ChipListItem';
// Типизация
import type { IChipListPopoverContentProps } from '../ChipList.types';

const ChipListPopoverContent = ({
  isChipClickable,
  items,
  onChipClick,
  selectedVariant,
}: IChipListPopoverContentProps) => {
  return (
    // Поповер рендерит только скрытые элементы, поэтому здесь нет логики
    // переполнения или измерения - только компактная сетка чипов.
    <div className="flex max-w-[320px] flex-wrap gap-3">
      {items.map((item) => (
        <ChipListItem
          key={item.id}
          isChipClickable={isChipClickable}
          item={item}
          onChipClick={onChipClick}
          selectedVariant={selectedVariant}
        />
      ))}
    </div>
  );
};

export default ChipListPopoverContent;

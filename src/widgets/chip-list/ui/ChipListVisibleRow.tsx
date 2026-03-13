// Компоненты
import { CustomChip } from '@/shared/ui/custom-chip';
import ChipListItem from './ChipListItem';
// Типизация
import type { IChipListVisibleRowProps } from '../ChipList.types';

const ChipListVisibleRow = ({
  containerRef,
  hiddenItemsCount,
  isChipClickable,
  items,
  onChipClick,
  onOverflowClick,
  selectedVariant,
  triggerButtonRef,
}: IChipListVisibleRowProps) => {
  return (
    <div
      ref={containerRef}
      // Контейнер участвует в расчёте visibleCount:
      // его clientWidth используется как доступное пространство для строки.
      className="flex w-full items-start justify-start gap-3 overflow-hidden"
      data-isChipClickable={isChipClickable ? 'true' : 'false'}
    >
      {items.map((item) => (
        <ChipListItem
          key={item.id}
          isChipClickable={isChipClickable}
          item={item}
          onChipClick={onChipClick}
          selectedVariant={selectedVariant}
        />
      ))}
      {hiddenItemsCount > 0 && (
        <CustomChip
          ref={triggerButtonRef}
          // "..." открывает поповер со скрытыми элементами.
          // Кнопка рендерится только когда хотя бы один чип не поместился в строку.
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

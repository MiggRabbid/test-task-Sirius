// Типизация
import type { RefObject } from 'react';
import type { TChipVariant } from '@/shared/ui/custom-chip';
import type { IChipListItemViewModel, TChipElementRefs } from '../ChipList.types';
// Компоненты
import { CustomChip } from '@/shared/ui/custom-chip';
import ChipListItem from './ChipListItem';

interface IChipListMeasurementProps {
  chipRefs: TChipElementRefs;
  isChipClickable: boolean;
  items: IChipListItemViewModel[];
  measureMoreButtonRef: RefObject<HTMLButtonElement | null>;
  selectedVariant: TChipVariant;
}

const ChipListMeasurement = ({
  chipRefs,
  isChipClickable,
  items,
  measureMoreButtonRef,
  selectedVariant,
}: IChipListMeasurementProps) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 -z-10 opacity-0"
    >
      {/* Скрытый слой нужен только для измерения реальной ширины чипов
      и кнопки переполнения, он не участвует в пользовательском UI. */}
      <div className="flex w-max gap-3">
        {items.map((item, index) => (
          <ChipListItem
            key={item.id}
            chipRef={(element) => {
              // Сохраняем ссылки на измерительные элементы по тому же индексу,
              // чтобы хук мог сопоставить ширину с исходным массивом items.
              chipRefs.current[index] = element as HTMLButtonElement | null;
            }}
            className="pointer-events-none"
            isChipClickable={isChipClickable}
            item={item}
            selectedVariant={selectedVariant}
          />
        ))}
        <CustomChip
          ref={measureMoreButtonRef}
          label="..."
          className="pointer-events-none min-w-13 px-4!"
          variant={selectedVariant}
          // Отдельно измеряем кнопку "...", потому что под неё
          // резервируется место при расчёте visibleCount.
          onClick={() => undefined}
        />
      </div>
    </div>
  );
};

export default ChipListMeasurement;

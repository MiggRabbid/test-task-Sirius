import { CustomChip, type TChipVariant } from '@/shared/ui/custom-chip';

import type { RefObject } from 'react';
import type { IChipsData } from '@/app/types';
import type { ChipElementRefs } from '../ChipList.types';

interface IChipListMeasurementProps {
  chipRefs: ChipElementRefs;
  isChipClickable: boolean;
  items: IChipsData[];
  measureMoreButtonRef: RefObject<HTMLButtonElement | null>;
  selectedChipId: number | null;
  selectedVariant: TChipVariant;
}

const ChipListMeasurement = ({
  chipRefs,
  isChipClickable,
  items,
  measureMoreButtonRef,
  selectedChipId,
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
        {items.map(({ id, status, text }, index) => (
          <CustomChip
            key={id}
            ref={(element) => {
              // Сохраняем ссылки на измерительные элементы по тому же индексу,
              // чтобы хук мог сопоставить ширину с исходным массивом items.
              chipRefs.current[index] = element as HTMLButtonElement | null;
            }}
            clickable={isChipClickable}
            label={text}
            status={status}
            selected={selectedChipId === id}
            variant={selectedVariant}
            onClick={() => undefined}
            className="pointer-events-none"
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

import { CustomChip, type ChipVariant } from '@/shared/ui/custom-chip';

import type { RefObject } from 'react';
import type { IChipsData } from '@/app/types';

type ChipElementRefs = {
  current: (HTMLButtonElement | null)[];
};

interface ChipListMeasurementProps {
  chipRefs: ChipElementRefs;
  isChipClickable: boolean;
  items: IChipsData[];
  measureMoreButtonRef: RefObject<HTMLButtonElement | null>;
  selectedChipId: number | null;
  selectedVariant: ChipVariant;
}

const ChipListMeasurement = ({
  chipRefs,
  isChipClickable,
  items,
  measureMoreButtonRef,
  selectedChipId,
  selectedVariant,
}: ChipListMeasurementProps) => {
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
            component={isChipClickable ? 'button' : 'div'}
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

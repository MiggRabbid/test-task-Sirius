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
      {/* Этот слой полностью исключён из пользовательского сценария:
      он невидим, не фокусируется и не ловит события.
      Его единственная задача - отрендерить те же чипы в "натуральном" размере,
      чтобы useVisibleChipCount мог снять точные размеры из DOM. */}
      <div className="flex w-max gap-3">
        {items.map((item, index) => (
          <ChipListItem
            key={item.id}
            chipRef={(element) => {
              // Ссылки кладутся по индексу исходного массива,
              // чтобы расчёт ширин не зависел от id и не требовал дополнительного маппинга.
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
          // Кнопка переполнения измеряется отдельно, потому что её ширину
          // нужно заранее зарезервировать ещё до того, как реальная кнопка появится в строке.
          onClick={() => undefined}
        />
      </div>
    </div>
  );
};

export default ChipListMeasurement;

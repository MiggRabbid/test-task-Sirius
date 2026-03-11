import { useEffect, useRef, useState } from 'react';
import { CustomPopover, useCustomPopover } from '@/shared/ui/custom-popover';
import { CustomChip, type ChipVariant } from '@/shared/ui/custom-chip';
import { useVisibleChipCount } from './lib/useVisibleChipCount';
import ChipListControls from './ui/ChipListControls';
import ChipListMeasurement from './ui/ChipListMeasurement';

import type { IChipsData } from '@/app/types';
import {
  CHIP_CLICKABLE_OPTIONS,
  CHIP_VARIANT_OPTIONS,
  DEFAULT_GAP,
} from './ChipList.config';

interface ChipListProps {
  items: IChipsData[];
}

function ChipList({ items }: ChipListProps) {
  const [selectedVariant, setSelectedVariant] = useState<ChipVariant>('filled');
  const [isChipClickable, setIsChipClickable] = useState(true);
  const [selectedChipId, setSelectedChipId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const measureMoreButtonRef = useRef<HTMLButtonElement | null>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Если список элементов изменился, сбрасываем выбор,
    // только когда выбранный чип уже отсутствует в новых данных.
    setSelectedChipId((prevSelectedChipId) =>
      items.some(({ id }) => id === prevSelectedChipId) ? prevSelectedChipId : null,
    );
  }, [items]);

  const { visibleCount } = useVisibleChipCount({
    chipRefs,
    containerRef,
    gap: DEFAULT_GAP,
    itemsCount: items.length,
    measureMoreButtonRef,
  });

  const visibleItems = items.slice(0, visibleCount);
  const hiddenItems = items.slice(visibleCount);
  const { anchorEl, isOpen, handleClose, handleToggle } =
    useCustomPopover<HTMLButtonElement>({
      isEnabled: hiddenItems.length > 0,
    });

  const handleChipClick = (id: number) => {
    setSelectedChipId((prevSelectedChipId) => (prevSelectedChipId === id ? null : id));
  };

  return (
    <>
      <ChipListControls
        variantSwitcher={{
          options: CHIP_VARIANT_OPTIONS,
          onChange: setSelectedVariant,
          value: selectedVariant,
        }}
        clickableSwitcher={{
          options: CHIP_CLICKABLE_OPTIONS,
          onChange: (newState) => {
            // При выключении интерактивности убираем активный чип,
            // чтобы визуальное выделение не конфликтовало с пассивным состоянием.
            if (!newState) {
              setSelectedChipId(null);
            }

            setIsChipClickable(newState);
          },
          value: isChipClickable,
        }}
      />

      <div
        ref={containerRef}
        className="flex w-full items-start justify-start gap-3 overflow-hidden"
        data-isChipClickable={isChipClickable ? 'true' : 'false'}
      >
        {visibleItems.map(({ id, text, status }) => (
          <CustomChip
            key={id}
            clickable={isChipClickable}
            label={text}
            status={status}
            selected={selectedChipId === id}
            variant={selectedVariant}
            onClick={() => handleChipClick(id)}
          />
        ))}
        {hiddenItems.length > 0 && (
          <CustomChip
            ref={triggerButtonRef}
            label="..."
            className="min-w-13 px-4!"
            variant={selectedVariant}
            // Кнопка переполнения всегда остаётся кликабельной,
            // иначе поповер со скрытыми чипами нельзя будет открыть.
            onClick={() => handleToggle(triggerButtonRef.current)}
            clickable
          />
        )}
      </div>

      <ChipListMeasurement
        chipRefs={chipRefs}
        isChipClickable={isChipClickable}
        items={items}
        measureMoreButtonRef={measureMoreButtonRef}
        selectedChipId={selectedChipId}
        selectedVariant={selectedVariant}
      />

      <CustomPopover open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <div className="flex max-w-[320px] flex-wrap gap-3">
          {hiddenItems.map(({ id, text, status }) => (
            <CustomChip
              key={id}
              clickable={isChipClickable}
              component={isChipClickable ? 'button' : 'div'}
              label={text}
              status={status}
              selected={selectedChipId === id}
              variant={selectedVariant}
              onClick={() => handleChipClick(id)}
            />
          ))}
        </div>
      </CustomPopover>
    </>
  );
}

export default ChipList;

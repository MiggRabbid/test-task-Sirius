// Библиотеки
import { useEffect, useRef, useState } from 'react';
// Логика
import { DEFAULT_GAP } from './ChipList.config';
import { useVisibleChipCount } from './lib/useVisibleChipCount';
// Компоненты
import { CustomPopover, useCustomPopover } from '@/shared/ui/custom-popover';
import ChipListMeasurement from './ui/ChipListMeasurement';
import ChipListPopoverContent from './ui/ChipListPopoverContent';
import ChipListVisibleRow from './ui/ChipListVisibleRow';
// Типизация
import type { IChipListItemViewModel, IChipListProps } from './ChipList.types';

const ChipList = ({ isChipClickable, items, selectedVariant }: IChipListProps) => {
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

  useEffect(() => {
    if (!isChipClickable) {
      setSelectedChipId(null);
    }
  }, [isChipClickable]);

  const { visibleCount } = useVisibleChipCount({
    chipRefs,
    containerRef,
    gap: DEFAULT_GAP,
    itemsCount: items.length,
    measureMoreButtonRef,
  });

  const chipItems: IChipListItemViewModel[] = items.map(({ id, status, text }) => ({
    id,
    isSelected: selectedChipId === id,
    label: text,
    status,
  }));
  const visibleItems = chipItems.slice(0, visibleCount);
  const hiddenItems = chipItems.slice(visibleCount);

  const { anchorEl, isOpen, handleClose, handleToggle } =
    useCustomPopover<HTMLButtonElement>({
      isEnabled: hiddenItems.length > 0,
    });

  const handleChipClick = (id: number) => {
    setSelectedChipId((prevSelectedChipId) => (prevSelectedChipId === id ? null : id));
  };

  return (
    <>
      <ChipListVisibleRow
        containerRef={containerRef}
        hiddenItemsCount={hiddenItems.length}
        isChipClickable={isChipClickable}
        items={visibleItems}
        onChipClick={handleChipClick}
        onOverflowClick={() => handleToggle(triggerButtonRef.current)}
        selectedVariant={selectedVariant}
        triggerButtonRef={triggerButtonRef}
      />

      <ChipListMeasurement
        chipRefs={chipRefs}
        isChipClickable={isChipClickable}
        items={chipItems}
        measureMoreButtonRef={measureMoreButtonRef}
        selectedVariant={selectedVariant}
      />

      <CustomPopover open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <ChipListPopoverContent
          isChipClickable={isChipClickable}
          items={hiddenItems}
          onChipClick={handleChipClick}
          selectedVariant={selectedVariant}
        />
      </CustomPopover>
    </>
  );
};

export default ChipList;

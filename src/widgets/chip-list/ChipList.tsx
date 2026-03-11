import { useEffect, useRef, useState } from 'react';
import { CustomPopover, useCustomPopover } from '@/shared/ui/custom-popover';
import { type TChipVariant } from '@/shared/ui/custom-chip';
import { useVisibleChipCount } from './lib/useVisibleChipCount';
import ChipListMeasurement from './ui/ChipListMeasurement';
import ChipListPopoverContent from './ui/ChipListPopoverContent';
import ChipListVisibleRow from './ui/ChipListVisibleRow';

import type { IChipsData } from '@/app/types';
import { DEFAULT_GAP } from './ChipList.config';

interface IChipListProps {
  isChipClickable: boolean;
  items: IChipsData[];
  selectedVariant: TChipVariant;
}

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
      <ChipListVisibleRow
        containerRef={containerRef}
        hiddenItemsCount={hiddenItems.length}
        isChipClickable={isChipClickable}
        items={visibleItems}
        onChipClick={handleChipClick}
        onOverflowClick={() => handleToggle(triggerButtonRef.current)}
        selectedChipId={selectedChipId}
        selectedVariant={selectedVariant}
        triggerButtonRef={triggerButtonRef}
      />

      <ChipListMeasurement
        chipRefs={chipRefs}
        isChipClickable={isChipClickable}
        items={items}
        measureMoreButtonRef={measureMoreButtonRef}
        selectedChipId={selectedChipId}
        selectedVariant={selectedVariant}
      />

      <CustomPopover open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <ChipListPopoverContent
          isChipClickable={isChipClickable}
          items={hiddenItems}
          onChipClick={handleChipClick}
          selectedChipId={selectedChipId}
          selectedVariant={selectedVariant}
        />
      </CustomPopover>
    </>
  );
};

export default ChipList;

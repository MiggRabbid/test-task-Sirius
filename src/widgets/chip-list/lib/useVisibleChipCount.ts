import { useLayoutEffect, useState } from 'react';

import type { RefObject } from 'react';
import type { TChipElementRefs } from '../ChipList.types';

interface IUseVisibleChipCountParams {
  chipRefs: TChipElementRefs;
  containerRef: RefObject<HTMLDivElement | null>;
  gap: number;
  itemsCount: number;
  measureMoreButtonRef: RefObject<HTMLButtonElement | null>;
}

interface IUseVisibleChipCountResult {
  visibleCount: number;
}

export const useVisibleChipCount = ({
  chipRefs,
  containerRef,
  gap,
  itemsCount,
  measureMoreButtonRef,
}: IUseVisibleChipCountParams): IUseVisibleChipCountResult => {
  const [visibleCount, setVisibleCount] = useState(itemsCount);

  useLayoutEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return undefined;
    }

    const updateVisibleCount = () => {
      const containerWidth = containerElement.clientWidth;
      const moreButtonWidth = measureMoreButtonRef.current?.offsetWidth ?? 0;
      // Ширины берутся из скрытого измерительного слоя, чтобы основной список
      // мог понять, сколько чипов помещается до кнопки "...".
      const chipWidths = Array.from({ length: itemsCount }, (_, index) => {
        return chipRefs.current[index]?.offsetWidth ?? 0;
      });

      let consumedWidth = 0;
      let nextVisibleCount = chipWidths.length;

      for (let index = 0; index < chipWidths.length; index += 1) {
        const chipWidth = chipWidths[index];
        const chipWidthWithGap = chipWidth + (index > 0 ? gap : 0);
        const hasHiddenItems = index < chipWidths.length - 1;
        // Пока после текущего элемента остаются скрытые чипы,
        // заранее резервируем место под кнопку переполнения.
        const reservedMoreButtonWidth = hasHiddenItems ? moreButtonWidth + gap : 0;

        if (consumedWidth + chipWidthWithGap + reservedMoreButtonWidth > containerWidth) {
          nextVisibleCount = index;
          break;
        }

        consumedWidth += chipWidthWithGap;
      }

      setVisibleCount(nextVisibleCount);
    };

    updateVisibleCount();

    // Пересчитываем видимое количество при изменении размеров контейнера
    // и самих чипов, потому что на раскладку влияет и текст, и selected-состояние.
    const resizeObserver = new ResizeObserver(updateVisibleCount);

    resizeObserver.observe(containerElement);
    chipRefs.current.forEach((chipElement) => {
      if (chipElement) {
        resizeObserver.observe(chipElement);
      }
    });

    if (measureMoreButtonRef.current) {
      resizeObserver.observe(measureMoreButtonRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [chipRefs, containerRef, gap, itemsCount, measureMoreButtonRef]);

  return { visibleCount };
};

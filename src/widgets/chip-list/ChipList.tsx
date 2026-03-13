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
    // Компонент хранит только id выбранного чипа.
    // При обновлении items мы сохраняем выбор, если этот id всё ещё существует,
    // и сбрасываем его только когда источник данных реально удалил элемент.
    setSelectedChipId((prevSelectedChipId) =>
      items.some(({ id }) => id === prevSelectedChipId) ? prevSelectedChipId : null,
    );
  }, [items]);

  useEffect(() => {
    // Когда список переводят в статичный режим, selected-состояние больше
    // не имеет смысла: пользователь не может его изменить и UI не должен
    // выглядеть как интерактивный выбор.
    if (!isChipClickable) {
      setSelectedChipId(null);
    }
  }, [isChipClickable]);

  // Хук вычисляет, сколько чипов влезает в текущую ширину контейнера.
  // Для этого используются реальные DOM-ширины чипов из скрытого измерительного слоя.
  const { visibleCount } = useVisibleChipCount({
    chipRefs,
    containerRef,
    gap: DEFAULT_GAP,
    itemsCount: items.length,
    measureMoreButtonRef,
  });

  // Данные из пропсов преобразуются во view-model, чтобы дальше все вложенные
  // компоненты работали с единым форматом: label/status/isSelected.
  const chipItems: IChipListItemViewModel[] = items.map(({ id, status, text }) => ({
    id,
    isSelected: selectedChipId === id,
    label: text,
    status,
  }));
  const visibleItems = chipItems.slice(0, visibleCount);
  const hiddenItems = chipItems.slice(visibleCount);

  // Поповер нужен только при наличии скрытых элементов.
  // Если переполнения нет, хук автоматически запрещает открытие.
  const { anchorEl, isOpen, handleClose, handleToggle } =
    useCustomPopover<HTMLButtonElement>({
      isEnabled: hiddenItems.length > 0,
    });

  const handleChipClick = (id: number) => {
    // Повторный клик по выбранному чипу снимает выделение,
    // поэтому поведение ближе к toggle, а не к radio-button.
    setSelectedChipId((prevSelectedChipId) => (prevSelectedChipId === id ? null : id));
  };

  return (
    <>
      {/* Видимая строка содержит только те элементы, которые помещаются в контейнер.
      Если остались скрытые чипы, в конец добавляется триггер "...". */}
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

      {/* Скрытый слой нужен исключительно для измерений.
      Его DOM существует параллельно видимой строке, но пользователь его не видит. */}
      <ChipListMeasurement
        chipRefs={chipRefs}
        isChipClickable={isChipClickable}
        items={chipItems}
        measureMoreButtonRef={measureMoreButtonRef}
        selectedVariant={selectedVariant}
      />

      {/* Поповер показывает только скрытую часть списка.
      Видимые элементы остаются в строке, поэтому дубликатов в поповере нет. */}
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

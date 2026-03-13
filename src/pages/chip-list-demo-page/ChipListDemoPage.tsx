// Компоненты
import { WidthSwitcher } from '@/shared/ui/width-switcher';
import { ChipList } from '@/widgets/chip-list';
import {
  CHIP_CLICKABLE_OPTIONS,
  CHIP_STATUS_OPTIONS,
  CHIP_VARIANT_OPTIONS,
} from '@/widgets/chip-list/ChipList.config';
import ChipListControls from '@/widgets/chip-list-controls/ChipListControls';
import { useChipList } from '@/app/hooks';

const ChipListDemoPage = () => {
  // Хук инкапсулирует состояние демо:
  // какой вариант чипов выбран, кликабельны ли они и нужно ли
  // показывать статусные цвета. Компонент только связывает это состояние с UI.
  const {
    displayedChips,
    isChipClickable,
    isColoredStatusEnabled,
    selectedVariant,
    setIsChipClickable,
    setIsColoredStatusEnabled,
    setSelectedVariant,
  } = useChipList();

  return (
    <div>
      <div className="px-6! py-8!">
        {/* Блок переключателей меняет состояние демо и пробрасывает
        выбранные значения обратно в useChipList через обработчики. */}
        <ChipListControls
          variantSwitcher={{
            options: CHIP_VARIANT_OPTIONS,
            onChange: setSelectedVariant,
            value: selectedVariant,
          }}
          clickableSwitcher={{
            options: CHIP_CLICKABLE_OPTIONS,
            onChange: setIsChipClickable,
            value: isChipClickable,
          }}
          statusSwitcher={{
            options: CHIP_STATUS_OPTIONS,
            onChange: setIsColoredStatusEnabled,
            value: isColoredStatusEnabled,
          }}
        />

        {/* WidthSwitcher не влияет на данные списка.
        Он меняет ширину контейнера, чтобы можно было проверить,
        как ChipList ведёт себя при переполнении на разных брейкпоинтах. */}
        <WidthSwitcher>
          <ChipList
            items={displayedChips}
            isChipClickable={isChipClickable}
            selectedVariant={selectedVariant}
          />
        </WidthSwitcher>
      </div>
    </div>
  );
};

export default ChipListDemoPage;

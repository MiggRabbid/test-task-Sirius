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

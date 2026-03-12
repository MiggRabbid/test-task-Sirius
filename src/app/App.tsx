// Библиотеки
import { Box } from '@mui/material';
import { useState } from 'react';
// Данные
import { chips } from '@/shared/data';
// Компоненты
import { ChipsStatus, type TChipVariant } from '@/shared/ui/custom-chip';
import { WidthSwitcher } from '@/shared/ui/width-switcher';
import { ChipList } from '@/widgets/chip-list';
import {
  CHIP_CLICKABLE_OPTIONS,
  CHIP_STATUS_OPTIONS,
  CHIP_VARIANT_OPTIONS,
} from '@/widgets/chip-list/ChipList.config';
import { Header } from '@/widgets/header';
import ChipListControls from '@/widgets/chip-list-controls/ChipListControls';

function App() {
  const [selectedVariant, setSelectedVariant] = useState<TChipVariant>('filled');
  const [isChipClickable, setIsChipClickable] = useState(true);
  const [isColoredStatusEnabled, setIsColoredStatusEnabled] = useState(false);

  const displayedChips = chips.map((chip) => ({
    ...chip,
    status: isColoredStatusEnabled ? chip.status : ChipsStatus.default,
  }));

  return (
    <div>
      <Header />
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
}

export default App;

import { useState } from 'react';
import { Box } from '@mui/material';
import { chips } from '@/shared/data';
import { type TChipVariant } from '@/shared/ui/custom-chip';
import { WidthSwitcher } from '@/shared/ui/width-switcher';
import {
  CHIP_CLICKABLE_OPTIONS,
  CHIP_VARIANT_OPTIONS,
} from '@/widgets/chip-list/ChipList.config';
import { Header } from '@/widgets/header';
import { ChipList } from '@/widgets/chip-list';
import ChipListControls from '@/widgets/chip-list/ui/ChipListControls';

function App() {
  const [selectedVariant, setSelectedVariant] = useState<TChipVariant>('filled');
  const [isChipClickable, setIsChipClickable] = useState(true);

  return (
    <Box>
      <Header />
      <Box className="px-6! py-8!">
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
        />

        <WidthSwitcher>
          <ChipList
            items={chips}
            isChipClickable={isChipClickable}
            selectedVariant={selectedVariant}
          />
        </WidthSwitcher>
      </Box>
    </Box>
  );
}

export default App;

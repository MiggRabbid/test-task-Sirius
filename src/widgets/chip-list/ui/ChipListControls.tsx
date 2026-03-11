import CustomChipVariantSwitcher from './CustomChipVariantSwitcher';

import type {
  ChipVariant,
  CustomChipVariantSwitcherProps,
} from '@/shared/ui/custom-chip';

type ChipListControlsProps = {
  clickableSwitcher: CustomChipVariantSwitcherProps<boolean>;
  variantSwitcher: CustomChipVariantSwitcherProps<ChipVariant>;
};

const ChipListControls = ({
  clickableSwitcher,
  variantSwitcher,
}: ChipListControlsProps) => {
  return (
    <div className="mt-4 mb-4! flex flex-wrap justify-end gap-2">
      <CustomChipVariantSwitcher {...variantSwitcher} />
      <CustomChipVariantSwitcher {...clickableSwitcher} />
    </div>
  );
};

export default ChipListControls;

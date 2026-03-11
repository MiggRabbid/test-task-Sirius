import OptionSwitcher from './OptionSwitcher';

import type { TChipVariant } from '@/shared/ui/custom-chip';
import type { IOptionSwitcherProps } from './OptionSwitcher.types';

interface IChipListControlsProps {
  clickableSwitcher: IOptionSwitcherProps<boolean>;
  variantSwitcher: IOptionSwitcherProps<TChipVariant>;
}

const ChipListControls = ({
  clickableSwitcher,
  variantSwitcher,
}: IChipListControlsProps) => {
  return (
    <div className="mt-4 mb-4! flex flex-wrap justify-end gap-2">
      <OptionSwitcher {...variantSwitcher} />
      <OptionSwitcher {...clickableSwitcher} />
    </div>
  );
};

export default ChipListControls;

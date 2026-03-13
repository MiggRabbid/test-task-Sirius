// Компоненты
import OptionSwitcher from './ui/OptionSwitcher';
// Типизация
import type { TChipVariant } from '@/shared/ui/custom-chip';
import type { IOptionSwitcherProps } from './ui/OptionSwitcher.types';

interface IChipListControlsProps {
  clickableSwitcher: IOptionSwitcherProps<boolean>;
  statusSwitcher: IOptionSwitcherProps<boolean>;
  variantSwitcher: IOptionSwitcherProps<TChipVariant>;
}

const ChipListControls = ({
  clickableSwitcher,
  statusSwitcher,
  variantSwitcher,
}: IChipListControlsProps) => {
  return (
    // Компонент служит простой компоновкой для трёх независимых переключателей.
    // Вся бизнес-логика уже пришла в пропсах, поэтому здесь только порядок и раскладка.
    <div className="mt-4 mb-4! flex flex-wrap justify-end gap-2">
      <OptionSwitcher {...variantSwitcher} />
      <OptionSwitcher {...statusSwitcher} />
      <OptionSwitcher {...clickableSwitcher} />
    </div>
  );
};

export default ChipListControls;

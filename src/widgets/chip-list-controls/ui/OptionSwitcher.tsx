// Компоненты
import { CustomButton } from '@/shared/ui/custom-button';
// Типизация
import type {
  IOptionSwitcherProps,
  TCustomChipSwitcherValue,
} from './OptionSwitcher.types';

const OptionSwitcher = <T extends TCustomChipSwitcherValue>({
  onChange,
  options,
  value,
}: IOptionSwitcherProps<T>) => {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {options.map((option) => (
        <CustomButton
          key={String(option.value)}
          isActive={value === option.value}
          // Компонент остаётся универсальным - он просто возвращает
          // выбранное значение из переданного списка опций.
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </CustomButton>
      ))}
    </div>
  );
};

export default OptionSwitcher;

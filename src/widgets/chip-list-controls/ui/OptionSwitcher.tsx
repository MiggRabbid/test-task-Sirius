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
    // Один и тот же компонент обслуживает boolean- и string-переключатели.
    // Он знает только список опций и текущее значение, не привязываясь
    // к конкретной настройке чипов.
    <div className="flex flex-wrap justify-end gap-2">
      {options.map((option) => (
        <CustomButton
          key={String(option.value)}
          isActive={value === option.value}
          // Кнопка возвращает наружу значение выбранной опции,
          // а решение, что именно это значение меняет, остаётся у родителя.
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </CustomButton>
      ))}
    </div>
  );
};

export default OptionSwitcher;

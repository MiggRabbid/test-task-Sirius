import { CustomButton } from '@/shared/ui/custom-button';
import type {
  CustomChipSwitcherValue,
  CustomChipVariantSwitcherProps,
} from '@/shared/ui/custom-chip';

const CustomChipVariantSwitcher = <T extends CustomChipSwitcherValue>({
  onChange,
  options,
  value,
}: CustomChipVariantSwitcherProps<T>) => {
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

export default CustomChipVariantSwitcher;

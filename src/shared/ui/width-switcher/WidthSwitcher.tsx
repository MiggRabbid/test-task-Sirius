// Библиотеки
import { useState } from 'react';
// Компоненты
import { CustomButton } from '@/shared/ui/custom-button';
// Типизация
import type { TWidthOption, TWidthSwitcherProps } from './WidthSwitcher.types';

const WIDTH_OPTIONS: Array<{
  label: TWidthOption;
  style: { maxWidth: string; width: string };
}> = [
  { label: '288px', style: { width: '288px', maxWidth: '288px' } },
  { label: '384px', style: { width: '384px', maxWidth: '384px' } },
  { label: '1024px', style: { width: '100%', maxWidth: '1024px' } },
  { label: '1280px', style: { width: '100%', maxWidth: '1280px' } },
  { label: 'full', style: { width: '100%', maxWidth: '100%' } },
];

const WidthSwitcher = ({ children }: TWidthSwitcherProps) => {
  const [selectedWidth, setSelectedWidth] = useState<TWidthOption>('1280px');

  // По выбранному пресету находим style для контейнера примера.
  // Фолбэк сохраняет корректное поведение, даже если значение когда-то
  // перестанет совпадать с массивом WIDTH_OPTIONS.
  const activeWidthStyle = WIDTH_OPTIONS.find(({ label }) => label === selectedWidth)
    ?.style ?? {
    width: '100%',
    maxWidth: '100%',
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-end gap-2">
        {WIDTH_OPTIONS.map(({ label }) => {
          const isActive = label === selectedWidth;

          return (
            <CustomButton
              key={label}
              onClick={() => setSelectedWidth(label)}
              isActive={isActive}
            >
              {label}
            </CustomButton>
          );
        })}
      </div>

      <div className="flex w-full justify-center">
        <div
          className="rounded-lg bg-white px-3! py-2! transition-[width,max-width] duration-200"
          style={activeWidthStyle}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default WidthSwitcher;

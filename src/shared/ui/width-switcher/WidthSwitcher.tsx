import { useState } from 'react';
import clsx from 'clsx';
import { CustomButton } from '@/shared/ui/custom-button';

import type { TWidthOption, TWidthSwitcherProps } from './WidthSwitcher.types';

const WIDTH_OPTIONS: Array<{ label: TWidthOption; className: string }> = [
  { label: '288px', className: 'w-74' },
  { label: '384px', className: 'w-96' },
  { label: '1024px', className: 'w-full max-w-[1024px]' },
  { label: '1280px', className: 'w-full max-w-[1280px]' },
  { label: 'full', className: 'w-full' },
];

const WidthSwitcher = ({ children }: TWidthSwitcherProps) => {
  const [selectedWidth, setSelectedWidth] = useState<TWidthOption>('full');

  const activeWidthClassName =
    WIDTH_OPTIONS.find(({ label }) => label === selectedWidth)?.className ?? 'w-full';

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
          className={clsx(
            'rounded-lg bg-white px-3! py-2! transition-all duration-200',
            activeWidthClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default WidthSwitcher;

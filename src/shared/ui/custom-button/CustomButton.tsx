import clsx from 'clsx';

import type { CustomButtonProps } from './';

const CustomButton = ({
  children,
  className,
  isActive = false,
  type = 'button',
  ...props
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'cursor-pointer rounded-md border px-4! py-2! text-sm font-medium transition-colors',
        isActive
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;

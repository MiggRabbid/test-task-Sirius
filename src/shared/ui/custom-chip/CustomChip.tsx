import { forwardRef, memo } from 'react';
import clsx from 'clsx';

import type { ElementType, ForwardedRef, ReactElement } from 'react';
import { ChipsStatus, type CustomChipProps } from './CustomChip.types';

const filledStatusClassName: Record<ChipsStatus, string> = {
  [ChipsStatus.default]:
    'border-transparent bg-slate-300 text-slate-800 hover:bg-slate-300',
  [ChipsStatus.info]: 'border-transparent bg-blue-300 text-blue-800 hover:bg-blue-300',
  [ChipsStatus.success]:
    'border-transparent bg-emerald-300 text-emerald-800 hover:bg-emerald-300',
  [ChipsStatus.warning]:
    'border-transparent bg-orange-300 text-orange-800 hover:bg-orange-300',
  [ChipsStatus.error]: 'border-transparent bg-red-300 text-red-800 hover:bg-red-300',
};

const outlinedStatusClassName: Record<ChipsStatus, string> = {
  [ChipsStatus.default]:
    'border-slate-600 bg-transparent text-slate-800 hover:bg-slate-100',
  [ChipsStatus.info]: 'border-blue-600 bg-transparent text-blue-800 hover:bg-blue-100',
  [ChipsStatus.success]:
    'border-emerald-600 bg-transparent text-emerald-800 hover:bg-emerald-100',
  [ChipsStatus.warning]:
    'border-orange-600 bg-transparent text-orange-800 hover:bg-orange-100',
  [ChipsStatus.error]: 'border-red-600 bg-transparent text-red-800 hover:bg-red-100',
};

const CustomChipInner = <C extends ElementType = 'button'>(
  {
    className,
    clickable,
    component,
    disabled = false,
    label,
    onClick,
    selected = false,
    status = ChipsStatus.default,
    variant = 'filled',
    ...restProps
  }: CustomChipProps<C>,
  ref: ForwardedRef<Element>,
) => {
  const Component = component ?? (onClick ? 'button' : 'div');

  const isInteractive = clickable ?? Boolean(onClick);

  const appearanceClassName =
    variant === 'outlined'
      ? outlinedStatusClassName[status]
      : filledStatusClassName[status];
  const selectedClassName =
    variant === 'outlined'
      ? filledStatusClassName[status]
      : outlinedStatusClassName[status];

  return (
    <Component
      {...restProps}
      ref={ref}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        'inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border px-4! py-2! text-sm leading-none font-medium whitespace-nowrap transition-colors duration-200',
        isInteractive && !disabled && 'cursor-pointer hover:brightness-[0.98]',
        !isInteractive && 'cursor-default',
        disabled && 'cursor-not-allowed opacity-50',
        selected ? selectedClassName : appearanceClassName,
        className,
      )}
      {...(Component === 'button' ? { disabled, type: 'button' as const } : {})}
    >
      <span className="pointer-events-none truncate">{label}</span>
    </Component>
  );
};

type CustomChipComponent = <C extends ElementType = 'button'>(
  // eslint-disable-next-line no-unused-vars
  props: CustomChipProps<C> & { ref?: ForwardedRef<Element> },
) => ReactElement | null;

const CustomChip = forwardRef(CustomChipInner as never) as unknown as CustomChipComponent;

export default memo(CustomChip);

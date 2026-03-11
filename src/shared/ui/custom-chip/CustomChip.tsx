import { forwardRef, memo } from 'react';
import clsx from 'clsx';

import type { ElementType, ForwardedRef } from 'react';
import {
  ChipsStatus,
  type CustomChipComponent,
  type CustomChipProps,
} from './CustomChip.types';

const filledStatusClassName: Record<ChipsStatus, string> = {
  [ChipsStatus.default]: 'border-transparent bg-slate-300 text-slate-800',
  [ChipsStatus.info]: 'border-transparent bg-blue-300 text-blue-800',
  [ChipsStatus.success]: 'border-transparent bg-emerald-300 text-emerald-800',
  [ChipsStatus.warning]: 'border-transparent bg-orange-300 text-orange-800',
  [ChipsStatus.error]: 'border-transparent bg-red-300 text-red-800',
};

const outlinedStatusClassName: Record<ChipsStatus, string> = {
  [ChipsStatus.default]: 'border-slate-600 bg-transparent text-slate-800',
  [ChipsStatus.info]: 'border-blue-600 bg-transparent text-blue-800',
  [ChipsStatus.success]: 'border-emerald-600 bg-transparent text-emerald-800',
  [ChipsStatus.warning]: 'border-orange-600 bg-transparent text-orange-800',
  [ChipsStatus.error]: 'border-red-600 bg-transparent text-red-800',
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
  // clickable имеет приоритет над onClick, чтобы родитель мог явно
  // включать и выключать интерактивность без изменения обработчика.
  const isInteractive = clickable ?? Boolean(onClick);
  // Интерактивный чип по умолчанию рендерится как button, обычный - как div.
  const Component = component ?? (isInteractive ? 'button' : 'div');

  // Для disabled и неинтерактивного состояния обработчик клика отключается.
  const handleClick = !disabled && isInteractive ? onClick : undefined;

  const appearanceClassName =
    variant === 'outlined'
      ? outlinedStatusClassName[status]
      : filledStatusClassName[status];
  // В selected-состоянии визуальный вариант меняется местами
  const selectedClassName =
    variant === 'outlined'
      ? filledStatusClassName[status]
      : outlinedStatusClassName[status];

  return (
    <Component
      {...restProps}
      ref={ref}
      onClick={handleClick}
      className={clsx(
        'inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border px-4! py-2! text-sm leading-none font-medium whitespace-nowrap transition-colors duration-200',
        isInteractive &&
          !disabled &&
          'cursor-pointer hover:bg-[color:color-mix(in_srgb,currentColor_8%,transparent)] hover:brightness-[0.98]',
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

const CustomChip = forwardRef(CustomChipInner as never) as unknown as CustomChipComponent;

export default memo(CustomChip);

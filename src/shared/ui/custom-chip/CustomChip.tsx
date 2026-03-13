// Библиотеки
import clsx from 'clsx';
import { forwardRef, memo } from 'react';
// Логика
import { ChipsStatus } from './CustomChip.types';
// Типизация
import type { ForwardedRef } from 'react';
import type { ICustomChipProps } from './CustomChip.types';

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

const CustomChipInner = (
  {
    className,
    clickable,
    disabled = false,
    label,
    onClick,
    selected = false,
    status = ChipsStatus.default,
    variant = 'filled',
  }: ICustomChipProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLDivElement>,
) => {
  // clickable имеет приоритет над onClick, чтобы родитель мог явно управлять
  // режимом интерактивности. Это важно для сценария, где обработчик клика
  // технически существует, но UI временно должен вести себя как статичный.
  const isInteractive = clickable ?? Boolean(onClick);
  const isPressed = isInteractive ? selected : undefined;

  const appearanceClassName =
    variant === 'outlined'
      ? outlinedStatusClassName[status]
      : filledStatusClassName[status];
  // В selected-состоянии компонент меняет схему местами:
  // filled становится похож на outlined и наоборот.
  // Так выделение видно без отдельной палитры для каждого статуса.
  const selectedClassName =
    variant === 'outlined'
      ? filledStatusClassName[status]
      : outlinedStatusClassName[status];

  const commonClassName = clsx(
    'inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border px-4! py-2! text-sm leading-none font-medium whitespace-nowrap transition-colors duration-200',
    isInteractive &&
      !disabled &&
      'cursor-pointer hover:bg-[color:color-mix(in_srgb,currentColor_8%,transparent)] hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 focus-visible:ring-offset-2',
    !isInteractive && 'cursor-default',
    disabled && 'cursor-not-allowed opacity-50',
    selected ? selectedClassName : appearanceClassName,
    className,
  );

  if (!isInteractive) {
    return (
      // Некликабельный чип рендерится как div, чтобы не создавать ложную
      // интерактивность для клавиатуры, скринридеров и браузерной семантики.
      <div ref={ref as ForwardedRef<HTMLDivElement>} className={commonClassName}>
        <span className="pointer-events-none truncate">{label}</span>
      </div>
    );
  }

  return (
    <button
      ref={ref as ForwardedRef<HTMLButtonElement>}
      type="button"
      disabled={disabled}
      // aria-pressed выставляется только для интерактивного режима,
      // где selected действительно отражает текущее состояние кнопки-переключателя.
      aria-pressed={isPressed}
      onClick={disabled ? undefined : onClick}
      className={commonClassName}
    >
      <span className="pointer-events-none truncate">{label}</span>
    </button>
  );
};

const CustomChip = forwardRef(CustomChipInner);

export default memo(CustomChip);

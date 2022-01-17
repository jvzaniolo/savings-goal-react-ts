import { forwardRef, useEffect, useState } from 'react';
import type { ForwardRefRenderFunction, ReactNode } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface ReachDateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: {
    monthIndex: number;
    month: string;
    year: number;
  };
  label?: ReactNode;
  onChange: () => { onIncrease: () => void; onDecrease: () => void };
}

function formatInputValue(value: { monthIndex: number; year: number }) {
  const formattedMonthIndex =
    value.monthIndex < 10 ? `0${value.monthIndex + 1}` : value.monthIndex + 1;

  return `${value.year}-${formattedMonthIndex}-01`;
}

/**
 * A custom date input with a button to increase/decrease the month and year.
 *
 * It receives a value object and returns a Date as string with the format 'yyyy-MM-dd' as a normal date input would.
 *
 * @example
 * formData.get('reach-date') // '2022-01-01'
 *
 * <ReachDateInput
 *  id="reach-date"
 *  label="Reach goal by"
 *  value={{ monthIndex: 0, month: 'January', year: 2022 }}
 *  onChange={() => ({
 *   onIncrement: () => void;
 *   onDecrement: () => void;
 *  })}
 * />
 */
const ReachDateInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  ReachDateInputProps
> = ({ id, className, label, value, disabled, onChange, ...rest }, ref) => {
  const [hasFocus, setHasFocus] = useState(false);
  const { onDecrease, onIncrease } = onChange();

  useEffect(() => {
    function eventListener(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') onDecrease();
      if (event.key === 'ArrowRight') onIncrease();
    }

    if (hasFocus) {
      window.addEventListener('keydown', eventListener);
    }

    return () => window.removeEventListener('keydown', eventListener);
  }, [hasFocus, onDecrease, onIncrease]);

  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={id} tabIndex={1} className={className}>
        {label && (
          <span className="mb-1 text-xs sm:text-sm text-blue-gray-800">
            {label}
          </span>
        )}
        <div
          className={`h-14 py-1 px-2 flex rounded border items-center border-blue-gray-50 ${
            hasFocus ? 'outline outline-2 outline-brand-secondary' : ''
          } ${className}`}
        >
          <button
            type="button"
            tabIndex={2}
            onClick={onDecrease}
            className={`w-10 h-10 text-center rounded-full transition-colors focus:outline-none ${
              disabled
                ? 'text-blue-gray-50 hover:bg-transparent cursor-not-allowed'
                : 'text-blue-gray-300 hover:bg-slate-100'
            }`}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            data-testid="reach-date-left-button"
          >
            <MdKeyboardArrowLeft size={24} className="m-2" />
          </button>
          <section className="flex flex-col flex-1 items-center text-sm sm:text-base">
            <span className="w-24 font-semibold text-center text-blue-gray-800">
              {value.month}
            </span>

            <span className="text-blue-gray-400">{value.year}</span>
          </section>
          <button
            type="button"
            tabIndex={3}
            onClick={onIncrease}
            className="flex items-center text-center rounded-full transition-colors focus:outline-none text-blue-gray-300 hover:bg-slate-100 "
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            data-testid="reach-date-right-button"
          >
            <MdKeyboardArrowRight size={24} className="m-2 " />
          </button>
        </div>
      </label>
      <input
        ref={ref}
        id={id}
        name={id}
        {...rest}
        type="date"
        className="absolute -left-full opacity-0"
        value={formatInputValue(value)}
        onChange={() => formatInputValue(value)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        data-testid="reach-date-hidden-input"
      />
    </div>
  );
};

export const ReachDateInput = forwardRef(ReachDateInputComponent);

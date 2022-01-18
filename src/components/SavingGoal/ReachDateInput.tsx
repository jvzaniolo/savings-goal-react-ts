import { forwardRef, useCallback, useEffect, useState } from 'react';
import type { ForwardRefRenderFunction, ReactNode } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface ReachDateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: ReactNode;
  onChange?: ({
    value,
    month,
    year,
    monthCounter,
  }: {
    value: string;
    month: string;
    year: number;
    monthCounter: number;
  }) => void;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function formatInputValue(value: { monthIndex: number; year: number }) {
  const formattedMonthIndex =
    value.monthIndex < 9 ? `0${value.monthIndex + 1}` : value.monthIndex + 1;

  return `${value.year}-${formattedMonthIndex}-01`;
}

const ReachDateInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  ReachDateInputProps
> = ({ id, className, label, disabled, onChange, ...rest }, ref) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [hasFocus, setHasFocus] = useState(false);
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [monthCounter, setMonthCounter] = useState(0);

  const isDecreaseDisabled =
    monthIndex === new Date().getMonth() && year === new Date().getFullYear();

  const handleDecrease = useCallback(() => {
    if (isDecreaseDisabled) return;

    setMonthCounter(monthCounter - 1);

    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  }, [isDecreaseDisabled, monthCounter, monthIndex, year]);

  const handleIncrease = useCallback(() => {
    setMonthCounter(monthCounter + 1);

    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear(year + 1);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  }, [monthCounter, monthIndex, year]);

  useEffect(() => {
    onChange?.({
      value: formatInputValue({ monthIndex, year }),
      month: MONTHS[monthIndex],
      year,
      monthCounter,
    });
  }, [monthCounter, monthIndex, onChange, year]);

  useEffect(() => {
    function eventListener(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') handleDecrease();
      if (event.key === 'ArrowRight') handleIncrease();
    }

    if (hasFocus) {
      window.addEventListener('keydown', eventListener);
    }

    return () => window.removeEventListener('keydown', eventListener);
  }, [hasFocus, handleDecrease, handleIncrease]);

  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={id} tabIndex={1}>
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
            onClick={handleDecrease}
            className={`w-10 h-10 text-center rounded-full transition-colors focus:outline-none ${
              isDecreaseDisabled
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
              {MONTHS[monthIndex]}
            </span>

            <span className="text-blue-gray-400">{year}</span>
          </section>
          <button
            type="button"
            tabIndex={3}
            onClick={handleIncrease}
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
        type="date"
        value={formatInputValue({ monthIndex, year })}
        className="absolute -left-full opacity-0"
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        data-testid="reach-date-hidden-input"
        // fix for HTML element without onChange event
        readOnly
        {...rest}
      />
    </div>
  );
};

/**
 * A custom date input with buttons to increase/decrease the month and year.
 *
 * It receives a value object and returns a Date as string with the format 'yyyy-MM-dd' as a normal date input would.
 *
 * @example
 * formData.get('reach-date') // '2022-01-01'
 *
 * <ReachDateInput
 *  id="reach-date"
 *  label="Reach goal by"
 *  onChange={({ value, month, year, monthCounter }) => {
 *  }}
 * />
 */
export const ReachDateInput = forwardRef(ReachDateInputComponent);

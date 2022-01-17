import { forwardRef, useEffect, useState } from 'react';
import type { ForwardRefRenderFunction, ReactNode } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface ReachDateInputComponentProps {
  id: string;
  className?: string;
  value: {
    month: string;
    year: number;
  };
  label?: ReactNode;
  isDisabled: boolean;
  onMonthDecrease(): void;
  onMonthIncrease(): void;
}

const ReachDateInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  ReachDateInputComponentProps
> = (
  { id, className, label, value, isDisabled, onMonthDecrease, onMonthIncrease },
  ref
) => {
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    function eventListener(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') onMonthDecrease();
      if (event.key === 'ArrowRight') onMonthIncrease();
    }

    if (hasFocus) {
      window.addEventListener('keydown', eventListener);
    }

    return () => window.removeEventListener('keydown', eventListener);
  }, [hasFocus, onMonthDecrease, onMonthIncrease]);

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
            onClick={onMonthDecrease}
            className={`w-10 h-10 text-center rounded-full transition-colors focus:outline-none ${
              isDisabled
                ? 'text-blue-gray-50 hover:bg-transparent cursor-not-allowed'
                : 'text-blue-gray-300 hover:bg-slate-100'
            }`}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            data-testid="left-button"
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
            onClick={onMonthIncrease}
            className="flex items-center text-center rounded-full transition-colors focus:outline-none text-blue-gray-300 hover:bg-slate-100 "
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            data-testid="right-button"
          >
            <MdKeyboardArrowRight size={24} className="m-2 " />
          </button>
        </div>
      </label>
      <input
        ref={ref}
        id={id}
        name={id}
        className="absolute -left-full opacity-0"
        value={`${value.month},${value.year}`}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        data-testid="hidden-input"
        // fix for property value without onChange function
        readOnly
      />
    </div>
  );
};

export const ReachDateInput = forwardRef(ReachDateInputComponent);

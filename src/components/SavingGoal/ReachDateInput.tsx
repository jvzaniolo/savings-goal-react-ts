import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from 'react';

interface ReachDateInputComponentProps {
  month: string;
  year: number;
  isDisabled: boolean;
  onPrevMonthChange(): void;
  onNextMonthChange(): void;
}

const ReachDateInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  ReachDateInputComponentProps
> = (
  { month, year, isDisabled, onPrevMonthChange, onNextMonthChange },
  ref
) => {
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    function eventListener(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') onNextMonthChange();
      if (event.key === 'ArrowLeft') onPrevMonthChange();
    }

    if (hasFocus) {
      window.addEventListener('keydown', eventListener);
    }

    return () => window.removeEventListener('keydown', eventListener);
  }, [hasFocus, onPrevMonthChange, onNextMonthChange]);

  return (
    <>
      <label htmlFor="reach-date" tabIndex={1}>
        <span className="mb-1 text-sm text-blue-gray-900">Reach goal by</span>
        <div
          className={`py-1 px-2 flex rounded border items-center border-blue-gray-50 ${
            hasFocus && 'outline outline-2 outline-blue-600'
          }`}
        >
          <button
            type="button"
            tabIndex={2}
            onClick={onPrevMonthChange}
            className={`w-10 h-10 text-center rounded-full transition-colors text-blue-gray-300 hover:bg-slate-100 focus:outline-none ${
              isDisabled &&
              'text-blue-gray-50 hover:bg-transparent cursor-not-allowed'
            }`}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
          >
            <MdKeyboardArrowLeft size={24} className="m-2" />
          </button>
          <section className="flex flex-col flex-1 items-center">
            <span className="w-24 font-semibold text-blue-gray-900 text-center">
              {month}
            </span>

            <span>{year}</span>
          </section>
          <button
            type="button"
            tabIndex={3}
            onClick={onNextMonthChange}
            className="flex items-center text-center rounded-full transition-colors text-blue-gray-300 hover:bg-slate-100 focus:outline-none"
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
          >
            <MdKeyboardArrowRight size={24} className="m-2 " />
          </button>
        </div>
      </label>
      <input
        ref={ref}
        id="reach-date"
        name="reach-date"
        style={{
          transform: 'scale(0)',
        }}
        value={`${month} ${year}`}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      />
    </>
  );
};

export const ReachDateInput = forwardRef(ReachDateInputComponent);

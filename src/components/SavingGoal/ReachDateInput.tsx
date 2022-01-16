import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react';

interface ReachDateInputComponentProps
  extends InputHTMLAttributes<HTMLInputElement> {
  month: string;
  year: number;
  label?: ReactNode;
  isDisabled: boolean;
  onPrevMonthChange(): void;
  onNextMonthChange(): void;
}

const ReachDateInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  ReachDateInputComponentProps
> = (
  {
    id,
    className,
    label,
    month,
    year,
    isDisabled,
    onPrevMonthChange,
    onNextMonthChange,
  },
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
    <div className="flex flex-1 flex-col">
      <label htmlFor={id} tabIndex={1} className={className}>
        {label && (
          <span className="mb-1 text-sm text-blue-gray-800">{label}</span>
        )}
        <div
          className={`py-1 px-2 flex rounded border items-center border-blue-gray-50 ${
            hasFocus ? 'outline outline-2 outline-blue-600' : ''
          } ${className}`}
        >
          <button
            type="button"
            tabIndex={2}
            onClick={onPrevMonthChange}
            className={`w-10 h-10 text-center rounded-full transition-colors focus:outline-none ${
              isDisabled
                ? 'text-blue-gray-50 hover:bg-transparent cursor-not-allowed'
                : 'text-blue-gray-300 hover:bg-slate-100'
            }`}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
          >
            <MdKeyboardArrowLeft size={24} className="m-2" />
          </button>
          <section className="flex flex-col flex-1 items-center">
            <span className="w-24 font-semibold text-blue-gray-800 text-center">
              {month}
            </span>

            <span className="text-blue-gray-400">{year}</span>
          </section>
          <button
            type="button"
            tabIndex={3}
            onClick={onNextMonthChange}
            className="flex items-center text-center rounded-full transition-colors focus:outline-none text-blue-gray-300 hover:bg-slate-100 "
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
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
        defaultValue={`${month} ${year}`}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      />
    </div>
  );
};

export const ReachDateInput = forwardRef(ReachDateInputComponent);

import { useReachDate } from '../contexts/ReachDateContext';

interface ReachDateProps {
  className?: string;
}

export function ReachDate({ className }: ReachDateProps) {
  const { year, month, isDisabled, handlePrevMonth, handleNextMonth } =
    useReachDate();

  return (
    <div
      className={`py-1 px-2 flex rounded border items-center border-blue-gray-50 ${className}`}
    >
      <button
        type="button"
        onClick={handlePrevMonth}
        disabled={isDisabled}
        className="w-10 h-10 text-center rounded-full transition-colors hover:bg-slate-100 disabled:text-blue-gray-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
      >
        &lt;
      </button>
      <section className="flex flex-col flex-1 items-center">
        <span className="w-24 font-semibold text-blue-gray-900 text-center disabled:bg-transparent">
          {month}
        </span>

        <span className="disabled:bg-transparent">{year}</span>
      </section>
      <button
        type="button"
        onClick={handleNextMonth}
        className="w-10 h-10 text-center rounded-full transition-colors hover:bg-slate-100 disabled:text-blue-gray-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
      >
        &gt;
      </button>
    </div>
  );
}

import { useContext, useState } from 'react';
import { createContext } from 'react';

interface ReachDateContextValue {
  year: number;
  month: string;
  monthIndex: number;
  isDisabled: boolean;
  handlePrevMonth(): void;
  handleNextMonth(): void;
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

const ReachDateContext = createContext<ReachDateContextValue | undefined>(
  undefined
);

export function ReachDateProvider({ children }: { children: JSX.Element }) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [monthIndex, setMonthIndex] = useState(currentDate.getMonth());

  const month = MONTHS[monthIndex];
  const isDisabled =
    currentDate.getMonth() === monthIndex && currentDate.getFullYear() === year;

  function handlePrevMonth() {
    if (isDisabled) return;

    if (monthIndex === 0) {
      setMonthIndex(MONTHS.length - 1);
      setYear(year - 1);
      return;
    }

    setMonthIndex((month) => month - 1);
  }

  function handleNextMonth() {
    if (monthIndex === MONTHS.length - 1) {
      setMonthIndex(0);
      setYear(year + 1);
      return;
    }

    setMonthIndex((month) => month + 1);
  }

  return (
    <ReachDateContext.Provider
      value={{
        year,
        month,
        monthIndex,
        isDisabled,
        handlePrevMonth,
        handleNextMonth,
      }}
    >
      {children}
    </ReachDateContext.Provider>
  );
}

export function useReachDate() {
  const context = useContext(ReachDateContext);

  if (!context) throw new Error('A context must be used inside its provider');

  return context;
}

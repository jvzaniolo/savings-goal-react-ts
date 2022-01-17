import { useContext, useState } from 'react';
import { createContext } from 'react';

interface SavingGoalContextValue {
  year: number;
  month: string;
  shouldHandlePrevMonth: boolean;
  monthlyDeposits: number;
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

const SavingGoalContext = createContext<SavingGoalContextValue | undefined>(
  undefined
);

export function SavingGoalProvider({ children }: { children: JSX.Element }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  // counter to monthly deposits
  const [monthlyDepositsCounter, setMonthlyDepositsCounter] = useState(1);

  // gets the chosen month name by index
  const month = MONTHS[monthIndex];

  // the previous action is disabled if the current month is equal the chosen month
  // and the current year is equal to the chosen year
  const shouldHandlePrevMonth =
    new Date().getMonth() !== monthIndex || new Date().getFullYear() !== year;

  function handlePrevMonth() {
    if (!shouldHandlePrevMonth) return;

    setMonthlyDepositsCounter(monthlyDepositsCounter - 1);

    // if we are decreasing the month
    // and chosen month is January
    if (monthIndex === 0) {
      setMonthIndex(MONTHS.length - 1); // changes chosen month to December (index 11)
      setYear(year - 1); // changes chosen year to the previous one
      return;
    }

    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthlyDepositsCounter(monthlyDepositsCounter + 1);

    // if we are increasing the month
    // and chosen month is December
    if (monthIndex === MONTHS.length - 1) {
      setMonthIndex(0); // resets chosen month to January (index 0)
      setYear(year + 1); // changes chosen year to the next one
      return;
    }

    setMonthIndex(monthIndex + 1);
  }

  return (
    <SavingGoalContext.Provider
      value={{
        year,
        month,
        shouldHandlePrevMonth,
        monthlyDeposits: monthlyDepositsCounter,
        handlePrevMonth,
        handleNextMonth,
      }}
    >
      {children}
    </SavingGoalContext.Provider>
  );
}

export function useSavingGoal() {
  const context = useContext(SavingGoalContext);

  if (!context) throw new Error('A context must be used inside its provider');

  return context;
}
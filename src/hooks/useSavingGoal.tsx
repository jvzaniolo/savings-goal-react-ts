import { useState } from 'react';

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

export function useSavingGoal() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  // counter to monthly deposits
  const [monthlyDeposits, setMonthlyDeposits] = useState(1);

  // gets the chosen month name by index
  const month = MONTHS[monthIndex];

  // the previous action is disabled if the current month is equal the chosen month
  // and the current year is equal to the chosen year
  const canDecreaseMonth =
    new Date().getMonth() !== monthIndex || new Date().getFullYear() !== year;

  function handleMonthDecrease() {
    if (!canDecreaseMonth) return;

    setMonthlyDeposits(monthlyDeposits - 1);

    // if we are DECREASING the month
    // and chosen month is January
    if (monthIndex === 0) {
      setMonthIndex(MONTHS.length - 1); // changes chosen month to December (index 11)
      setYear(year - 1); // changes chosen year to the previous one
      return;
    }

    setMonthIndex(monthIndex - 1);
  }

  function handleMonthIncrease() {
    setMonthlyDeposits(monthlyDeposits + 1);

    // if we are INCREASING the month
    // and chosen month is December
    if (monthIndex === MONTHS.length - 1) {
      setMonthIndex(0); // resets chosen month to January (index 0)
      setYear(year + 1); // changes chosen year to the next one
      return;
    }

    setMonthIndex(monthIndex + 1);
  }

  return {
    reachDate: { month, year },
    monthlyDeposits,
    canDecreaseMonth,
    handleMonthDecrease,
    handleMonthIncrease,
  };
}

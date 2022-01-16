import { FormEvent, useState } from 'react';
import { useSavingGoal } from '../../contexts/SavingGoalContext';
import { ReachDateInput } from './ReachDateInput';
import { MonthlyAmount } from './MonthlyAmount';
import { CurrencyInput } from './CurrencyInput';
import { BsCurrencyDollar } from 'react-icons/bs';

import buyAHouseImg from '../../assets/icons/buy-a-house.svg';

interface Amount {
  float: number;
  formatted: string;
  value: string;
}

export function SavingGoal(): JSX.Element {
  const [amount, setAmount] = useState<Amount | undefined>(undefined);
  const {
    month,
    year,
    shouldHandlePrevMonth,
    monthlyDeposits,
    handlePrevMonth,
    handleNextMonth,
  } = useSavingGoal();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function handleMonthlyAmount(): number {
    if (!amount) return 0;

    return amount.float > 0 ? amount.float / monthlyDeposits : 0;
  }

  return (
    <div className="sm:max-w-[40rem]">
      <h3 className="mb-6 text-center text-lg sm:text-xl text-brand-primary">
        Let&apos;s plan your{' '}
        <strong className="font-semibold">saving goal.</strong>
      </h3>

      <div className="pt-8 p-10 rounded-lg shadow-level4 bg-neutral-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-wrap space-y-6"
        >
          <section className="flex items-center space-x-4">
            <img src={buyAHouseImg} alt="Buy a house" width={64} />
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-display font-medium text-blue-gray-800">
                Buy a house
              </h1>
              <h2 className="text-sm sm:text-base text-blue-gray-400">
                Saving Goal
              </h2>
            </div>
          </section>

          <div className="flex flex-wrap gap-4">
            <CurrencyInput
              id="amount"
              label="Total amount"
              icon={
                <BsCurrencyDollar size={24} className="text-blue-gray-100" />
              }
              onValueChange={(_, __, values) => setAmount(values as Amount)}
            />

            <ReachDateInput
              id="reach-date"
              label="Reach goal by"
              month={month}
              year={year}
              isDisabled={shouldHandlePrevMonth}
              onPrevMonthChange={handlePrevMonth}
              onNextMonthChange={handleNextMonth}
            />
          </div>

          <MonthlyAmount
            month={month}
            year={year}
            amount={amount?.float}
            monthlyAmount={handleMonthlyAmount()}
            monthlyDeposits={monthlyDeposits}
          />

          <button
            type="submit"
            className="w-full sm:max-w-xs !mt-8 p-4 self-center rounded-full transition-shadow bg-brand-primary text-neutral-white hover:shadow-md hover:shadow-blue-300"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

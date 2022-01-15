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
    <div className="flex flex-col items-center">
      <h3 className="text-brand-primary text-xl pb-6 pt-12">
        Let&apos;s plan your{' '}
        <strong className="font-semibold">saving goal.</strong>
      </h3>

      <div className="sm:w-[40rem] pt-8 p-10 bg-neutral-white rounded-lg shadow-level4">
        <form
          className="flex flex-col flex-wrap space-y-6"
          onSubmit={handleSubmit}
        >
          <section className="flex space-x-4">
            <img src={buyAHouseImg} alt="Buy a house" />
            <div className="space-y-1">
              <h1 className="text-2xl font-display font-medium text-blue-gray-800">
                Buy a house
              </h1>
              <h2 className="text-blue-gray-400">Saving Goal</h2>
            </div>
          </section>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col flex-1">
              <CurrencyInput
                id="amount"
                label="Total amount"
                icon={
                  <BsCurrencyDollar size={24} className="text-blue-gray-100" />
                }
                onValueChange={(_, __, values) => setAmount(values as Amount)}
              />
            </div>

            <ReachDateInput
              id="reach-date"
              label="Reach goal by"
              month={month}
              year={year}
              isDisabled={shouldHandlePrevMonth}
              onPrevMonthChange={handlePrevMonth}
              onNextMonthChange={handleNextMonth}
              className="flex flex-col flex-1"
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
            className="sm:max-w-xs w-full mx-auto p-4 !mt-8 rounded-full bg-brand-primary text-neutral-white transition-shadow hover:shadow-md hover:shadow-blue-300"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

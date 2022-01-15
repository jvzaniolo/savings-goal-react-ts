import { FormEvent, useState } from 'react';
import { useReachDate } from '../contexts/ReachDateContext';
import { ReachDate } from './ReachDate';
import { MonthlyAmount } from './MonthlyAmount';
import { CurrencyInput } from '../layout/CurrencyInput';
import { BsCurrencyDollar } from 'react-icons/bs';

import buyAHouseImg from '../assets/icons/buy-a-house.svg';

interface Amount {
  float: number;
  formatted: string;
  value: string;
}

export function SavingGoal(): JSX.Element {
  const [amount, setAmount] = useState<Amount | undefined>(undefined);
  const { month, year, monthlyDeposits } = useReachDate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function handleMonthlyAmount(): number | undefined {
    if (!amount) return;

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
              <h1 className="text-2xl font-display font-medium text-blue-gray-900">
                Buy a house
              </h1>
              <h2 className="text-blue-gray-400">Saving Goal</h2>
            </div>
          </section>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <CurrencyInput
                id="amount"
                type="text"
                label="Total amount"
                icon={<BsCurrencyDollar size={24} />}
                onValueChange={(_, __, values) => setAmount(values as Amount)}
              />
            </div>

            <div className="flex-1">
              <span className="mb-1 text-sm text-blue-gray-900">
                Reach goal by
              </span>
              <ReachDate className="" />
            </div>
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
            className="sm:max-w-xs w-full mx-auto p-4 !mt-8 rounded-full bg-blue-800 text-neutral-white"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

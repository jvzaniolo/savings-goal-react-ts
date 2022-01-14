import { ChangeEvent, FormEvent, useState } from 'react';
import { useReachDate } from '../contexts/ReachDateContext';
import { ReachDate } from './ReachDate';
import { formatCurrency } from '../utils/currency';
import { getMonthlyDeposits } from '../core/savingGoalCore';

import buyAHouseImg from '../assets/icons/buy-a-house.svg';

export function SavingGoal(): JSX.Element {
  const [amount, setAmount] = useState(0);
  const { month, monthIndex, year } = useReachDate();
  const monthlyDeposits = getMonthlyDeposits(monthIndex);

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(parseInt(event.target.value));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function handleMonthlyAmount() {
    return formatCurrency(amount > 0 ? amount / monthlyDeposits : 0);
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-brand-primary text-xl pb-6 pt-12">
        Let&apos;s plan your{' '}
        <strong className="font-semibold">saving goal.</strong>
      </h3>

      <div className="max-w-xl pt-8 p-10 bg-neutral-white rounded-lg shadow-level4">
        <form className="flex flex-wrap space-y-6" onSubmit={handleSubmit}>
          <section className="flex space-x-4">
            <img src={buyAHouseImg} alt="Buy a house" />
            <div className="space-y-1">
              <h1 className="text-2xl font-medium text-blue-gray-900">
                Buy a house
              </h1>
              <h2 className="text-blue-gray-400">Saving Goal</h2>
            </div>
          </section>

          <div className="w-full flex flex-wrap gap-4 items-end">
            <div className="flex flex-col flex-1">
              <label
                htmlFor="amount"
                className="mb-1 text-sm text-blue-gray-900"
              >
                Total amount
              </label>
              <input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="flex-1 p-3 text-2xl rounded border border-blue-gray-50 text-blue-gray-600"
              />
            </div>

            <div className="flex flex-col flex-1">
              <span className="mb-1 text-sm text-blue-gray-900">
                Reach goal by
              </span>
              <ReachDate className="max-h-[58px] min-w-[190px]" />
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-blue-gray-50">
            <p className="flex justify-between py-6 px-8 items-center">
              <span className="text-xl text-blue-gray-900">Monthly amount</span>
              <span className="text-[32px] text-brand-secondary font-bold">
                {handleMonthlyAmount()}
              </span>
            </p>

            <div className="py-6 px-8 bg-blue-gray-10">
              <span className="text-blue-gray-900 text-sm">
                You&apos;re planning{' '}
                <strong className="font-semibold">
                  {monthlyDeposits} monthly deposits
                </strong>
                &nbsp;to reach your{' '}
                <strong className="font-semibold">
                  {formatCurrency(amount)}
                </strong>{' '}
                goal by&nbsp;
                <strong className="font-semibold">
                  {month} {year}.
                </strong>
              </span>
            </div>
          </div>

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

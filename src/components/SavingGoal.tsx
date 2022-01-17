import { useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Button } from '../layout/Button';
import { useSavingGoal } from '../hooks/useSavingGoal';
import { ReachDateInput } from './SavingGoal/ReachDateInput';
import { CurrencyInput } from './SavingGoal/CurrencyInput';
import { MonthlyAmountSummary } from './SavingGoal/MonthlyAmountSummary';

import buyAHouseImg from '../assets/icons/buy-a-house.svg';

export function SavingGoal(): JSX.Element {
  const [amount, setAmount] = useState<number>();
  const {
    reachDate,
    canDecreaseMonth,
    monthlyDeposits,
    handleMonthDecrease,
    handleMonthIncrease,
  } = useSavingGoal();

  return (
    <div className="sm:max-w-[40rem]">
      <h3 className="mb-6 text-center text-lg sm:text-xl text-brand-primary">
        Let&apos;s plan your{' '}
        <strong className="font-semibold">saving goal.</strong>
      </h3>

      <div className="pt-8 p-10 rounded-lg shadow-level4 bg-neutral-white">
        <form
          onSubmit={(e) => e.preventDefault()}
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
              icon={<BsCurrencyDollar size={24} />}
              onValueChange={(value) => setAmount(parseFloat(String(value)))}
            />

            <ReachDateInput
              id="reach-date"
              label="Reach goal by"
              value={reachDate}
              isDisabled={!canDecreaseMonth}
              onMonthDecrease={handleMonthDecrease}
              onMonthIncrease={handleMonthIncrease}
            />
          </div>

          <MonthlyAmountSummary
            reachDate={reachDate}
            amount={amount}
            monthlyDeposits={monthlyDeposits}
          />

          <Button
            type="submit"
            className="w-full sm:max-w-xs !mt-8 self-center"
          >
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
}

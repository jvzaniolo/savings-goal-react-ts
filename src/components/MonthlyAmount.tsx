interface MonthlyAmountProps {
  month: string;
  year: number;
  amount: number | undefined;
  monthlyAmount: number | undefined;
  monthlyDeposits: number;
}

export function MonthlyAmount({
  month,
  year,
  amount,
  monthlyAmount,
  monthlyDeposits,
}: MonthlyAmountProps) {
  return (
    <div className="flex flex-col rounded-lg border border-blue-gray-50">
      <p className="flex justify-between py-6 px-8 items-center">
        <span className="text-xl text-blue-gray-900">Monthly amount</span>
        <span className="text-[32px] text-brand-secondary font-display font-bold block overflow-hidden whitespace-nowrap text-ellipsis">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(monthlyAmount || 0)}
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
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(amount || 0)}
          </strong>{' '}
          goal by&nbsp;
          <strong className="font-semibold">
            {month} {year}.
          </strong>
        </span>
      </div>
    </div>
  );
}

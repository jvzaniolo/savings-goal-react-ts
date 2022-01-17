interface MonthlyAmountSummaryProps {
  reachDate: string;
  amount: number | undefined;
  monthlyDeposits: number;
}

export function MonthlyAmountSummary({
  reachDate,
  amount,
  monthlyDeposits,
}: MonthlyAmountSummaryProps) {
  function getMonthlyAmountFormatted(): string {
    let monthlyAmount = 0;

    if (amount) {
      monthlyAmount = amount > 0 ? amount / monthlyDeposits : 0;
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(monthlyAmount);
  }

  return (
    <div className="flex flex-col rounded-lg border border-blue-gray-50">
      <p className="py-6 px-8 flex justify-between items-center">
        <span className="text-lg sm:text-xl text-blue-gray-800">
          Monthly amount
        </span>
        <span
          className="max-w-xs block font-display font-medium text-2xl sm:text-3xl text-ellipsis overflow-hidden whitespace-nowrap text-brand-secondary"
          title={getMonthlyAmountFormatted()}
        >
          {getMonthlyAmountFormatted()}
        </span>
      </p>

      <div className="py-6 px-8 bg-blue-gray-10">
        <span
          className="text-xs sm:text-sm text-blue-gray-900"
          data-testid="monthly-amount-summary"
        >
          You&apos;re planning&nbsp;
          <strong className="font-semibold">
            {monthlyDeposits} monthly deposits&nbsp;
          </strong>
          to reach your&nbsp;
          <strong className="font-semibold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(amount || 0)}
          </strong>
          &nbsp;goal by&nbsp;
          <strong className="font-semibold">{reachDate}.</strong>
        </span>
      </div>
    </div>
  );
}

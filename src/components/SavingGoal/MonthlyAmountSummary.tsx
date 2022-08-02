function getFormattedDate(reachDate: Date) {
  return reachDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

function getMonthlyDeposits(reachDate: Date) {
  const now = new Date()
  const differenceInMonths =
    reachDate.getMonth() -
    now.getMonth() +
    12 * (reachDate.getFullYear() - now.getFullYear())

  return differenceInMonths + 1
}

function formatMonthlyAmount(amount: string, monthlyDeposits: number): string {
  let monthlyAmount = 0

  if (amount) {
    monthlyAmount =
      parseFloat(amount) > 0 ? parseFloat(amount) / monthlyDeposits : 0
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(monthlyAmount)
}

export function MonthlyAmountSummary({
  reachDate,
  amount,
}: {
  reachDate: Date
  amount: string
}) {
  const monthlyDeposits = getMonthlyDeposits(reachDate)

  return (
    <div className="flex flex-col rounded-lg border border-blue-gray-50">
      <p className="py-6 px-8 flex justify-between items-center">
        <span className="text-lg sm:text-xl text-blue-gray-800">
          Monthly amount
        </span>
        <span
          className="max-w-xs block font-display font-medium text-2xl sm:text-3xl text-ellipsis overflow-hidden whitespace-nowrap text-brand-secondary"
          title={formatMonthlyAmount(amount, monthlyDeposits)}
        >
          {formatMonthlyAmount(amount, monthlyDeposits)}
        </span>
      </p>

      <div className="py-6 px-8 bg-blue-gray-10">
        <span className="text-xs sm:text-sm text-blue-gray-900">
          You&apos;re planning&nbsp;
          <strong className="font-semibold">
            {monthlyDeposits} monthly deposits&nbsp;
          </strong>
          to reach your&nbsp;
          <strong className="font-semibold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(parseFloat(amount) || 0)}
          </strong>
          &nbsp;goal by&nbsp;
          <strong className="font-semibold">
            {getFormattedDate(reachDate)}.
          </strong>
        </span>
      </div>
    </div>
  )
}

interface MonthlyAmountSummaryProps {
  reachDate: string
  amount: string
}

function getFormattedDate(reachDate: string) {
  const [year, month] = reachDate.split('-')

  const date = new Date(Number(year), Number(month) - 1)

  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function getMonthlyDeposits(reachDate: string) {
  const [year, month] = reachDate.split('-')

  const d1 = new Date(Number(year), Number(month) - 1)
  const d2 = new Date()

  const months = (d1.getFullYear() - d2.getFullYear()) * 12

  return months + Math.abs(d1.getMonth() - d2.getMonth()) + 1
}

function getMonthlyAmountFormatted(
  amount: string,
  monthlyDeposits: number
): string {
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
}: MonthlyAmountSummaryProps) {
  const monthlyDeposits = getMonthlyDeposits(reachDate)

  return (
    <div className="flex flex-col rounded-lg border border-blue-gray-50">
      <p className="py-6 px-8 flex justify-between items-center">
        <span className="text-lg sm:text-xl text-blue-gray-800">
          Monthly amount
        </span>
        <span
          className="max-w-xs block font-display font-medium text-2xl sm:text-3xl text-ellipsis overflow-hidden whitespace-nowrap text-brand-secondary"
          title={getMonthlyAmountFormatted(amount, monthlyDeposits)}
        >
          {getMonthlyAmountFormatted(amount, monthlyDeposits)}
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

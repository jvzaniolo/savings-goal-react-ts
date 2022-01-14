export function getMonthlyDeposits(selectedMonth: number) {
  return selectedMonth - new Date().getMonth() + 1;
}

/* eslint-disable no-irregular-whitespace */
import { MonthlyAmount } from './MonthlyAmount';
import { render, screen } from '@testing-library/react';

const monthlyAmountProps = {
  month: 'February',
  year: 2022,
  amount: 10000.0,
  monthlyDeposits: 2,
  monthlyAmount: 10000.0 / 2,
};

describe('Monthly Amount', () => {
  it('should be able to display the monthly amount in USD currency format', () => {
    render(<MonthlyAmount {...monthlyAmountProps} />);

    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
  });

  it('should be able to display a monthly amount summary', () => {
    render(<MonthlyAmount {...monthlyAmountProps} />);

    expect(screen.getByTestId('monthly-amount-summary')).toMatchInlineSnapshot(`
      <span
        class="text-xs sm:text-sm text-blue-gray-900"
        data-testid="monthly-amount-summary"
      >
        You're planning 
        <strong
          class="font-semibold"
        >
          2
           monthly deposits 
        </strong>
        to reach your 
        <strong
          class="font-semibold"
        >
          $10,000.00
        </strong>
         goal by 
        <strong
          class="font-semibold"
        >
          February
           
          2022
          .
        </strong>
      </span>
    `);
  });
});

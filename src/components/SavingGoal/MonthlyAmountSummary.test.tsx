/* eslint-disable no-irregular-whitespace */
import { MonthlyAmountSummary } from './MonthlyAmountSummary';
import { render, screen } from '@testing-library/react';

describe('Monthly Amount Summary', () => {
  it('should be able to display the monthly amount in USD currency format', () => {
    render(<MonthlyAmountSummary reachDate="2022-03-01" amount={10000.0} />);

    expect(screen.getByText('$3,333.33')).toBeInTheDocument();
  });

  it('should be able to display a monthly amount summary', () => {
    render(<MonthlyAmountSummary reachDate="2022-03-01" amount={10000.0} />);

    expect(screen.getByTestId('monthly-amount-summary')).toMatchInlineSnapshot(`
      <span
        class="text-xs sm:text-sm text-blue-gray-900"
        data-testid="monthly-amount-summary"
      >
        You're planning 
        <strong
          class="font-semibold"
        >
          3
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
          March 2022
          .
        </strong>
      </span>
    `);
  });
});

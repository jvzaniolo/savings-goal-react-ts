/* eslint-disable no-irregular-whitespace */
import { render, screen, fireEvent } from '@testing-library/react';
import { SavingGoal } from './SavingGoal';

describe('SavingGoal', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 0));
  });

  it('should render the component with initial data', () => {
    render(<SavingGoal />);

    const amountInput = screen.getByLabelText('Total amount');
    const reachDateInput = screen.getByTestId('reach-date-hidden-input');
    const monthlyAmountSummary = screen.getByTestId('monthly-amount-summary');

    expect(amountInput).toHaveValue('');
    expect(reachDateInput).toHaveValue('2022-01-01'); // initial Date
    expect(screen.getAllByText('$0.00')).toHaveLength(2); // One for strong text and one for monthly summary
    expect(monthlyAmountSummary).toMatchInlineSnapshot(`
      <span
        class="text-xs sm:text-sm text-blue-gray-900"
        data-testid="monthly-amount-summary"
      >
        You're planning 
        <strong
          class="font-semibold"
        >
          1
           monthly deposits 
        </strong>
        to reach your 
        <strong
          class="font-semibold"
        >
          $0.00
        </strong>
         goal by 
        <strong
          class="font-semibold"
        >
          January 2022
          .
        </strong>
      </span>
    `);
  });

  it('should render the component with data from the inputs', () => {
    render(<SavingGoal />);

    const amountInput = screen.getByLabelText('Total amount');
    const reachDateInput = screen.getByTestId('reach-date-hidden-input');
    const monthlyAmountSummary = screen.getByTestId('monthly-amount-summary');
    const reachDateIncrementBtn = screen.getByTestId('reach-date-right-button');

    fireEvent.change(amountInput, { target: { value: '1300450.56' } });

    // starts on January 2022
    fireEvent.click(reachDateIncrementBtn); // increase to February 2022
    fireEvent.click(reachDateIncrementBtn); // increase to March 2022

    expect(amountInput).toHaveValue('1,300,450.56');
    expect(reachDateInput).toHaveValue('2022-03-01');
    expect(screen.getByText('$1,300,450.56')).toBeInTheDocument();
    expect(monthlyAmountSummary).toMatchInlineSnapshot(`
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
          $1,300,450.56
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

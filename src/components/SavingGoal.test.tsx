import { SavingGoal } from './SavingGoal';
import { fireEvent, render, screen } from '@testing-library/react';

const mockedHandleMonthDecrease = jest.fn();
const mockedHandleMonthIncrease = jest.fn();

jest.mock('../hooks/useSavingGoal', () => {
  return {
    useSavingGoal() {
      return {
        reachDate: {
          month: 'January',
          year: 2022,
        },
        monthlyDeposits: 1,
        canDecreaseMonth: false,
        handleMonthDecrease: mockedHandleMonthDecrease,
        handleMonthIncrease: mockedHandleMonthIncrease,
      };
    },
  };
});

describe.only('Saving Goal', () => {
  it('should render the Saving Goal component', () => {
    const component = render(<SavingGoal />);

    expect(component).toMatchSnapshot();
  });

  it('should be able to increase a month by one', () => {
    render(<SavingGoal />);

    fireEvent.click(screen.getByTestId('right-button'));

    expect(mockedHandleMonthIncrease).toHaveBeenCalledTimes(1);

    expect(screen.queryByText('February')).toBeInTheDocument();
  });
});

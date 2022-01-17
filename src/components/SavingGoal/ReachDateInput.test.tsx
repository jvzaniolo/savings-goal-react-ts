import { ReachDateInput } from './ReachDateInput';
import { render, fireEvent, screen } from '@testing-library/react';
import { useSavingGoal } from '../../hooks/useSavingGoal';

let results: ReturnType<typeof useSavingGoal>;

function ReachDateInputHookWrapper() {
  results = useSavingGoal();

  return (
    <ReachDateInput
      id="reach-date"
      label="Reach goal by"
      value={results.reachDate}
      disabled={!results.canDecreaseMonth}
      onMonthDecrease={results.handleMonthDecrease}
      onMonthIncrease={results.handleMonthIncrease}
    />
  );
}

describe('ReachDateInput', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 0));
  });

  it('should be able to render the component with initial data', () => {
    render(<ReachDateInputHookWrapper />);

    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('should start with left button disabled', () => {
    render(<ReachDateInputHookWrapper />);

    const leftButton = screen.getByTestId('reach-date-left-button');

    expect(leftButton.classList).toContain('cursor-not-allowed');
  });

  describe('onClick', () => {
    it('should be able to INCREASE month by one when clicking right button', () => {
      render(<ReachDateInputHookWrapper />);

      fireEvent.click(screen.getByTestId('reach-date-right-button'));

      expect(screen.getByText('February')).toBeInTheDocument();
      expect(results).toMatchObject({
        reachDate: {
          month: 'February',
          year: 2022,
        },
        canDecreaseMonth: true,
      });
    });

    it('should be able to DECREASE month by one when clicking left button', () => {
      render(<ReachDateInputHookWrapper />);

      // Month is at February, so clicking left button should decrease month to January
      fireEvent.click(screen.getByTestId('reach-date-left-button'));

      expect(screen.getByText('January')).toBeInTheDocument();
      expect(results).toMatchObject({
        reachDate: {
          month: 'January',
          year: 2022,
        },
        canDecreaseMonth: false,
      });
    });
  });

  describe('onKeydown', () => {
    it('should be able to INCREASE month by one when clicking right arrow on keyboard', () => {
      render(<ReachDateInputHookWrapper />);

      fireEvent.focus(screen.getByTestId('reach-date-hidden-input'));

      fireEvent.keyDown(screen.getByTestId('reach-date-right-button'), {
        key: 'ArrowRight',
        code: 'ArrowRight',
        charCode: 0,
        keyCode: 39,
      });

      expect(screen.getByText('February')).toBeInTheDocument();
      expect(results).toMatchObject({
        reachDate: {
          month: 'February',
          year: 2022,
        },
        canDecreaseMonth: true,
      });
    });

    it('should be able to DECREASE month by one when clicking left arrow on keyboard', () => {
      render(<ReachDateInputHookWrapper />);

      fireEvent.focus(screen.getByTestId('reach-date-hidden-input'));

      fireEvent.keyDown(screen.getByTestId('reach-date-left-button'), {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
        charCode: 0,
        keyCode: 37,
      });

      expect(screen.getByText('January')).toBeInTheDocument();
      expect(results).toMatchObject({
        reachDate: {
          month: 'January',
          year: 2022,
        },
        canDecreaseMonth: false,
      });
    });
  });

  describe('edge cases', () => {
    describe('onClick', () => {
      it('should be able to INCREASE year by one when increasing from December', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11));

        render(<ReachDateInputHookWrapper />);

        fireEvent.click(screen.getByTestId('reach-date-right-button'));

        expect(screen.getByText('January')).toBeInTheDocument();
        expect(results).toMatchObject({
          reachDate: {
            month: 'January',
            year: 2023,
          },
          canDecreaseMonth: true,
        });
      });

      it('should be able to DECREASE year by one when decreasing from January', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11));

        render(<ReachDateInputHookWrapper />);

        fireEvent.click(screen.getByTestId('reach-date-right-button'));
        // Year is now at 2023, so clicking left button should decrease year to 2022

        expect(results).toMatchObject({
          reachDate: {
            month: 'January',
            year: 2023,
          },
          canDecreaseMonth: true,
        });

        fireEvent.click(screen.getByTestId('reach-date-left-button'));

        expect(screen.getByText('December')).toBeInTheDocument();
        expect(results).toMatchObject({
          reachDate: {
            month: 'December',
            year: 2022,
          },
          canDecreaseMonth: false,
        });
      });
    });

    describe('onKeydown', () => {
      it('should be able to INCREASE year by one when increasing from December with right arrow on keyboard', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11));

        render(<ReachDateInputHookWrapper />);

        fireEvent.focus(screen.getByTestId('reach-date-hidden-input'));

        fireEvent.keyDown(screen.getByTestId('reach-date-right-button'), {
          key: 'ArrowRight',
          code: 'ArrowRight',
          charCode: 0,
          keyCode: 39,
        });

        expect(screen.getByText('January')).toBeInTheDocument();
        expect(results).toMatchObject({
          reachDate: {
            month: 'January',
            year: 2023,
          },
          canDecreaseMonth: true,
        });
      });

      it('should be able to DECREASE year by one when decreasing from January with left arrow on keyboard', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11));

        render(<ReachDateInputHookWrapper />);

        fireEvent.focus(screen.getByTestId('reach-date-hidden-input'));

        fireEvent.keyDown(screen.getByTestId('reach-date-right-button'), {
          key: 'ArrowRight',
          code: 'ArrowRight',
          charCode: 0,
          keyCode: 39,
        });
        // Year is now at 2023, so clicking left button should decrease year to 2022

        expect(results).toMatchObject({
          reachDate: {
            month: 'January',
            year: 2023,
          },
          canDecreaseMonth: true,
        });

        fireEvent.keyDown(screen.getByTestId('reach-date-left-button'), {
          key: 'ArrowLeft',
          code: 'ArrowLeft',
          charCode: 0,
          keyCode: 37,
        });

        expect(screen.getByText('December')).toBeInTheDocument();
        expect(results).toMatchObject({
          reachDate: {
            month: 'December',
            year: 2022,
          },
          canDecreaseMonth: false,
        });
      });
    });
  });
});

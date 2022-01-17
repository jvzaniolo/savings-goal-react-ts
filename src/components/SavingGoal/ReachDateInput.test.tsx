import { ReachDateInput } from './ReachDateInput';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

const reachDateInputProps = {
  month: 'January',
  year: 2022,
  isDisabled: true,
  onNextMonthChange: jest.fn(),
  onPrevMonthChange: jest.fn(),
};

describe('ReachDateInput', () => {
  it('should be able to render the component with initial data', () => {
    render(<ReachDateInput {...reachDateInputProps} />);

    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('should start with left button disabled', () => {
    render(<ReachDateInput {...reachDateInputProps} />);

    expect(screen.getByTestId('left-button').classList).toContain(
      'cursor-not-allowed'
    );
  });

  describe('onClick', () => {
    it('should be able to call next month change when clicking right button', async () => {
      render(<ReachDateInput {...reachDateInputProps} />);

      fireEvent.click(screen.getByTestId('right-button'));

      await waitFor(() => screen.getByText('February'));

      expect(reachDateInputProps.onNextMonthChange).toHaveBeenCalledTimes(1);
    });

    it('should be able to call previous month change when clicking left button', async () => {
      render(<ReachDateInput {...reachDateInputProps} />);

      fireEvent.click(screen.getByTestId('left-button'));

      expect(reachDateInputProps.onPrevMonthChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('onKeydown', () => {
    beforeEach(() => {
      render(<ReachDateInput {...reachDateInputProps} />);

      screen.getByTestId('hidden-input').focus();
    });

    it('should be able to call next month change when clicking right arrow on keyboard', async () => {
      fireEvent.keyDown(screen.getByTestId('right-button'), {
        key: 'ArrowRight',
      });

      expect(reachDateInputProps.onNextMonthChange).toHaveBeenCalledTimes(1);
    });

    it('should be able to call previous month change when clicking left arrow on keyboard', async () => {
      fireEvent.keyDown(screen.getByTestId('left-button'), {
        key: 'ArrowLeft',
      });

      expect(reachDateInputProps.onPrevMonthChange).toHaveBeenCalledTimes(1);
    });
  });
});

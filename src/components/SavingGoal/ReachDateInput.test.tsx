import { ReachDateInput } from './ReachDateInput';
import { render, fireEvent, screen } from '@testing-library/react';

const reachDateInputProps = {
  value: { month: 'January', year: 2022 },
  isDisabled: true,
  id: 'reach-date',
  label: 'label',
  onMonthDecrease: jest.fn(),
  onMonthIncrease: jest.fn(),
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
    it('should be able to increase month when clicking right button', async () => {
      render(<ReachDateInput {...reachDateInputProps} />);

      fireEvent.click(screen.getByTestId('right-button'));

      expect(reachDateInputProps.onMonthIncrease).toHaveBeenCalledTimes(1);
    });

    it('should be able to decrease month when clicking left button', async () => {
      render(<ReachDateInput {...reachDateInputProps} />);

      fireEvent.click(screen.getByTestId('left-button'));

      expect(reachDateInputProps.onMonthDecrease).toHaveBeenCalledTimes(1);
    });
  });

  describe('onKeydown', () => {
    it('should be able to increase month when clicking right arrow on keyboard', async () => {
      render(<ReachDateInput {...reachDateInputProps} />);

      fireEvent.focus(screen.getByTestId('hidden-input'));

      fireEvent.keyDown(screen.getByTestId('right-button'), {
        key: 'ArrowRight',
        code: 'ArrowRight',
        charCode: 0,
        keyCode: 39,
      });

      expect(reachDateInputProps.onMonthIncrease).toHaveBeenCalledTimes(1);
    });

    it('should be able to decrease month when clicking left arrow on keyboard', async () => {
      render(<ReachDateInput {...reachDateInputProps} />);

      fireEvent.focus(screen.getByTestId('hidden-input'));

      fireEvent.keyDown(screen.getByTestId('left-button'), {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
        charCode: 0,
        keyCode: 37,
      });

      expect(reachDateInputProps.onMonthDecrease).toHaveBeenCalledTimes(1);
    });
  });
});

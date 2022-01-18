import { ReachDateInput } from './ReachDateInput';
import { render, fireEvent, screen } from '@testing-library/react';

describe('ReachDateInput', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 0));
  });

  it('should be able to render the component with initial data', () => {
    render(<ReachDateInput />);

    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('should start with left button disabled', () => {
    render(<ReachDateInput />);

    const leftButton = screen.getByTestId('reach-date-left-button');

    expect(leftButton.classList).toContain('cursor-not-allowed');
  });

  describe('onClick', () => {
    it('should be able to INCREASE month by one when clicking the right button', () => {
      const onChange = jest.fn();
      render(
        <ReachDateInput
          id="reach-date"
          label="Reach goal by"
          onChange={onChange}
        />
      );

      fireEvent.click(screen.getByTestId('reach-date-right-button'));

      expect(screen.getByText('February')).toBeInTheDocument();
      expect(onChange).toHaveBeenLastCalledWith('2022-02-01');
    });

    it('should be able to DECREASE month by one when clicking left button', () => {
      const onChange = jest.fn();
      render(
        <ReachDateInput
          id="reach-date"
          label="Reach goal by"
          onChange={onChange}
        />
      );

      // Month is at February, so clicking left button should decrease to January
      fireEvent.click(screen.getByTestId('reach-date-left-button'));

      expect(screen.getByText('January')).toBeInTheDocument();
      expect(onChange).toHaveBeenLastCalledWith('2022-01-01');
    });
  });

  describe('onKeydown', () => {
    it('should be able to INCREASE month by one when clicking right arrow on keyboard', () => {
      const onChange = jest.fn();
      render(
        <ReachDateInput
          id="reach-date"
          label="Reach goal by"
          onChange={onChange}
        />
      );

      fireEvent.focus(screen.getByTestId('reach-date-hidden-input'));

      fireEvent.keyDown(screen.getByTestId('reach-date-right-button'), {
        key: 'ArrowRight',
        code: 'ArrowRight',
        charCode: 0,
        keyCode: 39,
      });

      expect(screen.getByText('February')).toBeInTheDocument();
      expect(onChange).toHaveBeenLastCalledWith('2022-02-01');
    });

    it('should be able to DECREASE month by one when clicking left arrow on keyboard', () => {
      const onChange = jest.fn();
      render(
        <ReachDateInput
          id="reach-date"
          label="Reach goal by"
          onChange={onChange}
        />
      );

      fireEvent.focus(screen.getByTestId('reach-date-hidden-input'));

      fireEvent.keyDown(screen.getByTestId('reach-date-left-button'), {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
        charCode: 0,
        keyCode: 37,
      });

      expect(screen.getByText('January')).toBeInTheDocument();
      expect(onChange).toHaveBeenLastCalledWith('2022-01-01');
    });
  });

  describe('edge cases', () => {
    describe('onClick', () => {
      it('should be able to INCREASE year by one when increasing from December', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11));

        const onChange = jest.fn();
        render(
          <ReachDateInput
            id="reach-date"
            label="Reach goal by"
            onChange={onChange}
          />
        );

        fireEvent.click(screen.getByTestId('reach-date-right-button'));

        expect(screen.getByText('January')).toBeInTheDocument();
        expect(onChange).toHaveBeenLastCalledWith('2023-01-01');
      });

      it('should be able to DECREASE year by one when decreasing from January', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11));

        const onChange = jest.fn();
        render(
          <ReachDateInput
            id="reach-date"
            label="Reach goal by"
            onChange={onChange}
          />
        );

        fireEvent.click(screen.getByTestId('reach-date-right-button'));
        // Year is now at 2023, so clicking left button should decrease year to 2022

        expect(onChange).toHaveBeenLastCalledWith('2023-01-01');

        fireEvent.click(screen.getByTestId('reach-date-left-button'));

        expect(screen.getByText('December')).toBeInTheDocument();
        expect(onChange).toHaveBeenLastCalledWith('2022-12-01');
      });
    });

    describe('onKeydown', () => {
      it('should be able to INCREASE year by one when increasing from December with right arrow on keyboard', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11));

        const onChange = jest.fn();
        render(
          <ReachDateInput
            id="reach-date"
            label="Reach goal by"
            onChange={onChange}
          />
        );

        fireEvent.focus(screen.getByTestId('reach-date-hidden-input'));

        fireEvent.keyDown(screen.getByTestId('reach-date-right-button'), {
          key: 'ArrowRight',
          code: 'ArrowRight',
          charCode: 0,
          keyCode: 39,
        });

        expect(screen.getByText('January')).toBeInTheDocument();
        expect(onChange).toHaveBeenLastCalledWith('2023-01-01');
      });

      it('should be able to DECREASE year by one when decreasing from January with left arrow on keyboard', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2022, 11));

        const onChange = jest.fn();
        render(
          <ReachDateInput
            id="reach-date"
            label="Reach goal by"
            onChange={onChange}
          />
        );

        fireEvent.focus(screen.getByTestId('reach-date-hidden-input'));

        fireEvent.keyDown(screen.getByTestId('reach-date-right-button'), {
          key: 'ArrowRight',
          code: 'ArrowRight',
          charCode: 0,
          keyCode: 39,
        });
        // Year is now at 2023, so clicking left button should decrease year to 2022

        expect(onChange).toHaveBeenLastCalledWith('2023-01-01');

        fireEvent.keyDown(screen.getByTestId('reach-date-left-button'), {
          key: 'ArrowLeft',
          code: 'ArrowLeft',
          charCode: 0,
          keyCode: 37,
        });

        expect(screen.getByText('December')).toBeInTheDocument();
        expect(onChange).toHaveBeenLastCalledWith('2022-12-01');
      });
    });
  });
});

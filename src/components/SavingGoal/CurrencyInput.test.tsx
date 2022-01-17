import { CurrencyInput } from './CurrencyInput';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Currency Input', () => {
  it('should be able to display the text in currency format', () => {
    render(
      <CurrencyInput
        id="currency"
        label="Total amount"
        onValueChange={jest.fn()}
      />
    );

    const currencyInput = screen.getByLabelText(/total amount/i);

    fireEvent.change(currencyInput, {
      target: {
        value: '3500.45',
      },
    });

    expect(currencyInput).toHaveValue('3,500.45');
  });

  it('should be able to call the change function with the correct parsed values', () => {
    const onValueChange = jest.fn();

    render(
      <CurrencyInput
        id="currency"
        label="Total amount"
        onValueChange={onValueChange}
      />
    );

    const currencyInput = screen.getByLabelText(/total amount/i);

    fireEvent.change(currencyInput, {
      target: {
        value: '3500.45',
      },
    });

    expect(onValueChange).toHaveBeenCalledWith('3500.45', 'currency', {
      float: 3500.45,
      formatted: '3,500.45',
      value: '3500.45',
    });
  });

  it('should NOT be able to allow inputs other than numbers', () => {
    render(
      <CurrencyInput
        id="currency"
        label="Total amount"
        onValueChange={jest.fn()}
      />
    );

    const currencyInput = screen.getByLabelText(/total amount/i);

    fireEvent.change(currencyInput, {
      target: {
        value: 'abc?<>',
      },
    });

    expect(currencyInput).toHaveValue('');
  });

  it('should NOT be able to format more than 2 decimal digits', () => {
    render(
      <CurrencyInput
        id="currency"
        label="Total amount"
        onValueChange={jest.fn()}
      />
    );

    const currencyInput = screen.getByLabelText(/total amount/i);

    fireEvent.change(currencyInput, {
      target: {
        value: '3500.45678',
      },
    });

    expect(currencyInput).toHaveValue('3,500.45');
  });
});

import { CurrencyInput } from './CurrencyInput';
import { fireEvent, render, screen } from '@testing-library/react';

describe.only('Currency Input', () => {
  it('should be able to display the text in currency format', () => {
    render(
      <CurrencyInput id="currency" label="Total amount" onChange={jest.fn()} />
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
    const onChange = jest.fn();

    render(
      <CurrencyInput id="currency" label="Total amount" onChange={onChange} />
    );

    const currencyInput = screen.getByLabelText(/total amount/i);

    fireEvent.change(currencyInput, {
      target: {
        value: '3500.45',
      },
    });

    expect(onChange).toHaveBeenCalledWith({
      float: 3500.45,
      formatted: '3,500.45',
      value: '3500.45',
    });
    expect(currencyInput).toHaveValue('3,500.45');
  });

  it('should NOT allow inputs other than numbers', () => {
    const onChange = jest.fn();
    render(
      <CurrencyInput id="currency" label="Total amount" onChange={onChange} />
    );

    const currencyInput = screen.getByLabelText(/total amount/i);

    /** Simulate typing experience */
    fireEvent.change(currencyInput, {
      target: {
        value: '1234',
      },
    });
    fireEvent.change(currencyInput, {
      target: {
        value: '1234abc?<>',
      },
    });

    expect(currencyInput).toHaveValue('1,234');
    expect(onChange).toHaveBeenCalledWith({
      float: 1234,
      formatted: '1,234',
      value: '1234',
    });
  });

  it('should NOT allow more than 2 decimal digits by default', () => {
    const onChange = jest.fn();
    render(
      <CurrencyInput id="currency" label="Total amount" onChange={onChange} />
    );

    const currencyInput = screen.getByLabelText(/total amount/i);

    /** Simulate typing experience */
    fireEvent.change(currencyInput, {
      target: {
        value: '3500.45',
      },
    });
    fireEvent.change(currencyInput, {
      target: {
        value: '3500.456',
      },
    });
    fireEvent.change(currencyInput, {
      target: {
        value: '3500.4567',
      },
    });

    expect(currencyInput).toHaveValue('3,500.45');
    expect(onChange).toHaveBeenCalledWith({
      float: 3500.45,
      formatted: '3,500.45',
      value: '3500.45',
    });
  });
});

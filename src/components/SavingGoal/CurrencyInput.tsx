import { forwardRef, useState } from 'react';
import type {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  ForwardRefRenderFunction,
} from 'react';

interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  icon?: ReactNode;
  label?: ReactNode;
  decimalLimit?: number;
  /** Not recommended above 14 */
  /** Breaks because of variable size */
  integerLimit?: number;
  locale?: string;
  onChange?: ({
    value,
    float,
    formatted,
  }: {
    value: string;
    formatted: string;
    float: number;
  }) => void;
}

function getFormattedValue(value: string) {
  return {
    float: parseFloat(value) || 0,
    currencyValue: Intl.NumberFormat('en-US').format(parseFloat(value) || 0),
  };
}

const CurrencyInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  CurrencyInputProps
> = (
  {
    id,
    label,
    className,
    icon,
    onChange,
    decimalLimit = 2,
    /** Not recommended above 14 */
    /** Breaks because of variable size */
    integerLimit = 14,
  },
  ref
) => {
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const valueWithoutComma = e.target.value.replace(/[,\s]/g, '');
    const { float, currencyValue } = getFormattedValue(valueWithoutComma);

    if (!valueWithoutComma) {
      setValue('');
      onChange?.({
        float,
        value: valueWithoutComma,
        formatted: currencyValue,
      });
      return;
    }

    if (isNaN(Number(valueWithoutComma))) return;

    /** Reject typing more than one dot */
    if (valueWithoutComma.split('.').length > 2) return;

    /** Pause checking so the user can type decimals */
    if (valueWithoutComma.endsWith('.')) {
      setValue(e.target.value);
      return;
    }

    const [int, decimal] = valueWithoutComma.split('.');

    if (int.length > integerLimit) return;

    if (decimal?.length > decimalLimit) return;

    setValue(currencyValue);
    onChange?.({
      float,
      value: valueWithoutComma,
      formatted: currencyValue,
    });
  }

  return (
    <div className="flex flex-1 flex-col">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 text-xs sm:text-sm text-blue-gray-800"
        >
          {label}
        </label>
      )}
      <div
        className={`${
          icon ? 'pl-1 p-3' : 'p-3'
        } group h-14 flex flex-nowrap items-center space-x-1 rounded border font-display font-medium text-xl sm:text-2xl border-blue-gray-50 text-blue-gray-600 transition-colors overflow-hidden focus-within:outline focus-within:outline-brand-secondary focus-within:outline-2 ${className}`}
      >
        {icon && (
          <span className="transition-colors text-blue-gray-100 group-focus-within:text-brand-secondary">
            {icon}
          </span>
        )}
        <input
          id={id}
          ref={ref}
          name={id}
          value={value}
          onChange={handleChange}
          className="flex-1 focus:outline-none"
        />
      </div>
    </div>
  );
};

/**
 * Auto formatted currency input field
 *
 * Only works with 'en-US' locale
 *
 * @example
 * <CurrencyInput
 *  id="currency-input"
 *  label="Salary"
 *  icon={<ReactIcon size={} />}
 *  onChange={({ value, formatted, float }) => {
 *    console.log(value); // '3500.45'
 *    console.log(formatted); // '3,500.45'
 *    console.log(float); // 3500.45
 *  }}
 * />
 */
export const CurrencyInput = forwardRef(CurrencyInputComponent);

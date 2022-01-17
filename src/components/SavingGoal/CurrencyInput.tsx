import { ReactNode, forwardRef, ForwardRefRenderFunction } from 'react';
import ReactCurrencyInputField from 'react-currency-input-field';
import { CurrencyInputProps as ReactCurrencyInputProps } from 'react-currency-input-field';

interface CurrencyInputProps extends ReactCurrencyInputProps {
  icon?: ReactNode;
  label?: ReactNode;
}

const CurrencyInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  CurrencyInputProps
> = ({ id, label, className, icon, onValueChange }, ref) => {
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
        <ReactCurrencyInputField
          id={id}
          ref={ref}
          name={id}
          decimalsLimit={2}
          onValueChange={onValueChange}
          className="flex-1 focus:outline-none"
          // Override browser defaults if locale settings are different
          groupSeparator=","
          // Override browser defaults if locale settings are different
          decimalSeparator="."
        />
        {/*
        Would prefer to format it with locale and Intl.NumberFormat
        See open thread https://github.com/cchanxzy/react-currency-input-field/issues/222

        E.g.:
          <ReactCurrencyInputField
            prefix=""
            intlConfig={{ locale: 'en-US', currency: 'USD' }}
          />
        */}
      </div>
    </div>
  );
};

export const CurrencyInput = forwardRef(CurrencyInputComponent);

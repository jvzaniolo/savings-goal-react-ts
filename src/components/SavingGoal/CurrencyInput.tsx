import {
  ReactNode,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import CurrencyInputField from 'react-currency-input-field';
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps';

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: ReactNode;
  onValueChange: (
    value: string | undefined,
    name?: string | undefined,
    values?: CurrencyInputOnChangeValues | undefined
  ) => void;
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
        } group h-14 flex flex-nowrap items-center space-x-1 rounded border font-display font-medium text-xl sm:text-2xl border-blue-gray-50 text-blue-gray-600 transition-colors overflow-hidden focus-within:outline focus-within:outline-blue-600 focus-within:outline-2 ${className}`}
      >
        {icon && (
          <span className="transition-colors group-focus-within:text-blue-700">
            {icon}
          </span>
        )}
        <CurrencyInputField
          id={id}
          ref={ref}
          name={id}
          maxLength={15}
          decimalsLimit={2}
          onValueChange={onValueChange}
          className="flex-1 focus:outline-none"
          data-testid="currency-input"
        />
      </div>
    </div>
  );
};

export const CurrencyInput = forwardRef(CurrencyInputComponent);

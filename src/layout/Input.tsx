import {
  ReactNode,
  forwardRef,
  ForwardRefRenderFunction,
  ChangeEvent,
  InputHTMLAttributes,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: ReactNode;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { id, label, className, icon, onChange, ...rest },
  ref
) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="mb-1 text-sm text-blue-gray-900">
          {label}
        </label>
      )}
      <div
        className={`${
          icon ? 'pl-1 p-3' : 'p-3'
        } group flex flex-nowrap items-center space-x-1 rounded border font-display font-medium text-2xl border-blue-gray-50 text-blue-gray-900 transition-colors overflow-hidden focus-within:outline focus-within:outline-blue-600 focus-within:outline-2 ${className}`}
      >
        {icon && (
          <span className="transition-colors text-blue-gray-50 group-focus-within:text-blue-700">
            {icon}
          </span>
        )}
        <input
          id={id}
          ref={ref}
          name={id}
          {...rest}
          className="flex-1 focus:outline-none"
        />
      </div>
    </>
  );
};

export const Input = forwardRef(InputComponent);

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ type = 'button', className, children }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} p-4 rounded-full transition-shadow bg-brand-primary text-white hover:shadow-md hover:shadow-blue-300`}
    >
      {children}
    </button>
  );
}

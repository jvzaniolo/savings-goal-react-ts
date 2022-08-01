import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

/**
 * Primary button.
 *
 * @example
 * <Button type="submit" className="w-full">Submit</Button>
 */
export function Button({
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} p-4 rounded-full transition-shadow bg-brand-primary text-white hover:shadow-md hover:shadow-blue-300 focus:outline-brand-secondary`}
      {...rest}
    >
      {children}
    </button>
  )
}

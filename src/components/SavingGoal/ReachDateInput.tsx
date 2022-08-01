import { forwardRef, useCallback, useEffect, useState } from 'react'
import type { ForwardRefRenderFunction, ReactNode } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

interface ReachDateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: ReactNode
  onChange?(value: string): void
}

function getYear(monthIndex: number) {
  return new Date().getFullYear() + Math.floor(monthIndex / 12)
}

function formatInputValue(value: { monthCounter: number; year: number }) {
  const monthIndex = value.monthCounter % 12

  const formattedMonthIndex =
    monthIndex < 9 ? `0${monthIndex + 1}` : monthIndex + 1

  return `${value.year}-${formattedMonthIndex}-01`
}

const ReachDateInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  ReachDateInputProps
> = ({ id, className, label, disabled, onChange, ...rest }, ref) => {
  const [hasFocus, setHasFocus] = useState(false)
  const [monthCounter, setMonthCounter] = useState(new Date().getMonth())

  const year = getYear(monthCounter)

  const isDecreaseDisabled =
    monthCounter === new Date().getMonth() && year === new Date().getFullYear()

  const handleDecrease = useCallback(() => {
    if (isDecreaseDisabled) return

    setMonthCounter((counter) => counter - 1)
  }, [isDecreaseDisabled])

  useEffect(() => {
    onChange?.(formatInputValue({ monthCounter, year }))
  }, [monthCounter, onChange, year])

  useEffect(() => {
    function eventListener(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') handleDecrease()
      if (event.key === 'ArrowRight') setMonthCounter((counter) => counter + 1)
    }

    if (hasFocus) {
      window.addEventListener('keydown', eventListener)
    }

    return () => window.removeEventListener('keydown', eventListener)
  }, [hasFocus, handleDecrease])

  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={id} tabIndex={1} className="flex flex-col">
        {label && (
          <span className="mb-1 text-xs sm:text-sm text-blue-gray-800">
            {label}
          </span>
        )}
        <div
          className={`h-14 py-1 px-2 flex rounded border items-center border-blue-gray-50 ${
            hasFocus ? 'outline outline-2 outline-brand-secondary' : ''
          } ${className}`}
        >
          <button
            type="button"
            tabIndex={2}
            onClick={handleDecrease}
            className={`w-10 h-10 text-center rounded-full transition-colors focus:outline-none ${
              isDecreaseDisabled
                ? 'text-blue-gray-50 hover:bg-transparent cursor-not-allowed'
                : 'text-blue-gray-300 hover:bg-slate-100'
            }`}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
          >
            <MdKeyboardArrowLeft size={24} className="m-2" />
          </button>
          <section className="flex flex-col flex-1 items-center text-sm sm:text-base">
            <span className="w-24 font-semibold text-center text-blue-gray-800">
              {new Date(year, monthCounter % 12).toLocaleString('en-US', {
                month: 'long',
              })}
            </span>

            <span className="text-blue-gray-400">{year}</span>
          </section>
          <button
            type="button"
            tabIndex={3}
            onClick={() => setMonthCounter((counter) => counter + 1)}
            className="flex items-center text-center rounded-full transition-colors focus:outline-none text-blue-gray-300 hover:bg-slate-100 "
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
          >
            <MdKeyboardArrowRight size={24} className="m-2 " />
          </button>
        </div>
      </label>
      <input
        ref={ref}
        id={id}
        name={id}
        type="date"
        value={formatInputValue({ monthCounter, year })}
        className="absolute -left-full opacity-0"
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        // fix for HTML element without onChange event
        readOnly
        {...rest}
      />
    </div>
  )
}

/**
 * A custom date input with buttons to increase/decrease the month and year.
 *
 * It receives a value object and returns a Date as string with the format 'yyyy-MM-dd' as a normal date input would.
 *
 * @example
 * formData.get('reach-date') // '2022-01-01'
 *
 * <ReachDateInput
 *  id="reach-date"
 *  label="Reach goal by"
 *  onChange={(value) => {
 *   console.log('reach-date', value);
 *  }}
 * />
 */
export const ReachDateInput = forwardRef(ReachDateInputComponent)

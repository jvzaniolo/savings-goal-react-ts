import { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

function useReachDate({
  value,
  onChange,
}: {
  value: Date
  onChange: (value: Date) => void
}) {
  const [reachDate, setReachDate] = useState(value)

  function getIncrementProps() {
    return {
      onClick: () => {
        const nextDate = new Date(
          reachDate.getFullYear(),
          reachDate.getMonth() + 1
        )
        setReachDate(nextDate)
        onChange(nextDate)
      },
    }
  }

  function getDecrementProps() {
    const prevDate = new Date(reachDate.getFullYear(), reachDate.getMonth() - 1)

    return {
      onClick: () => {
        setReachDate(prevDate)
        onChange(prevDate)
      },
      disabled:
        prevDate.getTime() <
        new Date(new Date().getFullYear(), new Date().getMonth()).getTime(),
    }
  }

  return {
    reachDate,
    getIncrementProps,
    getDecrementProps,
  }
}

export function ReachDate({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label?: string
  value: Date
  onChange: (value: Date) => void
}) {
  const [isFocused, setIsFocused] = useState(false)
  const { reachDate, getIncrementProps, getDecrementProps } = useReachDate({
    value,
    onChange: (value) => onChange(value),
  })

  const dec = getDecrementProps()
  const inc = getIncrementProps()

  useEffect(() => {
    function eventListener(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') !dec.disabled && dec.onClick()
      if (event.key === 'ArrowRight') inc.onClick()
    }

    if (isFocused) {
      window.addEventListener('keydown', eventListener)
    }

    return () => window.removeEventListener('keydown', eventListener)
  }, [dec, inc, isFocused])

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
      <div className="h-14 py-1 px-2 flex rounded border items-center border-blue-gray-50">
        <button
          {...dec}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="button"
          name="decrement-month"
          aria-label="Decrement month"
          className="w-10 aspect-square rounded-full transition-colors text-blue-gray-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-blue-gray-50 disabled:hover:bg-transparent"
        >
          <MdKeyboardArrowLeft size={24} className="m-2" />
        </button>
        <div className="w-24 flex flex-1 flex-col items-center text-sm sm:text-base">
          <span className="font-semibold text-blue-gray-800">
            {reachDate.toLocaleString('default', { month: 'long' })}
          </span>
          <span className="text-blue-gray-400">{reachDate.getFullYear()}</span>
        </div>
        <button
          {...inc}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="button"
          name="increment-month"
          aria-label="Increment month"
          className="w-10 aspect-square rounded-full transition-colors text-blue-gray-300 hover:bg-slate-100 "
        >
          <MdKeyboardArrowRight size={24} className="m-2 " />
        </button>

        <input
          id={id}
          type="hidden"
          name="reach-date"
          value={reachDate.toISOString()}
        />
      </div>
    </div>
  )
}

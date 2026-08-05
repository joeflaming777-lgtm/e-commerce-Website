import { useRef } from 'react'

export default function OTPInput({ value, onChange, length = 6 }) {
  const refs = useRef([])
  const digits = value.padEnd(length, ' ').slice(0, length).split('')

  const setDigit = (i, char) => {
    const chars = value.split('')
    chars[i] = char.replace(/[^0-9]/g, '')
    onChange(chars.join(''))
  }

  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (value[i]) {
        setDigit(i, '')
      } else if (i > 0) {
        setDigit(i - 1, '')
        refs.current[i - 1]?.focus()
      }
    } else if (/^[0-9]$/.test(e.key)) {
      setDigit(i, e.key)
      refs.current[Math.min(i + 1, length - 1)]?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          value={d === ' ' ? '' : d}
          onKeyDown={(e) => handleKey(i, e)}
          onChange={(e) => setDigit(i, e.target.value.slice(-1))}
          onFocus={(e) => e.target.select()}
          aria-label={`Digit ${i + 1}`}
          className={`h-12 w-10 rounded-xl border text-center font-display text-xl font-semibold outline-none transition ${
            value[i] ? 'border-willow bg-white text-espresso' : 'border-espresso/20 bg-white text-espresso'
          } focus:border-espresso focus:ring-2 focus:ring-leather/40`}
        />
      ))}
    </div>
  )
}
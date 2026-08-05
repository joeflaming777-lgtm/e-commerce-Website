import { Minus, Plus } from 'lucide-react'

export default function Quantity({ value, onChange, min = 1, max = 99, className = '' }) {
  return (
    <div className={`inline-flex items-center rounded-full border border-espresso/15 bg-white ${className}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-10 w-10 place-items-center rounded-full text-espresso transition hover:bg-cream disabled:opacity-30"
        disabled={value <= min}
      >
        <Minus size={15} />
      </button>
      <span className="w-10 text-center text-sm font-bold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid h-10 w-10 place-items-center rounded-full text-espresso transition hover:bg-cream disabled:opacity-30"
        disabled={value >= max}
      >
        <Plus size={15} />
      </button>
    </div>
  )
}
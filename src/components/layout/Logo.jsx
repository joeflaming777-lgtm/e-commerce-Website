import { Link } from 'react-router-dom'

export default function Logo({ compact = false, to = '/' }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2.5" aria-label="ThePavilionStore home">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-espresso">
        <svg viewBox="0 0 64 64" className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-12">
          <g transform="rotate(-38 32 36)">
            <rect x="30" y="8" width="5" height="44" rx="2.4" fill="#d4af37" />
            <rect x="28.6" y="44" width="7.8" height="14" rx="3" fill="#f0e2a8" />
          </g>
          <circle cx="48" cy="16" r="8" fill="#f0e2a8" />
          <path d="M45 12 l5 2 -2.6 4.6 -5.4 -1z" fill="#d4af37" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-tight text-espresso">
          ThePavilion
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-leather">
          Store
        </span>
      </span>
    </Link>
  )
}
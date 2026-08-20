import { Link } from 'react-router-dom'

export default function Logo({ compact = false, to = '/' }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-3" aria-label="The Pavilion Store home">
      {/* ── Pavilion mark ── */}
      <span className="relative flex h-10 w-10 items-end justify-center overflow-hidden rounded-xl bg-espresso shadow-sm transition-all duration-500 group-hover:shadow-[0_0_0_3px_#c9a22740]">
        <svg
          viewBox="0 0 48 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-1 h-8 w-8 transition-transform duration-500 group-hover:scale-[1.08]"
          aria-hidden="true"
        >
          {/* Pavilion arch — two slanted roof panels meeting at peak */}
          <path d="M4 22 L24 6 L44 22" stroke="#c9a227" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

          {/* Left pillar */}
          <rect x="7" y="22" width="4" height="16" rx="1" fill="#c9a227" opacity="0.55" />
          {/* Right pillar */}
          <rect x="37" y="22" width="4" height="16" rx="1" fill="#c9a227" opacity="0.55" />

          {/* Cricket bat — center pillar, blade + handle */}
          {/* Blade */}
          <rect x="21.5" y="22" width="5" height="13" rx="1.5" fill="#f4e9c8" />
          {/* Handle */}
          <rect x="22.8" y="10" width="2.4" height="13" rx="1.2" fill="#c9a227" />
          {/* Handle grip wrap lines */}
          <rect x="22.8" y="11.5" width="2.4" height="0.9" rx="0.4" fill="#0f2d52" opacity="0.4" />
          <rect x="22.8" y="14"   width="2.4" height="0.9" rx="0.4" fill="#0f2d52" opacity="0.4" />
          <rect x="22.8" y="16.5" width="2.4" height="0.9" rx="0.4" fill="#0f2d52" opacity="0.4" />

          {/* Cricket ball — bottom centre, terracotta accent */}
          <circle cx="24" cy="40" r="3.2" fill="#c9a227" />
          {/* Ball seam */}
          <path d="M21.5 40 Q24 37.5 26.5 40" stroke="#0f2d52" strokeWidth="0.7" fill="none" strokeLinecap="round" />
          <path d="M21.5 40 Q24 42.5 26.5 40" stroke="#0f2d52" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        </svg>
      </span>

      {/* ── Wordmark ── */}
      {!compact && (
        <span className="flex flex-col leading-none gap-[2px]">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-leather/70">
            The
          </span>
          <span className="font-display text-[16px] font-semibold tracking-[-0.02em] text-espresso leading-none">
            Pavilion
          </span>
          <span className="font-sans text-[8.5px] font-bold uppercase tracking-[0.38em] text-leather/60">
            Store
          </span>
        </span>
      )}
    </Link>
  )
}
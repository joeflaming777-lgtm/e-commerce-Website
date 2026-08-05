import { memo } from 'react'

// Hand-crafted "studio" product illustrations. Each piece is drawn in the
// site's warm ivory / willow / leather palette so product cards read as one
// coherent system (no stock-photo mismatch).

const defs = (
  <defs>
    <linearGradient id="gWood" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#f2e6cd" />
      <stop offset="55%" stopColor="#e2c99c" />
      <stop offset="100%" stopColor="#c8a671" />
    </linearGradient>
    <linearGradient id="gWoodDark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#8a6636" />
      <stop offset="100%" stopColor="#5e3f20" />
    </linearGradient>
    <linearGradient id="gBallRed" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stopColor="#c94f3a" />
      <stop offset="100%" stopColor="#7e2315" />
    </linearGradient>
    <linearGradient id="gBallWhite" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="100%" stopColor="#e3dccb" />
    </linearGradient>
    <radialGradient id="gGlow" cx="0.35" cy="0.3" r="0.9">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="gPad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#fbf7ee" />
      <stop offset="100%" stopColor="#e6d9bf" />
    </linearGradient>
    <linearGradient id="gHelmet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#e9e0cd" />
      <stop offset="100%" stopColor="#beb093" />
    </linearGradient>
    <linearGradient id="gJersey" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#4a4a5e" />
      <stop offset="100%" stopColor="#26263a" />
    </linearGradient>
    <linearGradient id="gShoe" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#efe6d2" />
      <stop offset="100%" stopColor="#cdb894" />
    </linearGradient>
    <linearGradient id="gStump" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#e9d9b8" />
      <stop offset="100%" stopColor="#c2a87b" />
    </linearGradient>
  </defs>
)

const woodGrain = (d) => (
  <g stroke="#c8a671" strokeWidth="1" opacity="0.55" fill="none" strokeLinecap="round">
    {d}
  </g>
)

function BatArt({ color = '#5e3f20', ...props }) {
  return (
    <svg viewBox="0 0 200 260" {...props}>
      {defs}
      <ellipse cx="100" cy="132" rx="66" ry="92" fill="url(#gWood)" />
      <ellipse cx="100" cy="132" rx="66" ry="92" fill="url(#gGlow)" />
      {woodGrain(
        <>
          <path d="M52 120 c 0 -34 10 -58 34 -70" />
          <path d="M60 138 c -2 -30 4 -52 22 -66" />
          <path d="M142 118 c -1 -32 -9 -55 -30 -66" />
          <path d="M148 140 c -3 -34 -12 -56 -34 -68" />
          <path d="M66 172 c 4 8 10 12 18 14" />
          <path d="M138 168 c -5 9 -12 14 -22 16" />
        </>
      )}
      <path d="M100 218 L100 250" stroke="#5e3f20" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
      <rect x="80" y="30" width="40" height="60" rx="14" fill="url(#gWoodDark)" />
      <rect x="80" y="30" width="40" height="60" rx="14" fill="url(#gGlow)" />
      <rect x="87" y="30" width="26" height="60" fill="#3f2a1a" opacity="0.35" />
      <g stroke="#1d150d" strokeWidth="4" strokeLinecap="round" opacity="0.7">
        <path d="M84 42 h30" />
        <path d="M84 52 h30" />
        <path d="M84 62 h30" />
        <path d="M84 72 h30" />
      </g>
      <ellipse cx="100" cy="95" rx="15" ry="6" fill="#3f2a1a" opacity="0.55" />
      <path d="M66 88 q -10 6 -8 18 q 6 -4 12 -4 q -2 -10 -4 -14z" fill={color} />
      <path d="M134 88 q 10 6 8 18 q -6 -4 -12 -4 q 2 -10 4 -14z" fill={color} />
    </svg>
  )
}

function BallArt({ tone = 'red', ...props }) {
  const id = tone === 'white' ? 'gBallWhite' : tone === 'pink' ? 'gBallRed' : 'gBallRed'
  const fill = tone === 'pink' ? '#e27b8c' : tone === 'white' ? '#f5f1e6' : '#b33a2b'
  const dark = tone === 'pink' ? '#a3485c' : tone === 'white' ? '#c9c2b0' : '#7e2315'
  return (
    <svg viewBox="0 0 200 200" {...props}>
      {defs}
      <circle cx="100" cy="100" r="78" fill={fill} />
      <circle cx="100" cy="100" r="78" fill="url(#gGlow)" />
      <path d="M 44 62 A 78 78 0 0 1 156 62" fill="none" stroke={dark} strokeWidth="3" opacity="0.55" />
      <path d="M 44 138 A 78 78 0 0 0 156 138" fill="none" stroke={dark} strokeWidth="3" opacity="0.55" />
      <path d="M 100 22 A 82 82 0 0 1 130 32" fill="none" stroke={dark} strokeWidth="2.5" opacity="0.7" strokeDasharray="4 5" />
      <path d="M 100 178 A 82 82 0 0 1 70 168" fill="none" stroke={dark} strokeWidth="2.5" opacity="0.7" strokeDasharray="4 5" />
      <path d="M 62 44 A 82 82 0 0 1 50 72" fill="none" stroke={dark} strokeWidth="2.5" opacity="0.7" strokeDasharray="4 5" />
      <path d="M 138 156 A 82 82 0 0 1 150 128" fill="none" stroke={dark} strokeWidth="2.5" opacity="0.7" strokeDasharray="4 5" />
      <circle cx="100" cy="100" r="26" fill="none" stroke={dark} strokeWidth="2" opacity="0.35" />
      <ellipse cx="74" cy="66" rx="22" ry="14" fill="#ffffff" opacity="0.25" />
    </svg>
  )
}

function PadsArt({ ...props }) {
  return (
    <svg viewBox="0 0 200 260" {...props}>
      {defs}
      {[70, 130].map((x) => (
        <g key={x}>
          <rect x={x - 26} y="30" width="52" height="210" rx="20" fill="url(#gPad)" />
          <rect x={x - 26} y="30" width="52" height="210" rx="20" fill="url(#gGlow)" />
          <rect x={x - 20} y="56" width="40" height="120" rx="12" fill="#efe3c6" stroke="#d8c59c" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={x - 20 + i * 10} y="56" width="10" height="120" fill="#3f2a1a" opacity="0.05" />
          ))}
          <g fill="#5e3f20">
            <rect x={x - 20} y="176" width="40" height="14" rx="7" />
            <rect x={x - 14} y="194" width="28" height="8" rx="4" />
            <rect x={x - 18} y="206" width="36" height="8" rx="4" />
            <rect x={x - 20} y="220" width="40" height="10" rx="5" />
          </g>
        </g>
      ))}
      <ellipse cx="100" cy="34" rx="40" ry="10" fill="#3f2a1a" opacity="0.12" />
    </svg>
  )
}

function HelmetArt({ ...props }) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      {defs}
      <path d="M36 110 A 64 64 0 0 1 164 110 Z" fill="url(#gHelmet)" />
      <path d="M36 110 A 64 64 0 0 1 164 110 Z" fill="url(#gGlow)" />
      <path d="M60 118 L 60 92 A 40 40 0 0 1 140 92 L 140 118" fill="none" stroke="#8a6c45" strokeWidth="2.5" opacity="0.6" />
      <g stroke="#6b5436" strokeWidth="3" strokeLinecap="round" opacity="0.5">
        <path d="M70 120 v 34" />
        <path d="M130 120 v 34" />
        <path d="M70 130 h 60" />
        <path d="M70 144 h 60" />
        <path d="M70 120 h 60" />
      </g>
      <rect x="84" y="20" width="32" height="26" rx="8" fill="#8a6c45" />
      <path d="M60 20 h 80 l 6 10 h -92 z" fill="#8a6c45" opacity="0.6" />
    </svg>
  )
}

function GlovesArt({ ...props }) {
  return (
    <svg viewBox="0 0 200 220" {...props}>
      {defs}
      {[62, 138].map((x, i) => (
        <g key={x}>
          <g transform={i ? 'scale(-1,1)' : undefined}>
            <g transform={i ? `translate(${-2 * x},0)` : undefined}>
              <path d={`M ${x} 40 c -6 0 -12 4 -12 12 v 92 l -10 46 a 12 12 0 0 0 12 12 h 20 a 12 12 0 0 0 12 -12 l -10 -46 v -92 c 0 -8 -6 -12 -12 -12z`} fill="url(#gPad)" />
              <path d={`M ${x} 54 a 10 10 0 0 1 20 0`} fill="none" stroke="#6b4a2b" strokeWidth="6" opacity="0.7" />
              {[62, 76, 90].map((yy) => (
                <path key={yy} d={`M ${x} ${yy} l 20 0`} stroke="#6b4a2b" strokeWidth="2" opacity="0.4" />
              ))}
            </g>
          </g>
        </g>
      ))}
    </svg>
  )
}

function JerseyArt({ base = '#3a3a52', sleeve = '#c09a3e', ...props }) {
  return (
    <svg viewBox="0 0 200 240" {...props}>
      {defs}
      <path
        d="M70 30 L50 44 L38 86 L62 100 L62 200 a 10 10 0 0 0 10 10 h 56 a 10 10 0 0 0 10 -10 L138 100 L162 86 L150 44 L130 30 a 16 16 0 0 0 -26 -6 a 16 16 0 0 0 -34 0 a 16 16 0 0 0 -26 6z"
        fill={base}
      />
      <path d="M50 44 L38 86 L62 100 L66 54 L130 30 a 16 16 0 0 0 -26 -6 L70 44 Z" fill={sleeve} opacity="0.85" />
      <path d="M150 44 L162 86 L138 100 L134 54 L70 30 a 16 16 0 0 1 26 -6 L130 44 Z" fill={sleeve} opacity="0.85" />
      <path d="M70 30 L50 44 L62 100 L70 90 Z" fill="#00000022" />
      <rect x="78" y="116" width="44" height="30" rx="8" fill="#ffffff" opacity="0.9" />
      <path d="M62 100 L138 100 L138 200 a 10 10 0 0 1 -10 10 h -56 a 10 10 0 0 1 -10 -10 z" fill="#00000012" />
      <rect x="70" y="66" width="60" height="6" rx="3" fill="#ffffff" opacity="0.25" />
    </svg>
  )
}

function ShoesArt({ ...props }) {
  return (
    <svg viewBox="0 0 220 160" {...props}>
      {defs}
      <path
        d="M30 40 L46 116 Q52 132 70 132 L190 132 Q206 132 206 116 L208 60 Q208 44 194 44 L70 40 Q40 40 30 40z"
        fill="url(#gShoe)"
      />
      <path d="M30 40 L46 116 Q52 132 70 132 L190 132 L192 44 Z" fill="url(#gGlow)" />
      <path d="M66 44 L58 104 Q58 112 68 112 L150 112 Q162 112 160 100 L152 44 Z" fill="#6b4a2b" opacity="0.85" />
      <g stroke="#3f2a1a" strokeWidth="2.5" opacity="0.5">
        <path d="M40 60 h 24" />
        <path d="M38 72 h 26" />
        <path d="M36 84 h 26" />
      </g>
      <path d="M48 128 L204 128" stroke="#3f2a1a" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <g fill="#5e3f20">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={54 + i * 24} y="132" width="14" height="10" rx="4" transform={`rotate(${i % 2 ? 4 : -4} ${61 + i * 24} 137)`} />
        ))}
      </g>
    </svg>
  )
}

function StumpsArt({ ...props }) {
  return (
    <svg viewBox="0 0 200 240" {...props}>
      {defs}
      {[60, 100, 140].map((x, i) => (
        <g key={x}>
          <rect x={x - 9} y="70" width="18" height="150" rx="8" fill="url(#gStump)" />
          <rect x={x - 4} y="70" width="6" height="150" fill="#ffffff" opacity="0.28" />
          <ellipse cx={x} cy="70" rx="9" ry="5" fill="#a98d5e" />
        </g>
      ))}
      <rect x="44" y="52" width="112" height="10" rx="5" fill="#8a6c45" />
      <rect x="44" y="62" width="112" height="10" rx="5" fill="#a98d5e" />
      <ellipse cx="100" cy="56" rx="20" ry="4" fill="#ffffff" opacity="0.18" />
    </svg>
  )
}

const ART = {
  bat: BatArt,
  ball: BallArt,
  pads: PadsArt,
  helmet: HelmetArt,
  gloves: GlovesArt,
  jersey: JerseyArt,
  shoes: ShoesArt,
  stumps: StumpsArt,
}

export const ProductArt = memo(function ProductArt({ art, color, className, ...props }) {
  const Cmp = ART[art] || BatArt
  return <Cmp color={color} className={className} {...props} />
})

export default ProductArt

// Exported individually for the customizer previews.
export { BatArt, BallArt, PadsArt, HelmetArt, GlovesArt, JerseyArt, ShoesArt, StumpsArt }
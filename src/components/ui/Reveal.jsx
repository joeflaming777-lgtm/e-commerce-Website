import { useEffect, useRef } from 'react'

// Lightweight scroll-reveal using native IntersectionObserver + CSS.
// Much cheaper than framer-motion for bulk scroll reveals.
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}s`
          el.classList.add('reveal-visible')
          obs.disconnect()
        }
      },
      { rootMargin: '-60px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal-hidden ${className}`}>
      {children}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, sub, align = 'left', className = '' }) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <Reveal className={`max-w-2xl ${alignCls} ${className}`}>
      {eyebrow && <p className="eyebrow text-leather">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-espresso sm:text-[2.6rem] sm:leading-[1.1]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-[15px] leading-relaxed text-mist">{sub}</p>}
    </Reveal>
  )
}
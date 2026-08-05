import { motion } from 'framer-motion'

// Scroll-reveal wrapper used across home / section highlights.
export default function Reveal({ children, delay = 0, y = 26, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
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
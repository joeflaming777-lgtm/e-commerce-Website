import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-bold tracking-wide ' +
  'transition-all duration-300 rounded-full select-none whitespace-nowrap ' +
  'disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-leather/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory'

const variants = {
  primary:
    'bg-espresso text-ivory hover:bg-espresso-deep hover:-translate-y-0.5 hover:shadow-warm',
  leather:
    'bg-leather text-ivory hover:bg-willow hover:-translate-y-0.5 hover:shadow-warm',
  outline:
    'border border-espresso/25 text-espresso hover:bg-espresso/5 hover:border-espresso/50 hover:-translate-y-0.5',
  ghost: 'text-espresso hover:bg-espresso/8',
  light:
    'bg-ivory text-espresso hover:bg-white hover:-translate-y-0.5 hover:shadow-warm',
}

const sizes = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-[15px] px-8 py-4',
  icon: 'p-2.5',
}

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>
  if (href) return <a href={href} className={cls} {...props}>{children}</a>
  if (Comp !== 'button') return <Comp className={cls} {...props}>{children}</Comp>
  return <button className={cls} {...props}>{children}</button>
}